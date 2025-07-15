import { IContainerOptions } from './api/IContainerOptions';
import path from 'node:path';
import fs from 'node:fs';
import { Container } from './container';
import dynamicImport from './dynamicImport';
import findRoot from './findRoot';

/**
 * Factory to create Container object
 */
export class ContainerFactory {
  /**
   * Main function to create a new Container object with provided options
   * @param options Provided options. See {@link IContainerOptions}
   */
  static async create(options?: IContainerOptions): Promise<Container> {
    if (options?.catalogs) {
      this.loadModules(options);
    }
    const root = findRoot(require.main!.path);
    if (root) {
      const configFile = path.join(root, 'lazyinject.config.js');
      const lazyConfig = await dynamicImport(configFile);
      const newOptions = {
        baseDir: root,
        catalogs: lazyConfig.catalogs,
      };
      this.loadModules(newOptions);
    }

    return new Container();
  }

  private static loadModules = (options: IContainerOptions) => {
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
}
