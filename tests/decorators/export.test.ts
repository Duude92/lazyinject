import { beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { containersRegistry } from '../../src/containerRegistry';
import { $ExportObject, ContainerFactory, Export } from '../../src';

jest.mock('../../src/containerRegistry');
const mockedRegistry = containersRegistry as jest.Mocked<typeof containersRegistry>;

describe('Export decorators', () => {
  beforeAll(async () => {
    await ContainerFactory.create({ baseDir: '', catalogs: [] });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should register class constructor with Export decorator', () => {
    class MyService {}

    const decorator = Export('IMyService');
    decorator(MyService);

    expect(mockedRegistry.setExport).toHaveBeenCalledWith('IMyService', MyService);
  });

  test('Should register object with $ExportObject function', () => {
    const logger = {
      log: (msg: string) => console.log(msg),
    };

    $ExportObject(logger, 'ILogger');

    expect(mockedRegistry.setExport).toHaveBeenCalledWith('ILogger', logger);
  });
});
