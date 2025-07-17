import { InterfaceType } from '../api/interfaceType';
import { ContainerRegistryStatic } from '../containerRegistry';
import { ConstructorType } from '../api/ConstructorType';
import { IImportOptions } from '../api/IImportOptions';

/**
 * Registers constructor parameter for building dependencies
 * @param interfaceType {@link InterfaceType} identifier under which given constructor parameter would be registered
 * @param options {@link IImportOptions} additional parameters for registering
 * @constructor
 */
export const Import = (
  interfaceType: InterfaceType,
  options: IImportOptions | undefined = undefined,
) => {
  return (
    target: ConstructorType,
    propertyKey: string | symbol | unknown,
    parameterIndex: number,
  ) => {
    ContainerRegistryStatic.setImport(target, interfaceType, parameterIndex, {
      single: true,
      lazy: options?.lazy,
    });
    return;
  };
};
/**
 * Registers constructor parameter of array type for building dependencies
 * @param interfaceType {@link InterfaceType} identifier under which given constructor parameter would be registered
 * @param options {@link IImportOptions} additional parameters for registering
 * @constructor
 */
export const ImportMany = (
  interfaceType: InterfaceType,
  options: IImportOptions | undefined = undefined,
) => {
  return (
    target: ConstructorType,
    propertyKey: string | symbol | unknown,
    parameterIndex: number,
  ) => {
    ContainerRegistryStatic.setImport(target, interfaceType, parameterIndex, {
      single: false,
      lazy: options?.lazy,
    });
    return;
  };
};
