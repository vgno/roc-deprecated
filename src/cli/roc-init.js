import 'source-map-support/register';

import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import program from 'commander';
import inquirer from 'inquirer';
import del from 'del';
import replace from 'replace';

import { get, getVersions } from './helpers/github';
import { validRocProject } from './helpers/general';

/* This should be fetched from a server!
 */
const bases = [{
    name: 'Simple Roc App',
    description: 'A simple start on a generic web application',
    identifier: 'web',
    repo: 'vgno/roc-base-web'
}, {
    name: 'Simple Roc React App',
    description: 'A simple start on a React web application',
    identifier: 'web-react',
    repo: 'vgno/roc-base-web-react'
}];

let option;
let versionOption;

program
    .arguments('[base] [version]')
    .action((argumentOption, version) => {
        option = argumentOption;
        versionOption = version;
    })
    .parse(process.argv);

// Make sure the directory is empty!
isEmptyDir();

if (!option) {
    interativeMenu();
} else {
    fetchBase(option, versionOption);
}

/*
 * Helpers
 */
function fetchBase(toFetch, selectVersion) {
    if (toFetch.indexOf('/') === -1) {
        const base = bases.find((elem) => elem.identifier === toFetch);
        if (!base) {
            console.log('Unvalid name given.');
            process.exit(0);
        }

        toFetch = base.repo;
    }

    getVersions(toFetch)
        .then((versions) => {
            if (selectVersion && selectVersion.charAt(0) !== 'v') {
                selectVersion = `v${selectVersion}`;
            }

            const selectedVersion = versions.find((version) => version.name === selectVersion);
            const version = selectedVersion && selectedVersion.name ||
                versions[0] && versions[0].name ||
                'master';

            if (!selectedVersion && selectVersion) {
                console.log(`Could not find the version you wanted, will instead use ${version}`);
            } else if (!selectedVersion) {
                console.log(`Using ${version}`);
            }

            return get(toFetch, version);
        })
        .then(() => {
            if (!validRocProject()) {
                del.sync(['*', '.*']);
                process.exit(0);
            } else {
                inquirer.prompt(getPrompt(), (answers) => {
                    replaceTempletedValues(answers);
                    configureFiles();
                    npmInstall();
                });
            }
        })
        .catch((error) => console.log(error));
}

function getPrompt() {
    try {
        return require(path.join(process.cwd(), 'roc.setup.js')).prompt;
    } catch (error) {
        return require('../index').prompt;
    }
}

function replaceTempletedValues(answers) {
    Object.keys(answers).map((key) => {
        replace({
            regex: `{{{\\s*${key}*\\s*}}}`,
            replacement: answers[key],
            paths: ['./base'],
            recursive: true,
            silent: true
        });
    });
}

function configureFiles() {
    // Rename package.json to .roc for history purposes
    fs.renameSync(path.join(process.cwd(), 'package.json'), path.join(process.cwd(), '.roc'));

    // Remove setup files
    del.sync(['**', '!base/**', '!.roc'], { dot: true });

    // Move everything inside base to the current working directory
    fs.copySync(path.join(process.cwd(), 'base'), process.cwd());

    // Remove the base folder since we do not need it anymore
    del.sync(['base']);
}

function npmInstall() {
    // Run npm install
    const npm = exec('npm install');
    npm.stderr.pipe(process.stderr);
    npm.stdout.pipe(process.stdout);
}

function interativeMenu() {
    const choices = bases.map((elem) => ({ name: elem.name, value: elem.identifier }));

    inquirer.prompt([{
        type: 'rawlist',
        name: 'option',
        message: 'Selected a type',
        choices: choices
    }], answers => {
        fetchBase(answers.option);
    });
}

function isEmptyDir() {
    if (fs.readdirSync(process.cwd()).length > 0) {
        console.log('You need to call this command from a empty directory.');
        process.exit(0);
    }
}
