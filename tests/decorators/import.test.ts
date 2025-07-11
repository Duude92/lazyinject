import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ContainerRegistryStatic } from '../../src/containerRegistry';
import { Import, ImportMany } from '../../src';

jest.mock('../../src/containerRegistry');
const mockedRegistry = ContainerRegistryStatic as jest.Mocked<typeof ContainerRegistryStatic>;

describe('Import decorators', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  class TestClass {
  }

  test('Should register Import with single = true and lazy = undefined', () => {
    const decorator = Import('ILogger');

    decorator(TestClass, 'constructor', 0);

    expect(mockedRegistry.setImport).toHaveBeenCalledWith(TestClass, 'ILogger', 0, {
      single: true,
      lazy: undefined,
    });
  });

  test('Should register Import with single = true and lazy = true', () => {
    const decorator = Import('ILogger', { lazy: true });

    decorator(TestClass, 'constructor', 1);

    expect(mockedRegistry.setImport).toHaveBeenCalledWith(TestClass, 'ILogger', 1, {
      single: true,
      lazy: true,
    });
  });

  test('Should register ImportMany with single = false and lazy = false', () => {
    const decorator = ImportMany('ILogger', { lazy: false });

    decorator(TestClass, 'constructor', 2);

    expect(mockedRegistry.setImport).toHaveBeenCalledWith(TestClass, 'ILogger', 2, {
      single: false,
      lazy: false,
    });
  });

  test('Should register ImportMany with single = false and lazy = undefined', () => {
    const decorator = ImportMany('ILogger');

    decorator(TestClass, 'constructor', 3);

    expect(mockedRegistry.setImport).toHaveBeenCalledWith(TestClass, 'ILogger', 3, {
      single: false,
      lazy: undefined,
    });
  });
});
