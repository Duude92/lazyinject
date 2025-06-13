import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';

export const ContainerRegistry = {
  types: new Map<InterfaceType, Lazy<unknown>>(),
};
