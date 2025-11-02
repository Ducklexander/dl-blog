import * as migration_20240101_000000_init from './20240101_000000_init';
import * as migration_20240101_000001_artwork_medium from './20240101_000001_artwork_medium';

export const migrations = [
  {
    up: migration_20240101_000000_init.up,
    down: migration_20240101_000000_init.down,
    name: '20240101_000000_init',
  },
  {
    up: migration_20240101_000001_artwork_medium.up,
    down: migration_20240101_000001_artwork_medium.down,
    name: '20240101_000001_artwork_medium'
  },
];
