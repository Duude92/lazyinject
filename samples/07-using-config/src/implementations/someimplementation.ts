import { ISomeInterface } from '../interface/ISomeInterface';
import { Export } from 'lazyinject';

@Export('ISomeInterface')
export class SomeImplementation implements ISomeInterface {
  print() {
    console.log('SomeImplementation1');
  }
}
