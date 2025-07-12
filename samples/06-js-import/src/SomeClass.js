import { Export, Import } from 'lazyinject';

class SomeClass {
  constructor(someImplementation) {
    this.someImplementation = someImplementation;
  }

  print = () => this.someImplementation.print();
}

Export('SomeClass')(SomeClass);
Import('ISomeInterface')(SomeClass, undefined, 0);
