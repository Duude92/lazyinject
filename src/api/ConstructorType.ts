export type ConstructorType<T = unknown> = new (...args: unknown[]) => T;
export type ExportedType<T = unknown> = ConstructorType<T> | object;
export const isConstructorType = (
  inputObject: unknown,
): inputObject is ConstructorType =>
  typeof inputObject === 'function' &&
  !!inputObject.prototype &&
  inputObject.prototype.constructor === inputObject;
