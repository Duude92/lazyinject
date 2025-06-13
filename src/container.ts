import { InterfaceType } from './api/interfaceType';
import { ContainerRegistry } from './containerRegistry';

export class Container {
  get(type: InterfaceType): unknown {
    const exp = ContainerRegistry.types.get(type);
    if (!exp) return undefined;
    const e2 = new exp();
    return e2;
  }
}
