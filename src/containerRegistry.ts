import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';
import { ExportedType } from './api/ConstructorType';
import { IImportedType } from './api/IImportedType';
import { IContainerRegistryImportOptions } from './api/IContainerRegistryImportOptions';
import { Container } from './container';

/**
 * Container object which stores imported and exported objects|constructor functions
 */
export class ContainerRegistry {
  private exportedMap = new Map<InterfaceType, Lazy<unknown>[]>();
  private importedMap = new Map<InterfaceType, IImportedType[]>();

  constructor() {}

  /**
   * Adds given constructor function | object to {@link type} list of exported mappings
   * @param type Type of {@link exportedObject} function | object
   * @param exportedObject Constructor function or object that needs to be resolved later
   */
  setExport(type: InterfaceType, exportedObject: ExportedType): void {
    let array = this.exportedMap.get(type);
    if (!array) {
      array = [];
      this.exportedMap.set(type, array);
    }
    array.push(new Lazy(exportedObject));
  }

  /**
   * Retrieves single Lazy object of previously stored object or constructor function using {@link Export} decorator or {@link $ExportObject} function
   * @param type Type of object or constructor function to retrieve to
   */
  getExport<T>(type: InterfaceType): Lazy<T> | undefined {
    const directGet = this.exportedMap.get(type);
    if (directGet) {
      return directGet[0] as Lazy<T>;
    }
    if (typeof type === 'function') {
      return this.exportedMap.get(type.name)![0] as Lazy<T>;
    }
    if (typeof type === 'symbol') {
      return this.exportedMap.get(type.description!)![0] as Lazy<T>;
    }
  }

  /**
   * Retrieves list of Lazy objects of previously stored objects or constructor functions using {@link Export} decorator or {@link $ExportObject} function
   * @param type Type of object or constructor function to retrieve to
   */
  getMany<T>(type: InterfaceType): Lazy<T>[] | undefined {
    const directGet = this.exportedMap.get(type);
    if (directGet) {
      return directGet as Lazy<T>[];
    }
    if (typeof type === 'function') {
      return this.exportedMap.get(type.name) as Lazy<T>[];
    }
    if (typeof type === 'symbol') {
      return this.exportedMap.get(type.description!) as Lazy<T>[];
    }
  }

  /**
   * Adds object to importedArray, which used to instantiate dependencies
   * @param ctorType Imported object interface identifier
   * @param importType Imported object constructor identifier
   * @param parameterIndex Index of constructor parameter
   * @param options Additional options
   */
  setImport(
    ctorType: InterfaceType,
    importType: InterfaceType,
    parameterIndex: number,
    options: IContainerRegistryImportOptions,
  ): void {
    const single = options.single ?? true;
    if (!this.importedMap.has(ctorType)) {
      this.importedMap.set(ctorType, []);
    }
    const importedArray = this.importedMap.get(ctorType)!;
    importedArray.push({
      type: importType,
      paramIndex: parameterIndex,
      single,
      lazy: options.lazy,
    });
  }

  /**
   * Retrieves dependency list for given constructor type
   * @param ctorType Type of class to retrieve dependencies to
   */
  getImport(ctorType: InterfaceType): IImportedType[] {
    return this.importedMap.get(ctorType) ?? [];
  }
}

/**
 * Single {@link ContainerRegistry} static object for whole project
 */
export const ContainerRegistryStatic = new ContainerRegistry();
export const containersRegistry: IContainersRegistry = {
  registry: new Map<string, Container>(),
  currentContainer: null,
  register(container: Container, containerConfigId: string) {
    this.registry.set(containerConfigId, container);
    this.currentContainer = containerConfigId;
  },
};

interface IContainersRegistry {
  registry: Map<string, Container>;
  register: (container: Container, containerConfigId: string) => void;
  currentContainer: null | string;
}
