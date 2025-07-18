import { CatalogOptions } from '../lazyinject.config';

/**
 * Specifies configuration options for DI Container
 * @param baseDir Specifies base directory of project source
 * @param catalogs Directories to include for resolving @Import or @Export dependencies
 * @example
 * const options = {
 *   baseDir: __dirname,
 *   catalogs: [{ path: '.', recursive: true }],
 * }
 */
export type StandaloneContainerOptions = IContainerOptions | string | 'default';

export interface IContainerOptions {
  baseDir: string;
  catalogs: Array<CatalogOptions>;
}
