import { Export, ImportMany, Lazy } from 'lazyinject';
import { ISomeInterface } from './interface/ISomeInterface';


@Export(SomeClass)
export class SomeClass {
  randInt: number;

  constructor(
    @ImportMany('ISomeInterface', { lazy: true })
    private readonly implementations: Lazy<ISomeInterface>[],
  ) {
    this.randInt = Math.floor(Math.random() * implementations.length);
  }

  printRandom = () => this.implementations[this.randInt].Value.print();
  printInformation = () => {
    console.log(`Random: ${this.randInt}`);
    console.log(`Implementations values:}`);
    console.log(
      this.implementations.map((x, index) => ({
        index: index,
        HasValue: x.HasValue,
      })),
    );
  };
}
