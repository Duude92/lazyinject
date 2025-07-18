import { IContainerOptions } from './api/IContainerOptions';
import path from 'node:path';
import fs from 'node:fs';
import dynamicImport from './dynamicImport';

const loadModules = (options: IContainerOptions) => {
  options.catalogs!.forEach((catalog) => {
    const directory = options.baseDir;

    const catalogPath = path.resolve(directory, catalog);
    const files = fs
      .readdirSync(catalogPath, { withFileTypes: true, recursive: options.recursive })
      .filter((file) => file.isFile());

    files.forEach(async (file) => {
      const filePath = path.join(file.parentPath, file.name);
      await dynamicImport(filePath);
    });
  });
};
export const resolveAndLoadModules = async (options?: StandaloneContainerOptions) => {
  if (typeof options !== 'string') {
    if (options?.catalogs) {
      loadModules(options);
    }
  }
  const root = process.cwd();
  if (root) {
    const configFile = path.join(root, 'lazyinject.config.js');
    if (!fs.existsSync(configFile)) return;
    const lazyConfig = await dynamicImport(configFile);
    const newOptions = {
      baseDir: root,
      catalogs: lazyConfig.catalogs,
    };
    loadModules(newOptions);
  }
};
