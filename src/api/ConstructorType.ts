/**
 * Defines type for constructor function
 */
export type ConstructorType<T = unknown> = new (...args: unknown[]) => T;
/**
 * Defines type for @Export / $ExportObject functions
 */
export type ExportedType<T = unknown> = ConstructorType<T> | object;
/**
 * Checks if inputObject is of Constructor type function
 * @param inputObject Object to check
 */
export const isConstructorType = (
  inputObject: unknown,
): inputObject is ConstructorType =>
  typeof inputObject === 'function' &&
  !!inputObject.prototype &&
  inputObject.prototype.constructor === inputObject;
