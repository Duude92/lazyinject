import { InterfaceType } from './api/interfaceType';
import { ConstructorType } from './api/ConstructorType';

export const ContainerRegistry = {
  types: new Map<InterfaceType, ConstructorType>(),
};
