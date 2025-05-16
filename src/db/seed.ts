import { companies } from '@/(app)/sub/create/constants';
import envs from '~/config/envs';
import { db } from '.';
import { company } from './schemas/company.schema';
import { user } from './schemas/user.schema';
import { UserInsert } from './types/user.type';

async function seed() {
  if (!envs.SEED) {
    console.error('Enable SEED variable to run this function');
    process.exit(0);
  }

  await db.delete(user);

  const users: UserInsert[] = [
    {
      name: 'Santiago',
    },
    {
      name: 'Martin',
    },
  ];

  await db.insert(user).values(users);

  const companiesSeed = companies.map((c) => ({ id: c, name: c }));
  await db.insert(company).values(companiesSeed);

  console.log('Succesfull seed');
}

seed();
