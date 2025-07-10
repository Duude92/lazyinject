import { $ExportObject } from 'lazyinject';

$ExportObject(
  {
    print() {
      console.log('Hello from SimpleObject');
    },
  },
  'SimpleObject',
);
