import { IContainerOptions } from './api/IContainerOptions';
import path from 'node:path';
import fs from 'node:fs';

export const Container = {
  create(options?: IContainerOptions) {
    if (options?.catalogs) {
      options.catalogs.map((catalog) => {
        const directory = options.baseDir;

        const catalogPath = path.resolve(directory, catalog);
        const files = fs.readdirSync(catalogPath, { withFileTypes: true });

        return Promise.all(
          files
            .filter((file) => file.isFile())
            .map(async (file) => {
              const filePath = path.join(file.parentPath, file.name);
              return await import(filePath);
            }),
        );
      });
    }
  },
};
