'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { myFirstServerAction } from '../actions';
import { subscriptionServices } from '../constants';

const createSubForm = z.object({
  name: z.string(),
  service: z.string(),
  price: z.coerce.number(),
});

export type CreateSubForm = z.infer<typeof createSubForm>;

export function CreateSubForm() {
  const formState = useForm<CreateSubForm>({
    resolver: zodResolver(createSubForm),
    defaultValues: {
      name: '',
      price: 0,
      service: '',
    },
  });

  const handleSubmit = (data: CreateSubForm) => {
    myFirstServerAction(data);
  };

  return (
    <Form {...formState}>
      <form action="" className="flex flex-col gap-8">
        <FormField
          name="name"
          control={formState.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Subscription name</FormLabel>
              <Input placeholder="example" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formState.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subscriptionServices.map((service) => (
                    <SelectItem value={service.name}>{service.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{' '}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={formState.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Subscription Price</FormLabel>
              <Input placeholder="example" type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Create</Button>
      </form>
    </Form>
  );
}
