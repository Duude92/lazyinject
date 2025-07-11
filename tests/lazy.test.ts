import { ContainerRegistryStatic } from '../src/containerRegistry';
import { isConstructorType } from '../src/api/ConstructorType';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Lazy } from '../src';

jest.mock('../src/containerRegistry');
jest.mock('../src/api/ConstructorType');

const mockedRegistry = ContainerRegistryStatic as jest.Mocked<typeof ContainerRegistryStatic>;
const mockedIsConstructorType = isConstructorType as unknown as jest.Mock;

describe('Lazy<T>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return a plain object and cache it', () => {
    const service = { print: () => 'hello' };
    mockedIsConstructorType.mockReturnValue(false);

    const lazy = new Lazy(service);

    expect(lazy.HasValue).toBe(false);
    const val = lazy.Value;
    expect(val).toBe(service);
    expect(lazy.HasValue).toBe(true);
    expect(lazy.Value).toBe(val); // Cached value
  });

  test('Should instantiate a constructor with no dependencies and cache it', () => {
    class TestService {
      print() { return 'hello'; }
    }

    mockedIsConstructorType.mockReturnValue(true);
    mockedRegistry.getImport.mockReturnValue([]);

    const lazy = new Lazy(TestService);
    const val = lazy.Value;

    expect(val).toBeInstanceOf(TestService);
    expect(lazy.HasValue).toBe(true);
    expect(lazy.Value).toBe(val); // Should return cached
  });

  test('Should instantiate a constructor with single, eager dependencies', () => {
    class Logger {
      log() {}
    }
    class Service {
      constructor(public logger: Logger) {}
    }

    const loggerInstance = { log: jest.fn() };

    mockedIsConstructorType.mockReturnValue(true);
    mockedRegistry.getImport.mockReturnValue([
      {
        type: Logger,
        single: true,
        lazy: false,
        paramIndex: 0,
      }
    ]);

    mockedRegistry.getExport.mockReturnValue({
      Value: loggerInstance
    } as Lazy<unknown>);

    const lazy = new Lazy<Service>(Service);
    const instance = lazy.Value;

    expect(instance).toBeInstanceOf(Service);
    expect(instance?.logger).toBe(loggerInstance);
  });

  test('Should support single, lazy dependencies', () => {
    class Logger {
      log() {}
    }
    class Service {
      constructor(public logger: Logger) {}
    }

    const lazyLogger = { Value: { log: jest.fn() } } as Lazy<unknown>;

    mockedIsConstructorType.mockReturnValue(true);
    mockedRegistry.getImport.mockReturnValue([
      {
        type: Logger,
        single: true,
        lazy: true,
        paramIndex: 0,
      }
    ]);

    mockedRegistry.getExport.mockReturnValue(lazyLogger);

    const lazy = new Lazy<Service>(Service);
    const instance = lazy.Value;

    expect(instance?.logger).toBe(lazyLogger);
  });

  test('Should support multiple dependencies', () => {
    class Dependency {}
    class Consumer {
      constructor(public deps: Dependency[]) {}
    }

    const depInstances = [{}, {}];

    mockedIsConstructorType.mockReturnValue(true);
    mockedRegistry.getImport.mockReturnValue([
      {
        type: Dependency,
        single: false,
        lazy: false,
        paramIndex: 0,
      }
    ]);

    mockedRegistry.getMany.mockReturnValue(depInstances.map(d => ({ Value: d })) as Lazy<unknown>[]);

    const lazy = new Lazy<Consumer>(Consumer);
    const instance = lazy.Value;

    expect(instance?.deps).toEqual(depInstances);
  });

  test('Should support multiple lazy dependencies', () => {
    class Dependency {}
    class Consumer {
      constructor(public deps: Lazy<Dependency>[]) {}
    }

    const lazyDeps = [{ Value: 1 }, { Value: 2 }] as Lazy<unknown>[];

    mockedIsConstructorType.mockReturnValue(true);
    mockedRegistry.getImport.mockReturnValue([
      {
        type: Dependency,
        single: false,
        lazy: true,
        paramIndex: 0,
      }
    ]);

    mockedRegistry.getMany.mockReturnValue(lazyDeps);

    const lazy = new Lazy<Consumer>(Consumer);
    const instance = lazy.Value;

    expect(instance?.deps).toEqual(lazyDeps);
  });
});
