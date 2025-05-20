import { companies } from '@/(app)/sub/create/constants';
import envs from '~/config/envs';
import { db } from '.';
import { user } from './schemas/auth.schema';
import { company } from './schemas/company.schema';

async function seed() {
  if (!envs.SEED) {
    console.error('Enable SEED variable to run this function');
    process.exit(0);
  }

  await db.delete(user);

  const companiesSeed = companies.map((c) => ({ id: c, name: c }));
  await db.insert(company).values(companiesSeed);

  console.log('Succesfull seed');
}

seed();
