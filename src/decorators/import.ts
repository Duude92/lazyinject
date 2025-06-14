import { InterfaceType } from '../api/interfaceType';
import { ContainerRegistryStatic } from '../containerRegistry';
import { ConstructorType } from '../api/ConstructorType';

export const Import = (interfaceType: InterfaceType) => {
  console.log('import1');
  return (
    target: ConstructorType,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    console.log('import', propertyKey);
    console.log(target);

    ContainerRegistryStatic.setImport(target, interfaceType);
    return;
  };
};
