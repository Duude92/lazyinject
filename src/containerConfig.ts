import path from 'node:path';
import fs from 'node:fs';
import dynamicImport from './dynamicImport';
import { Config as LazyInjectContainerOptions } from './lazyinject.config';

let config: LazyInjectContainerOptions;
export const getConfig = (containerId: string | 'default') => {
  if (config[containerId] == undefined) throw new Error(`Container id ${containerId} not found`);
  return config[containerId];
};

export const loadConfig = async () => {
  const root = process.cwd();
  if (root) {
    const configFile = path.join(root, 'lazyinject.config.js');
    if (!fs.existsSync(configFile)) {
      config = {};
      return false;
    }
    const lazyConfig = await dynamicImport(configFile);
    config = lazyConfig.default;
  }
  return true;
};
