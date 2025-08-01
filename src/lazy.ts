import { ExportedType, isConstructorType } from './api/ConstructorType';
import { ContainerRegistry } from './containerRegistry';

/**
 * A wrapper class that lazily resolves and stores a value of type `T`.
 *
 * The value can be either a pre-existing object or a class constructor.
 * If it's a constructor, dependencies will be resolved from the container
 * and the instance will be created upon first access to {@link Lazy#Value}.
 *
 * After the first access, the resolved value is cached, and {@link Lazy#HasValue}
 * becomes `true`.
 *
 * @typeParam T - The type of the wrapped value.
 * @example
 * // Wrapping a plain object
 * const myService = { print: () => console.log("Hello!") };
 * const lazyObject = new Lazy(myService);
 *
 * console.log(lazyObject.HasValue); // false
 * lazyObject.Value?.print();        // "Hello!"
 * console.log(lazyObject.HasValue); // true
 *
 * @example
 * // Wrapping a class constructor (DI will resolve dependencies automatically)
 * class Service {
 *   constructor(private logger: Logger) {}
 *   print() { this.logger.log("Hi from Service"); }
 * }
 *
 * const lazyService = new Lazy(Service);
 * const serviceInstance = lazyService.Value;
 * serviceInstance?.print(); // Logs: "Hi from Service"
 */
export class Lazy<T> {
  /**
   * Creates a new Lazy instance from either a class constructor or an object.
   *
   * @param objectCtor - The constructor function or plain object to wrap.
   * @param parentContainer - Container that owns this object and other dependencies
   */
  constructor(private readonly objectCtor: ExportedType, private readonly parentContainer: ContainerRegistry) {}

  private hasValue = false;
  private value: T | undefined = undefined;
  /**
   * Indicates whether the value has already been created or retrieved.
   * @readonly
   */
  public get HasValue() {
    return this.hasValue;
  }
  /**
   * Gets the lazily resolved value.
   *
   * - If the value has already been created, returns the cached value.
   * - If a plain object was passed, returns the object directly and caches it.
   * - If a constructor was passed, creates an instance using the container to
   *   resolve dependencies, then caches and returns it.
   *   @readonly
   */
  public get Value(): T | undefined {
    if (this.hasValue) return this.value;
    if (!isConstructorType(this.objectCtor)) {
      this.value = this.objectCtor as T;
      this.hasValue = true;
      return this.value;
    }

    const dependenciesTypes = this.parentContainer.getImport(
      this.objectCtor,
    );

    const dependencies = [];
    for (const dependency of dependenciesTypes) {
      dependencies[dependency.paramIndex] = dependency.single
        ? dependency.lazy
          ? this.parentContainer.getExport(dependency.type)
          : this.parentContainer.getExport(dependency.type)?.Value
        : dependency.lazy
          ? this.parentContainer.getMany(dependency.type)
          : this.parentContainer.getMany(dependency.type)?.map(
              (lazy) => lazy.Value,
            );
    }

    const obj = new this.objectCtor(...dependencies) as T;
    this.hasValue = true;
    this.value = obj;
    return obj;
  }
}
