import { Export } from 'lazyinject';

@Export('SimpleClass')
export class SimpleClass {
  public print() {
    console.log('Hello from SimpleClass');
  }
}
