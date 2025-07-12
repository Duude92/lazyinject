import { Export } from 'lazyinject';

class SomeImplementation {
  print() {
    console.log('SomeImplementation');
  }
}

Export('ISomeInterface')(SomeImplementation);
