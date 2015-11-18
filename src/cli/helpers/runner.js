import 'source-map-support/register';

import { merge } from 'roc-config';

import { validRocProject, getBaseRocExtension } from './general';
import { configManager, setConfig } from './config-manager';

export default function runner(mode) {
    if (!validRocProject()) {
        process.exit(1);
    }

    const rocExtension = getBaseRocExtension(true);

    let { applicationConfig, temporaryConfig } = configManager(rocExtension);

    const { baseConfig, runBuild, runWatch } = rocExtension;

    const allowedModes = ['build', 'dev'];

    // When using the CLI and providing a path to a configuration file we will add it to the watch path for convenience
    if (applicationConfig) {
        temporaryConfig = merge(temporaryConfig, { dev: { watch: [...baseConfig.dev.watch, applicationConfig]}});
    }

    setConfig(applicationConfig, temporaryConfig);

    if (mode === 'dev') {
        runWatch(rocExtension);
    } else if (mode === 'build') {
        runBuild(rocExtension);
    } else {
        const additionalMessage = mode ? `Was instead ${mode}.` : 'No mode given.';
        console.error(`Invalid command, must be one of ${allowedModes}. ${additionalMessage}`);
    }
}
