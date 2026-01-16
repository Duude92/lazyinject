import { InterfaceType } from './api/interfaceType';
import { Lazy } from './lazy';
import { ExportedType } from './api/ConstructorType';
import { IImportedType } from './api/IImportedType';
import { IContainerRegistryImportOptions } from './api/IContainerRegistryImportOptions';
import { getAliasedObjects, IAliasedObject, makeAlias } from './api/IAliasedObject';

/**
 * Container object which stores imported and exported objects|constructor functions
 */
class ContainerRegistry {
  private exportedMap = new Map<InterfaceType, IAliasedObject>();
  private importedMap = new Map<InterfaceType, IImportedType[]>();

  private addToAlias(aliases: string[], obj: Lazy<unknown>, parent: IAliasedObject) {
    parent.objects.push(obj);
    if (aliases.length < 1) return;
    if (parent.child) {
      const child = parent.child.find((x) => x.alias === aliases[0]);
      if (child) {
        aliases.shift();
        this.addToAlias(aliases, obj, child);
        return;
      }
      parent.child.push(makeAlias(aliases, obj));
      return;
    }
    parent.child = [makeAlias(aliases, obj)];
  }

  constructor() {}

  /**
   * Adds given constructor function | object to {@link type} list of exported mappings
   * @param type Type of {@link exportedObject} function | object
   * @param exportedObject Constructor function or object that needs to be resolved later
   */
  setExport(type: InterfaceType, exportedObject: ExportedType): void {
    if (typeof type !== 'string') {
      let array = this.exportedMap.get(type);
      if (!array) {
        array = { alias: type.toString(), objects: [] };
        this.exportedMap.set(type, array);
      }
      array.objects.push(new Lazy(exportedObject));
      return;
    }
    const path = type.split('.');
    const lazyObject = new Lazy(exportedObject);
    const alias = path.shift()!;
    const aliasedObject = this.exportedMap.get(alias);
    if (!aliasedObject) {
      this.exportedMap.set(alias, makeAlias(path, lazyObject));
      return;
    }
    this.addToAlias(path, lazyObject, aliasedObject);
  }

  /**
   * Retrieves single Lazy object of previously stored object or constructor function using {@link Export} decorator or {@link $ExportObject} function
   * @param type Type of object or constructor function to retrieve to
   */
  getExport<T>(type: InterfaceType): Lazy<T> | undefined {
    if (typeof type === 'string') {
      const path = type.split('.');
      if (path.length > 1) {
        const alias = path.shift()!;
        const aliasedObject = this.exportedMap.get(alias);
        if (!aliasedObject) return;
        return getAliasedObjects(path, aliasedObject)?.objects[0] as Lazy<T>;
      }
    }
    const directGet = this.exportedMap.get(type);
    if (directGet) {
      return directGet.objects[0] as Lazy<T>;
    }
    if (typeof type === 'function') {
      return this.exportedMap.get(type.name)?.objects[0] as Lazy<T>;
    }
    if (typeof type === 'symbol') {
      return this.exportedMap.get(type.description!)?.objects[0] as Lazy<T>;
    }
  }

  /**
   * Retrieves list of Lazy objects of previously stored objects or constructor functions using {@link Export} decorator or {@link $ExportObject} function
   * @param type Type of object or constructor function to retrieve to
   */
  getMany<T>(type: InterfaceType): Lazy<T>[] | undefined {
    if (typeof type === 'string') {
      const path = type.split('.');
      if (path.length > 1) {
        const alias = path.shift()!;
        const aliasedObject = this.exportedMap.get(alias);
        if (!aliasedObject) return;
        return getAliasedObjects(path, aliasedObject)?.objects as Lazy<T>[];
      }
    }
    const directGet = this.exportedMap.get(type);
    if (directGet) {
      return directGet.objects as Lazy<T>[];
    }
    if (typeof type === 'function') {
      return this.exportedMap.get(type.name)?.objects as Lazy<T>[];
    }
    if (typeof type === 'symbol') {
      return this.exportedMap.get(type.description!)?.objects as Lazy<T>[];
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
    options: IContainerRegistryImportOptions
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
