import path from 'node:path';
import envs from './envs';

export const dbCredentials = {
  url: '',
  authToken: '',
};

if (process.env.NODE_ENV === 'development') {
  console.log('ESTOY EN DESARROLLO');

  const dbPath = path.resolve(__dirname, '../db/test.db');
  dbCredentials.url = `file:${dbPath}`;
} else {
  dbCredentials.authToken = envs.TURSO.TOKEN;
  dbCredentials.url = envs.TURSO.URL;
}
