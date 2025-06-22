import { Export, ImportMany, Lazy } from 'lazyinject';
import { ISomeInterface } from './interface/ISomeInterface';

const symbol = Symbol('SomeClass');

@Export(symbol)
export class SomeClass {
  constructor(
    @ImportMany('ISomeInterface')
    private readonly implementations: ISomeInterface[],
  ) {}

  print = () => this.implementations.forEach((impl) => impl.print());
}
