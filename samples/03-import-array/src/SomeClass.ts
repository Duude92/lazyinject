import { Export, ImportMany, Lazy } from 'lazyinject';
import { ISomeInterface } from './interface/ISomeInterface';

export const someClassSymbol = Symbol('SomeClass');

@Export(someClassSymbol)
class SomeClass implements ISomeClass{
  constructor(
    @ImportMany('ISomeInterface')
    private readonly implementations: ISomeInterface[],
  ) {}

  print = () => this.implementations.forEach((impl) => impl.print());
}
export interface ISomeClass{
  print: () => void;
}