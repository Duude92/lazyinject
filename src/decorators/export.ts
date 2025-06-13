import { ContainerRegistry } from '../containerRegistry';
import { InterfaceType } from '../api/interfaceType';

export const Export = (interfaceType: InterfaceType) => {
  console.log('export1', interfaceType);
  return (constructor: Function) => {
    console.log('export2');
    ContainerRegistry.types.set(interfaceType, constructor);
  };
};
