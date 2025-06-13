import { ConstructorType } from './api/ConstructorType';

export class Lazy<T> {
  constructor(private readonly objectCtor: ConstructorType) {}

  private hasValue = false;
  private value: T | undefined = undefined;

  public get HasValue() {
    return this.hasValue;
  }

  public get Value(): T | undefined {
    return this.hasValue
      ? this.value
      : (() => {
          const obj = new this.objectCtor() as T;
          this.hasValue = true;
          return obj;
        })();
  }
}
