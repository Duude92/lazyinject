import { InterfaceType } from './api/interfaceType';
import { ContainerRegistryStatic } from './containerRegistry';
import { Lazy } from './lazy';

/**
 * Container class
 */
export class Container {
  /**
   * Retrieves given type object from container registry
   * @param type Object type to retrieve to
   */
  get<T>(type: InterfaceType): T | undefined {
    const lazyObject = ContainerRegistryStatic.getExport<T>(type);
    return lazyObject?.Value;
  }

  /**
   * Retrieves given type objects array from container registry
   * @param type Object type to retrieve to
   * @param options Options for retrieving objects
   */
  getMany<T>(type: InterfaceType, options?: { lazy: boolean }): T[] | Lazy<T>[] | undefined {
    const lazyObject = ContainerRegistryStatic.getMany<T>(type);
    if (options?.lazy) {
      return lazyObject ?? [];
    }
    return lazyObject?.map((x) => x.Value as T) ?? [];
  }
}
