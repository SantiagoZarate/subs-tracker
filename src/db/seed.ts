import { db } from '.';
import { user } from './schemas/user.schema';
import { UserInsert } from './types/user.type';

async function seed() {
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
