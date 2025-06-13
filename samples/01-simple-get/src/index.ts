import { ContainerFactory } from 'lazyinject';
import { SimpleClass } from './SimpleClass';

const startup = async () => {
  const container = await ContainerFactory.create({
    baseDir: __dirname,
    catalogs: ['.'],
  });
  const simpleObject = container.get<SimpleClass>('SimpleClass');
  simpleObject.print();
};

startup();
