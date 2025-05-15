import envs from '@/config/envs';
import { db } from '.';
import { user } from './schemas/user.schema';
import { UserInsert } from './types/user.type';

async function seed() {
  if (!envs.SEED) {
    console.error('Enable SEED variable to run this function');
    process.exit(0);
  }

  const users: UserInsert[] = [
    {
      name: 'Santiago',
    },
    {
      name: 'Martin',
    },
  ];

  await db.insert(user).values(users);
  console.log('Succesfull seed');
}

seed();
