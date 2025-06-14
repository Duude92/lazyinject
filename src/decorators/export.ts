import { ContainerRegistryStatic } from '../containerRegistry';
import { InterfaceType } from '../api/interfaceType';
import { ConstructorType } from '../api/ConstructorType';

export const Export = (interfaceType: InterfaceType) => {
  return (constructor: ConstructorType) => {
    ContainerRegistryStatic.setExport(interfaceType, constructor);
  };
};
