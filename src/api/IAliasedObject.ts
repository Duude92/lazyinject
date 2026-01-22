import { Lazy } from '../lazy.js';

export interface IAliasedObject {
  alias: string;
  objects: Lazy<unknown>[];
  child?: IAliasedObject[];
}
export const isAliasedObject = (obj: unknown): obj is IAliasedObject => {
  return obj !== null && typeof obj === 'object' && 'alias' in obj && 'objects' in obj;
};
export const makeAlias = (aliases: string[], obj: Lazy<unknown>): IAliasedObject => {
  return {
    alias: aliases.shift()!,
    objects: [obj],
    child: aliases.length > 0 ? [makeAlias(aliases, obj)] : undefined,
  };
};
export const getAliasedObjects = (path: string[], parent: IAliasedObject): IAliasedObject | undefined => {
    const alias = path.shift()!;
    const obj = parent.child?.find((x) => x.alias === alias);
    if (!obj) return;
    if (path.length < 1) {
      return obj;
    }
    return getAliasedObjects(path, obj);
  }