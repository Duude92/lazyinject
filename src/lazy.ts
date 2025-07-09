import { ConstructorType } from './api/ConstructorType';
import { ContainerRegistryStatic } from './containerRegistry';

export class Lazy<T> {
  constructor(private readonly objectCtor: ConstructorType) {}

  private hasValue = false;
  private value: T | undefined = undefined;

  public get HasValue() {
    return this.hasValue;
  }

  public get Value(): T | undefined {
    if (this.hasValue) return this.value;

    const dependenciesTypes = ContainerRegistryStatic.getImport(
      this.objectCtor,
    );

    const dependencies = [];
    for (const dependency of dependenciesTypes) {
      dependencies[dependency.paramIndex] = dependency.single
        ? dependency.lazy
          ? ContainerRegistryStatic.getExport(dependency.type)
          : ContainerRegistryStatic.getExport(dependency.type)?.Value
        : dependency.lazy
          ? ContainerRegistryStatic.getMany(dependency.type)
          : ContainerRegistryStatic.getMany(dependency.type)?.map(
              (lazy) => lazy.Value,
            );
    }

    const obj = new this.objectCtor(...dependencies) as T;
    this.hasValue = true;
    this.value = obj;
    return obj;
  }
}
