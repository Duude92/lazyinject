import { InterfaceType } from '../api/interfaceType';
import { ContainerRegistryStatic } from '../containerRegistry';

export const Import = (interfaceType: InterfaceType) => {
  console.log('import1');
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    console.log('import', propertyKey);
    console.log(target);

    const type = ContainerRegistryStatic.get(interfaceType);
    return;
  };
};
