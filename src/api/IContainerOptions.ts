/**
 * Specifies configuration options for DI Container
 * @param baseDir Specifies base directory of project source
 * @param catalogs Directories to include for resolving @Import or @Export dependencies
 * @param recursive Specifies whether container should resolve catalog dependencies recursively
 * @example
 * const options = {
 *   baseDir: __dirname,
 *   catalogs: ['.'],
 *   recursive: true
 * }
 */
export type StandaloneContainerOptions = IContainerOptions | string | 'default';

export interface IContainerOptions {
  baseDir: string;
  catalogs?: string[];
  recursive?: boolean;
}
