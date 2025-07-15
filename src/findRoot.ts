import path from 'node:path';
import fs from 'node:fs';

const configname = 'lazyinject.config.js';

export default function (lookupDir: string) {
  let current = lookupDir;
  while (true) {
    const pkgPath = path.join(current, configname);
    if (fs.existsSync(pkgPath)) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
}
