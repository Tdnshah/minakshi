import * as migration_20260329_101455 from './20260329_101455';
import * as migration_20260329_185436 from './20260329_185436';
import * as migration_20260606_184256 from './20260606_184256';

export const migrations = [
  {
    up: migration_20260329_101455.up,
    down: migration_20260329_101455.down,
    name: '20260329_101455',
  },
  {
    up: migration_20260329_185436.up,
    down: migration_20260329_185436.down,
    name: '20260329_185436',
  },
  {
    up: migration_20260606_184256.up,
    down: migration_20260606_184256.down,
    name: '20260606_184256'
  },
];
