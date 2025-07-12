import { ContainerFactory } from 'lazyinject';
import { ISomeClass, someClassSymbol } from './SomeClass';

const bootstrap = async () => {
  const options = {
    baseDir: __dirname,
    catalogs: ['.', './implementations'],
  };
  const container = await ContainerFactory.create(options);
  const someClass = container.get<ISomeClass>(someClassSymbol);
  someClass.print();
  console.log('Hello world');
};
bootstrap();
