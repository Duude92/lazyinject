import { InterfaceType } from './api/interfaceType';
import { ContainerRegistryStatic } from './containerRegistry';

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
   */
  getMany<T>(type: InterfaceType): T[] | undefined {
    const lazyObject = ContainerRegistryStatic.getMany<T>(type);
    return lazyObject?.map(x=>x.Value as T) ?? [];
  }
}
