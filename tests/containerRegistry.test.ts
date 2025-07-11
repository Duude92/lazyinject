import { ContainerRegistryStatic as registry } from '../src/containerRegistry';
import { Lazy } from '../src';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { InterfaceType } from '../src/api/interfaceType';

interface IContainerRegistry {
  exportedMap: Map<InterfaceType, Lazy<unknown>[]>;
  importedMap: Map<InterfaceType, Lazy<unknown>[]>;
}

describe('ContainerRegistry', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (registry as unknown as IContainerRegistry).exportedMap.clear();
    (registry as unknown as IContainerRegistry).importedMap.clear();
  });

  describe('setExport & getExport', () => {
    test('Should store and retrieve an object export by string key', () => {
      const obj = { hello: 'world' };
      registry.setExport('MyObject', obj);

      const lazy = registry.getExport<typeof obj>('MyObject');
      expect(lazy).toBeInstanceOf(Lazy);
      expect(lazy?.Value).toEqual(obj);
    });

    test('Should store and retrieve a constructor export by constructor function', () => {
      class Service {}

      registry.setExport(Service, Service);

      const lazy = registry.getExport<Service>(Service);
      expect(lazy).toBeInstanceOf(Lazy);
      expect(lazy?.Value).toBeInstanceOf(Service);
    });

    test('Should store and retrieve export by symbol', () => {
      const sym = Symbol('IMySymbol');
      const obj = { a: 1 };
      registry.setExport(sym, obj);

      const lazy = registry.getExport<typeof obj>(sym);
      expect(lazy?.Value).toEqual(obj);
    });
  });

  describe('getMany', () => {
    test('Should return all Lazy exports for a type', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      registry.setExport('IType', obj1);
      registry.setExport('IType', obj2);

      const list = registry.getMany('IType');
      expect(list).toHaveLength(2);
      expect(list?.map((l) => l.Value)).toEqual([obj1, obj2]);
    });

    test('Should resolve type by constructor name and Symbol', () => {
      class Logger {}

      const obj = { msg: 'log' };
      registry.setExport(Logger.name, obj);

      const list = registry.getMany(Logger);
      expect(list?.[0].Value).toEqual(obj);
      const list2 = registry.getMany(Symbol('Logger'));
      expect(list2?.[0].Value).toEqual(obj);
    });
    test('Should return all Lazy exports for a Symbol', () => {
      const sym = Symbol('IMySymbol');
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      registry.setExport(sym, obj1);
      registry.setExport(sym, obj2);

      const list = registry.getMany(sym);
      expect(list).toHaveLength(2);
      expect(list?.map((l) => l.Value)).toEqual([obj1, obj2]);
    });
  });

  describe('setImport & getImport', () => {
    test('Should store and retrieve import definitions', () => {
      class MyService {}

      const ctorType = MyService;
      const depType = 'ILogger';

      registry.setImport(ctorType, depType, 0, { single: true, lazy: false });

      const imports = registry.getImport(ctorType);
      expect(imports).toHaveLength(1);
      expect(imports[0]).toEqual({
        type: depType,
        paramIndex: 0,
        single: true,
        lazy: false,
      });
    });

    test('Should default single=true if not provided', () => {
      class MyService {}

      registry.setImport(MyService, 'ILogger', 0, { lazy: true });

      const imports = registry.getImport(MyService);
      expect(imports[0].single).toBe(true);
    });

    test('Should return empty array if no imports registered', () => {
      const result = registry.getImport('Unregistered');
      expect(result).toEqual([]);
    });
  });

  describe('singleton', () => {
    test('Should share state globally', () => {
      const reg1 = registry;
      const reg2 = registry;

      reg1.setExport('Shared', { shared: true });
      const fromSecond = reg2.getExport('Shared');

      expect(fromSecond?.Value).toEqual({ shared: true });
    });
  });
});
