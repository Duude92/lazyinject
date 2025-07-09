import { ContainerFactory } from 'lazyinject';
import { SomeClass } from './SomeClass';

const bootstrap = async () => {
  const options = {
    baseDir: __dirname,
    catalogs: ['.', './implementations'],
  };
  const container = await ContainerFactory.create(options);
  const someClass = container.get<SomeClass>(SomeClass);
  someClass.printInformation();
  someClass.printRandom();
  someClass.printInformation();
  console.log('Hello world');
};
bootstrap();
