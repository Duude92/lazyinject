import { InterfaceType } from './api/interfaceType';
import { ContainerRegistry } from './containerRegistry';

/**
 * Container class
 */
export class Container {
  constructor(private registry: ContainerRegistry) {}

  get ContainerRegistry(): ContainerRegistry {
    return this.registry;
  }

  /**
   * Retrieves given type object from container registry
   * @param type Object type to retrieve to
   */
  get<T>(type: InterfaceType): T | undefined {
    const lazyObject = this.registry.getExport<T>(type);
    return lazyObject?.Value;
  }

  /**
   * Retrieves given type objects array from container registry
   * @param type Object type to retrieve to
   */
  getMany<T>(type: InterfaceType): T[] | undefined {
    const lazyObject = this.registry.getMany<T>(type);
    return lazyObject?.map((x) => x.Value as T) ?? [];
  }
}
