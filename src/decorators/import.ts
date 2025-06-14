import { InterfaceType } from '../api/interfaceType';
import { ContainerRegistryStatic } from '../containerRegistry';
import { ConstructorType } from '../api/ConstructorType';

export const Import = (interfaceType: InterfaceType) => {
  return (
    target: ConstructorType,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    ContainerRegistryStatic.setImport(target, interfaceType, parameterIndex);
    return;
  };
};
