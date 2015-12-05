#! /usr/bin/env node

import 'source-map-support/register';

import colors from 'colors/safe';
import program from 'commander';

import { getVersion } from './helpers/general';

program
    .version(getVersion())

    .command('init [template] [version]', 'init a new project')

    .command('build [options] [config]', 'build the current project')
    .command('dev [options] [config]', 'start the current project in dev mode')
    .command('start [options] [config]', 'start the current project')

    .parse(process.argv);

if (!program.runningCommand) {
    console.log(colors.red(`Invalid command: ${colors.bold(program.args[0])}\n`));
}

require('./helpers/subcommand-fix')(program);
