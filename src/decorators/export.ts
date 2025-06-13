import { ContainerRegistry } from '../containerRegistry';
import { InterfaceType } from '../api/interfaceType';
import { ConstructorType } from '../api/ConstructorType';

export const Export = (interfaceType: InterfaceType) => {
  return (constructor: ConstructorType) => {
    ContainerRegistry.types.set(interfaceType, constructor);
  };
};
