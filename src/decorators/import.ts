import { InterfaceType } from '../api/interfaceType';
import { ContainerRegistry } from '../containerRegistry';

export const Import = (interfaceType: InterfaceType) => {
  console.log('import1');
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    console.log('import', propertyKey);
    console.log(target);
    return ContainerRegistry.types.get(interfaceType);
  };
};
