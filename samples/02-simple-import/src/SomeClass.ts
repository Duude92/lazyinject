import { Export, Import } from 'lazyinject';
import { ISomeInterface } from './interface/ISomeInterface';

const symbol = Symbol('SomeClass');

@Export(symbol)
export class SomeClass {
  constructor(
    @Import('ISomeInterface')
    private readonly someImplementation: ISomeInterface,
  ) {}

  print = () => this.someImplementation.print();
}
