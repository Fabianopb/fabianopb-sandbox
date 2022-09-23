import * as database from './database';
import * as server from './server';

(async () => {
  try {
    await database.init();
    server.init();
  } catch (error) {
    console.error('Server closed unexpectedly!', error);
    await database.close();
  }
})();
