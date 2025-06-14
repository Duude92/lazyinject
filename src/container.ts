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
    const lazyObject = ContainerRegistryStatic.types.get(type) as Lazy<T>;
    return lazyObject?.Value;
  }
}
