import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ContainerFactory } from '../src';
import { Container } from '../src/container';
import path from 'node:path';

jest.mock('../src/dynamicImport', () => ({
  __esModule: true,
  default: jest.fn(async () => {}),
}));
describe('Container factory tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Should create a container', async () => {
    const container = await ContainerFactory.create();
    expect(container).toBeDefined();
    expect(container).toBeInstanceOf(Container);
  });
  test('Should create custom container with catalog resolving', async () => {
    const pathSpy = jest.spyOn(path, 'resolve');
    const container = await ContainerFactory.create({
      baseDir: __dirname,
      catalogs: ['.'],
    });
    expect(container).toBeDefined();
    expect(container).toBeInstanceOf(Container);
    expect(pathSpy).toHaveBeenCalledWith(__dirname, '.');
  });
  test('Should fail with ENOENT', async () => {
    await expect(
      ContainerFactory.create({
        baseDir: __dirname,
        catalogs: ['SomeNonExistentDirectory'],
      }),
    ).rejects.toThrow('ENOENT');
  });
});
