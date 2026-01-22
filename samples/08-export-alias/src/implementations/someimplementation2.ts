import { ISomeInterface } from '../interface/ISomeInterface';
import { Export } from '@duude92/lazyinject';

@Export('ISomeInterface.impl2.some')
export class SomeImplementation2 implements ISomeInterface {
  private randomValue: number;
  constructor() {
    this.randomValue = Math.random() * 100;
  }
  
  print() {
    console.log('SomeImplementation2 ' + this.randomValue);
  }
}
