import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ContainerRegistryStatic } from '../../src/containerRegistry';
import { $ExportObject, Export } from '../../src';

jest.mock('../../src/containerRegistry');
const mockedRegistry = ContainerRegistryStatic as jest.Mocked<typeof ContainerRegistryStatic>;

describe('Export decorators', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should register class constructor with Export decorator', () => {
    class MyService {}

    const decorator = Export('IMyService');
    decorator(MyService);

    expect(mockedRegistry.setExport).toHaveBeenCalledWith(
      'IMyService',
      MyService
    );
  });

  test('Should register object with $ExportObject function', () => {
    const logger = {
      log: (msg: string) => console.log(msg)
    };

    $ExportObject(logger, 'ILogger');

    expect(mockedRegistry.setExport).toHaveBeenCalledWith(
      'ILogger',
      logger
    );
  });
});
