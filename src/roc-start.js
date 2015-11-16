import 'source-map-support/register';

import { validateRocProject, getBaseRocExtension } from './helpers/general';
import { configManager, setConfig } from './helpers/config-manager';

validateRocProject();

const rocExtension = getBaseRocExtension(true);

const { applicationConfig, temporaryConfig } = configManager(rocExtension);

setConfig(applicationConfig, temporaryConfig);

rocExtension.start();
