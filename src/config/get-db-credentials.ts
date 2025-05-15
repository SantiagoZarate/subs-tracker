import envs from './envs';

export const dbCredentials =
  process.env.NODE_ENV !== 'production'
    ? {
        url: `file:/home/santiago/dev/next/sub-tracker/src/db/test.db`,
        authToken: '',
      }
    : {
        url: envs.TURSO.URL,
        authToken: envs.TURSO.TOKEN,
      };
