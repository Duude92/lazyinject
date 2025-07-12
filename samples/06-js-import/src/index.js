import { ContainerFactory } from 'lazyinject';

const bootstrap = async () => {
  const path = import.meta.dirname;
  const options = {
    baseDir: path,
    catalogs: ['.', './implementations'],
  };
  const container = await ContainerFactory.create(options);
  const someClass = container.get('SomeClass');
  someClass.print();
  console.log('Hello world');
};
bootstrap();
