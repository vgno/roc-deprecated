import 'source-map-support/register';

import { validRocProject, getBaseRocExtension } from './helpers/general';
import { configManager, setConfig } from './helpers/config-manager';

if (!validRocProject()) {
    process.exit(1);
}

const rocExtension = getBaseRocExtension(true);

const { applicationConfig, temporaryConfig } = configManager(rocExtension);

setConfig(applicationConfig, temporaryConfig);

rocExtension.start();
