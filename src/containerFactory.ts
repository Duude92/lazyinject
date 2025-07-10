import { IContainerOptions } from './api/IContainerOptions';
import path from 'node:path';
import fs from 'node:fs';
import { Container } from './container';

export class ContainerFactory {
  static async create(options?: IContainerOptions): Promise<Container> {
    if (options?.catalogs) {
      options.catalogs.forEach((catalog) => {
        const directory = options.baseDir;

        const catalogPath = path.resolve(directory, catalog);
        const files = fs
          .readdirSync(catalogPath, { withFileTypes: true, recursive: options.recursive })
          .filter((file) => file.isFile());

        files.forEach(async (file) => {
          const filePath = path.join(file.parentPath, file.name);
          await import(filePath);
        });
      });
    }
    return new Container();
  }
}
