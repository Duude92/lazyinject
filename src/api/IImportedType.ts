import { InterfaceType } from './interfaceType';

export interface IImportedType {
  type: InterfaceType;
  paramIndex: number;
  single: boolean;
  lazy?: boolean;
}
