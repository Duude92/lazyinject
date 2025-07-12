import { Export, Import } from 'lazyinject';
import { ISomeInterface } from './interface/ISomeInterface';

@Export(SomeClass)
export class SomeClass {
  constructor(
    @Import('ISomeInterface')
    private readonly someImplementation: ISomeInterface,
  ) {}

  print = () => this.someImplementation.print();
}
