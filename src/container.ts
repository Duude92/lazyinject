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
    const lazyObject = ContainerRegistryStatic.get<T>(type);
    return lazyObject?.Value;
  }
}
