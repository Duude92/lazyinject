import { ISomeInterface } from '../interface/ISomeInterface';
import { Export } from '@duude92/lazyinject';

@Export('ISomeInterface.impl.name1')
export class SomeImplementation implements ISomeInterface {
  print() {
    console.log('SomeImplementation1');
  }
}
