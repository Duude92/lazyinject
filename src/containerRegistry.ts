import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';
import { ConstructorType } from './api/ConstructorType';
import { IImportedType } from './api/IImportedType';

class ContainerRegistry {
  private exportedMap = new Map<InterfaceType, Lazy<unknown>[]>();
  private importedMap = new Map<InterfaceType, IImportedType[]>();

  constructor() {}

  setExport(type: InterfaceType, constructor: ConstructorType): void {
    let description = type;
    if (typeof type === 'function') {
      description = type.name;
    }
    if (typeof type === 'symbol') {
      description = type.description!;
    }
    let array = this.exportedMap.get(type);
    if (!array) {
      array = [];
      this.exportedMap.set(description, array);
    }
    array.push(new Lazy(constructor));
  }

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
   * @param single Defines if dependency is single value or array
   */
  setImport(
    ctorType: InterfaceType,
    importType: InterfaceType,
    parameterIndex: number,
    single = true
  ): void {
    if (!this.importedMap.has(ctorType)) {
      this.importedMap.set(ctorType, []);
    }
    const importedArray = this.importedMap.get(ctorType)!;
    importedArray.push({
      type: importType,
      paramIndex: parameterIndex,
      single
    });
  }

  getImport(ctorType: InterfaceType): IImportedType[] {
    return this.importedMap.get(ctorType) ?? [];
  }
}

export const ContainerRegistryStatic = new ContainerRegistry();
