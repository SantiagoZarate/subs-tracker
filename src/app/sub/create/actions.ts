'use server';

import { CreateSubForm } from './_components/create-sub-form';

export async function myFirstServerAction(data: CreateSubForm) {
  console.log({ data });
}
