import { IContainerOptions, StandaloneContainerOptions } from './api/IContainerOptions';
import path from 'node:path';
import fs from 'node:fs';
import dynamicImport from './dynamicImport';
import { getConfig, loadConfig } from './containerConfig';

const loadModules = (options: IContainerOptions) => {
  options.catalogs!.forEach((catalog) => {
    const directory = options.baseDir;

    const catalogPath = path.resolve(directory, catalog.path);
    const files = fs
      .readdirSync(catalogPath, { withFileTypes: true, recursive: catalog.recursive })
      .filter((file) => file.isFile());

    files.forEach(async (file) => {
      const filePath = path.join(file.parentPath, file.name);
      await dynamicImport(filePath);
    });
  });
};
let isConfigLoaded: boolean = false;

export const resolveAndLoadModules = async (options?: StandaloneContainerOptions) => {
  if (!isConfigLoaded) {
    isConfigLoaded = await loadConfig();
    if (!isConfigLoaded && !options) throw new Error('Config is not provided');
  }
  if (typeof options !== 'string') {
    if (options?.catalogs) {
      loadModules(options);
    }
    return;
  }
  const containerConfig = getConfig(options);
  const root = process.cwd();
  const newOptions: StandaloneContainerOptions = {
    baseDir: root,
    catalogs: containerConfig.catalogs,
  };
  loadModules(newOptions);
};
