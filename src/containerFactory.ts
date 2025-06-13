import { IContainerOptions } from './api/IContainerOptions';
import path from 'node:path';
import fs from 'node:fs';
import { Container } from './container';

export class ContainerFactory {
  static async create(options?: IContainerOptions): Promise<Container> {
    console.log('Creating Container');
    if (options?.catalogs) {
      console.log('Creating Catalogs');
      options.catalogs.forEach((catalog) => {
        const directory = options.baseDir;

        const catalogPath = path.resolve(directory, catalog);
        const files = fs
          .readdirSync(catalogPath, { withFileTypes: true })
          .filter((file) => file.isFile());

        files.forEach(async (file) => {
          console.log('Importing File', file.name);
          const filePath = path.join(file.parentPath, file.name);
          require(filePath);
          console.log('Imported file');
        });
      });
    }
    return new Container();
  }
}
