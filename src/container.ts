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
    const exp = ContainerRegistry.types.get(type);
    if (!exp) return undefined;
    const e2 = new exp();
    return e2 as T;
  }
}
