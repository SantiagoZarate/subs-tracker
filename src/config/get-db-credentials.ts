import path from 'node:path';
import envs from './envs';

export const dbCredentials = {
  url: '',
  authToken: 'no-token',
};

if (process.env.NODE_ENV === 'development') {
  const dbPath = path.resolve(__dirname, '../db/test.db');
  dbCredentials.url = `file:${dbPath}`;
} else {
  dbCredentials.authToken = envs.TURSO.TOKEN;
  dbCredentials.url = envs.TURSO.URL;
}
