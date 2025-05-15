import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { dbCredentials } from '~/config/get-db-credentials';
import { schema } from './schemas';

const client = createClient({ ...dbCredentials });

export const db = drizzle({ client, schema, logger: true });
