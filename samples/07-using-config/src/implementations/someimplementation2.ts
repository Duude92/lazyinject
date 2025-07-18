import { ISomeInterface } from '../interface/ISomeInterface';
import { Export } from '@duude92/lazyinject';

@Export('ISomeInterface')
export class SomeImplementation2 implements ISomeInterface {
  print() {
    console.log('SomeImplementation2');
  }
}
