import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';

// export class ContainerRegistry{
//
// }

export const ContainerRegistryStatic = {
  types: new Map<InterfaceType, Lazy<unknown>>(),
};
