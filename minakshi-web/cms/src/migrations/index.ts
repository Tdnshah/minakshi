import * as migration_20260329_101455 from './20260329_101455';
import * as migration_20260329_185436 from './20260329_185436';
import * as migration_20260606_184256 from './20260606_184256';
import * as migration_20260608_173946 from './20260608_173946';
import * as migration_20260609_133800 from './20260609_133800';
import * as migration_20260613_172011 from './20260613_172011';
import * as migration_20260826_132925_add_type_field_podcast_collection from './20260826_132925_add_type_field_podcast_collection';
import * as migration_20260828_add_thumbnail_podcast_collection from './20260828_add_thumbnail_podcast_collection';

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
    name: '20260606_184256',
  },
  {
    up: migration_20260608_173946.up,
    down: migration_20260608_173946.down,
    name: '20260608_173946',
  },
  {
    up: migration_20260609_133800.up,
    down: migration_20260609_133800.down,
    name: '20260609_133800',
  },
  {
    up: migration_20260613_172011.up,
    down: migration_20260613_172011.down,
    name: '20260613_172011',
  },
  {
    up: migration_20260826_132925_add_type_field_podcast_collection.up,
    down: migration_20260826_132925_add_type_field_podcast_collection.down,
    name: '20260826_132925_add_type_field_podcast_collection'
  },
  {
    up: migration_20260828_add_thumbnail_podcast_collection.up,
    down: migration_20260828_add_thumbnail_podcast_collection.down,
    name: '20260828_add_thumbnail_podcast_collection'
  },
];
