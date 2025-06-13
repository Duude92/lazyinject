import { InterfaceType } from './api/interfaceType';
import { ContainerRegistry } from './containerRegistry';

/**
 * Container class
 */
export class Container {
  /**
   * Retrieves given type object from container registry
   * @param type Object type to retrieve to
   */
  get<T>(type: InterfaceType): T | undefined {
    const ctor = ContainerRegistry.types.get(type);
    if (!ctor) return undefined;
    return new ctor() as T;
  }
}
