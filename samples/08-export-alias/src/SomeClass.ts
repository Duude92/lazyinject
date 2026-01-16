import { Export, Import, ImportMany } from '@duude92/lazyinject';
import { ISomeInterface } from './interface/ISomeInterface';

export const someClassSymbol = Symbol('SomeClass');

@Export(someClassSymbol)
class SomeClass implements ISomeClass {
  constructor(
    @ImportMany('ISomeInterface')
    private readonly implementations: ISomeInterface[],
    @Import('ISomeInterface.impl2')
    private readonly impl2: ISomeInterface
  ) {}

  print = () => {
    console.log('Base alias implementations:');
    this.implementations.forEach((impl) => impl.print());
    console.log('Specified implementation 2:');
    this.impl2.print();
  };
}
export interface ISomeClass {
  print: () => void;
}
