import { ContainerFactory } from 'lazyinject';
import { ISomeClass, someClassSymbol } from './SomeClass';

const bootstrap = async () => {
  const container = await ContainerFactory.create();
  const someClass = container.get<ISomeClass>(someClassSymbol);
  someClass.print();
  console.log('Hello world');
};
bootstrap();
