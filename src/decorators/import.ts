import { InterfaceType } from '../api/interfaceType';
import { ContainerRegistryStatic } from '../containerRegistry';
import { ConstructorType } from '../api/ConstructorType';
import { IImportOptions } from '../api/IImportOptions';

export const Import = (
  interfaceType: InterfaceType,
  options: IImportOptions | undefined = undefined,
) => {
  return (
    target: ConstructorType,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    ContainerRegistryStatic.setImport(target, interfaceType, parameterIndex, {
      single: true,
      lazy: options?.lazy,
    });
    return;
  };
};

export const ImportMany = (
  interfaceType: InterfaceType,
  options: IImportOptions | undefined = undefined,
) => {
  return (
    target: ConstructorType,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    ContainerRegistryStatic.setImport(target, interfaceType, parameterIndex, {
      single: false,
      lazy: options?.lazy,
    });
    return;
  };
};
