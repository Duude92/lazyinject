import { InterfaceType } from './api/interfaceType';
import { ContainerRegistry } from './containerRegistry';

export class Container {
  get(type: InterfaceType): unknown {
  get<T>(type: InterfaceType): T | undefined {
    const exp = ContainerRegistry.types.get(type);
    if (!exp) return undefined;
    const e2 = new exp();
    return e2 as T;
  }
}
