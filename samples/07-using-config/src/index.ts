import { ISomeClass, someClassSymbol } from './SomeClass';
import { ContainerFactory } from '@duude92/lazyinject';

const bootstrap = async () => {
  const container = await ContainerFactory.create();
  const someClass = container.get<ISomeClass>(someClassSymbol);
  someClass.print();
  console.log('Hello world');
};
bootstrap();
