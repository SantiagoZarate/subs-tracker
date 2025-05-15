'use server';

import { actionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSubFormSchema } from './_components/create-sub-form';

export const myFirstServerAction = actionClient
  .schema(createSubFormSchema)
  .action(async ({ clientInput }) => {
    throw new Error('LOL');
    console.log({ clientInput });

    revalidatePath('/sub', 'page');
    redirect('/sub');
  });
