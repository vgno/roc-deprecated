import 'source-map-support/register';

import fs from 'fs-extra';
import path from 'path';
import { spawn } from 'child_process';
import program from 'commander';
import inquirer from 'inquirer';
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
assertEmptyDir();

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
            console.log('Invalid name given.');
            process.exit(1);
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
        .then((dirPath) => {
            if (!validRocProject(dirPath)) {
                process.exit(1);
            } else {
                inquirer.prompt(getPrompt(dirPath), (answers) => {
                    replaceTemplatedValues(answers, dirPath);
                    configureFiles(dirPath);
                    npmInstall();
                });
            }
        })
        .catch((error) => console.log(error));
}

function getPrompt(dirPath) {
    try {
        return require(path.join(dirPath, 'roc.setup.js')).prompt;
    } catch (error) {
        return require('../index').prompt;
    }
}

function replaceTemplatedValues(answers, dirPath) {
    Object.keys(answers).map((key) => {
        replace({
            regex: `{{{\\s*${key}*\\s*}}}`,
            replacement: answers[key],
            paths: [dirPath + '/base'],
            recursive: true,
            silent: true
        });
    });
}

function configureFiles(dirPath) {
    // Rename package.json to .roc for history purposes
    fs.renameSync(path.join(dirPath, 'package.json'), path.join(dirPath, 'base', '.roc'));

    // Move everything inside base to the current working directory
    fs.copySync(path.join(dirPath, 'base'), process.cwd());
}

function npmInstall() {
    // Run npm install
    spawn('npm', ['install'], {
        stdio: [
            process.stdin,
            process.stdout,
            process.stderr
        ]
    });
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

function assertEmptyDir() {
    if (fs.readdirSync(process.cwd()).length > 0) {
        console.log('You need to call this command from a empty directory.');
        process.exit(1);
    }
}
