import { Container } from '../src/container';
import { ContainerRegistryStatic } from '../src/containerRegistry';
import { InterfaceType } from '../src/api/interfaceType';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';

// Mock ContainerRegistryStatic
jest.mock('../src/containerRegistry', () => ({
  ContainerRegistryStatic: {
    getExport: jest.fn(),
    getMany: jest.fn(),
  },
}));

describe('Container', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container(ContainerRegistryStatic);
    jest.clearAllMocks();
  });

  test('get should return Value from lazy object', () => {
    const lazy = { Value: { foo: 'bar' } };
    (ContainerRegistryStatic.getExport as jest.Mock).mockReturnValue(lazy);

    const result = container.get<{ foo: string }>({} as InterfaceType);

    expect(result).toEqual({ foo: 'bar' });
    expect(ContainerRegistryStatic.getExport).toHaveBeenCalledTimes(1);
  });

  test('get should return undefined if no object found', () => {
    (ContainerRegistryStatic.getExport as jest.Mock).mockReturnValue(undefined);

    const result = container.get<unknown>({} as InterfaceType);

    expect(result).toBeUndefined();
  });

  test('getMany should return array of Values from lazy objects', () => {
    const lazyList = [
      { Value: 'a' },
      { Value: 'b' },
    ];

    (ContainerRegistryStatic.getMany as jest.Mock).mockReturnValue(lazyList);

    const result = container.getMany<string>({} as InterfaceType);

    expect(result).toEqual(['a', 'b']);
    expect(ContainerRegistryStatic.getMany).toHaveBeenCalledTimes(1);
  });

  test('getMany should return empty array if no object found', () => {
    (ContainerRegistryStatic.getMany as jest.Mock).mockReturnValue(undefined);

    const result = container.getMany<unknown>({} as InterfaceType);

    expect(result).toEqual([]);
  });
});
