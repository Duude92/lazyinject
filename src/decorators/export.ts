import { ContainerRegistryStatic } from '../containerRegistry';
import { InterfaceType } from '../api/interfaceType';
import { ConstructorType } from '../api/ConstructorType';

/**
 * Allows a class constructor to be registered as an implementation of a specified {@link InterfaceType}
 * @param interfaceType {@link InterfaceType} identifier under which given constructor function would be registered
 * @constructor {@link ConstructorType} function, which refers to class constructor
 */
export const Export = (interfaceType: InterfaceType) => {
  return (constructor: ConstructorType) => {
    ContainerRegistryStatic.setExport(interfaceType, constructor);
  };
};
/**
 * Allows the registration of an object instance under a given {@link InterfaceType}
 * @param object Plain object, which would be registered as {@link InterfaceType} identifier
 * @param interfaceType {@link InterfaceType} identifier under which given object would be registered
 */
export const $ExportObject  = (object:object, interfaceType: InterfaceType) =>{
  ContainerRegistryStatic.setExport(interfaceType, object);
}