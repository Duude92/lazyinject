import { ConstructorType } from './ConstructorType';

/**
 * Identifier for registering exported constructor functions
 */
export type InterfaceType =
  | string
  | symbol
  | ConstructorType;
