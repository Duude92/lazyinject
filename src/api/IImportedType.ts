import { InterfaceType } from './interfaceType';

/**
 * Interface for registered @Import / @ImportMany parameters
 */
export interface IImportedType {
  type: InterfaceType;
  paramIndex: number;
  single: boolean;
  lazy?: boolean;
}
