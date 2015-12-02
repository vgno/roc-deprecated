import 'source-map-support/register';

import path from 'path';
import set from 'lodash/object/set';
import isPlainObject from 'lodash/lang/isPlainObject';
import isBoolean from 'lodash/lang/isBoolean';
import colors from 'colors/safe';
import commander from 'commander';

import { setApplicationConfigPath, appendConfig } from 'roc-config';

// Creates all configuration options
function configureOptions(config, meta, availableOptions) {
    const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

    // Recursive function that builds all the configuration options
    const createOptions = (toOptions, toMetaOptions = {}, parentName = '', parentPath = '', parentCommander = '') => {
        let program = commander;

        Object.keys(toOptions).map((key) => {
            const param = parentName ? `${parentName}-${key}` : key;
            const commanderParam = parentName ? `${parentCommander}${capitalizeFirstLetter(key)}` : key;

            const objectPath = parentPath ? `${parentPath}.${key}` : key;

            if (isPlainObject(toOptions[key]) && Object.keys(toOptions[key]).length > 0) {
                return createOptions(toOptions[key], toMetaOptions[key], param, objectPath, commanderParam);
            }

            availableOptions.push({key: commanderParam, objectPath });

            let description = toMetaOptions[key] ? `${toMetaOptions[key]}. ` : '';

            let defaultDescription = `Default is ${colors.cyan(JSON.stringify(toOptions[key]))}`;

            let converter = () => (input) => input;
            if (isBoolean(toOptions[key])) {
                converter = (keyParam, defaultValue) => (input) => {
                    if (input === 'true' || input === 'false') {
                        return input === 'true';
                    }

                    console.log(`Invalid value given for ${colors.bold(keyParam)}. Will use the default ` +
                        `${colors.bold(defaultValue)}`);

                    return defaultValue;
                };
            } else if (Array.isArray(toOptions[key])) {
                if (!toOptions[key].length) {
                    defaultDescription = colors.yellow('No default value');
                }
                converter = () => (input) => {
                    let parsed;
                    try {
                        parsed = JSON.parse(input);
                    } catch (err) {
                        // Ignore this case
                    }

                    if (Array.isArray(parsed)) {
                        return parsed;
                    }

                    return input.split(',');
                };
            } else if (Number.isInteger(toOptions[key])) {
                converter = () => (input) => parseInt(input, 10);
            } else if (typeof (toOptions[key]) === 'string') {
                if (!toOptions[key]) {
                    defaultDescription = colors.yellow('No default value, you might want to override this');
                }
            } else if (!toOptions[key] || Object.keys(toOptions[key]).length === 0) {
                defaultDescription = colors.yellow('No default value');
                converter = () => (input) => JSON.parse(input);
            }

            program = program.option(`--${param} <option>`, `${description}${defaultDescription}`,
                converter(param, toOptions[key]));
        });

        return program;
    };

    return createOptions(config, meta);
}

// Converts the CLI options to a configuration object
function manageCliOptions(availableOptions) {
    const config = {};

    availableOptions.map(({key, objectPath}) => {
        if (key in commander) {
            set(config, objectPath, commander[key]);
        }
    });

    return config;
}

export function configManager({ baseConfig, metaConfig }) {
    const availableOptions = [];
    let applicationConfig;

    configureOptions(baseConfig, metaConfig.descriptions, availableOptions)
        .arguments('[config]')
        .action((config) => {
            applicationConfig = config;
        })
        .on('--help', () => {
            console.log('It is possible to define a path to a configuration file to use as seen by [config] above');
        })
        .parse(process.argv);

    return {
        applicationConfig,
        temporaryConfig: manageCliOptions(availableOptions)
    };
}

export function setConfig(applicationConfig, temporaryConfig) {
    setApplicationConfigPath(applicationConfig && path.join(process.cwd(), applicationConfig));
    appendConfig(temporaryConfig);
}
