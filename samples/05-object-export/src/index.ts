import { ContainerFactory } from 'lazyinject';
import { SimpleInterface } from './Interface/SimpleInterface';

const startup = async () => {
  const container = await ContainerFactory.create({
    baseDir: __dirname,
    catalogs: ['.'],
  });
  const simpleObject = container.get<SimpleInterface>('SimpleObject');
  simpleObject.print();
};

startup();
