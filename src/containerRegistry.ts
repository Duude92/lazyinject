import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';
import { ConstructorType } from './api/ConstructorType';
import { IImportedType } from './api/IImportedType';

class ContainerRegistry {
  private exportedMap = new Map<InterfaceType, Lazy<unknown>>();
  private importedMap = new Map<InterfaceType, IImportedType[]>();

  constructor() {}

  setExport(type: InterfaceType, constructor: ConstructorType): void {
    if (typeof type === 'function') {
      this.exportedMap.set(type.name, new Lazy(constructor));
    }
    if (typeof type === 'symbol') {
      this.exportedMap.set(type.description!, new Lazy(constructor));
    }

    this.exportedMap.set(type, new Lazy(constructor));
  }

  getExport<T>(type: InterfaceType): Lazy<T> | undefined {
    const directGet = this.exportedMap.get(type) as Lazy<T>;
    if (directGet) return directGet;
    if (typeof type === 'function') {
      return this.exportedMap.get(type.name) as Lazy<T>;
    }
    if (typeof type === 'symbol') {
      return this.exportedMap.get(type.description!) as Lazy<T>;
    }
  }

  setImport(
    ctorType: InterfaceType,
    importType: InterfaceType,
    parameterIndex: number,
  ): void {
    if (!this.importedMap.has(ctorType)) {
      this.importedMap.set(ctorType, []);
    }
    const importedArray = this.importedMap.get(ctorType)!;
    importedArray.push({
      type: importType,
      paramIndex: parameterIndex,
    });
  }

  getImport(ctorType: InterfaceType): IImportedType[] {
    return this.importedMap.get(ctorType) ?? [];
  }
}

export const ContainerRegistryStatic = new ContainerRegistry();
