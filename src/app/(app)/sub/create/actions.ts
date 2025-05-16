'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { actionClient } from '~/lib/safe-action';
import { subsService } from '~/services/subs.service';
import { createSubFormSchema } from './_components/form-schema';

export const myFirstServerAction = actionClient
  .schema(createSubFormSchema)
  .action(async ({ parsedInput }) => {
    let newSubId: number;

    try {
      const result = await subsService.create(parsedInput);
      newSubId = result;
    } catch (error) {
      console.error({ error });
      throw new Error('Failed to create subscription');
    }

    revalidatePath('/sub', 'page');
    redirect('/sub');
    return newSubId;
  });
