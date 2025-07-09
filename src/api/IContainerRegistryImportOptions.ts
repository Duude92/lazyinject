/**
 * Interface for additional options
 * @property single Defines if dependency is single value or array
 * @property lazy Defines if dependency should be imported as Lazy<T>
 */
export interface IContainerRegistryImportOptions {
  single?: boolean;
  lazy?: boolean;
}
