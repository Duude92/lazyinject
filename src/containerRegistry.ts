import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';
import { ConstructorType } from './api/ConstructorType';

class ContainerRegistry {
  private exportedMap = new Map<InterfaceType, Lazy<unknown>>();

  constructor() {}

  set(type: InterfaceType, constructor: ConstructorType): void {
    if (typeof type === 'function') {
      this.exportedMap.set(type.name, new Lazy(constructor));
    }
    if (typeof type === 'symbol') {
      this.exportedMap.set(type.description!, new Lazy(constructor));
    }

    this.exportedMap.set(type, new Lazy(constructor));
  }

  get<T>(type: InterfaceType): Lazy<T> {
    return this.exportedMap.get(type) as Lazy<T>;
  }
}

export const ContainerRegistryStatic = new ContainerRegistry();
