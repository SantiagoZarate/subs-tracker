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
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { myFirstServerAction } from '../actions';
import { companies, subscriptionServices } from '../constants';

export const createSubFormSchema = z.object({
  name: z.string(),
  service: z.enum(companies),
  price: z.coerce.number().min(1),
});

export type CreateSubForm = z.infer<typeof createSubFormSchema>;

export function CreateSubForm() {
  const formState = useForm<CreateSubForm>({
    resolver: zodResolver(createSubFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      service: 'ChatGPT',
    },
  });

  const { execute, isExecuting } = useAction(myFirstServerAction, {
    onSuccess() {
      toast.success('Subscription added succesfully');
    },
    onError() {
      toast.error('there was an error');
    },
  });

  return (
    <Form {...formState}>
      <form
        onSubmit={formState.handleSubmit((data) => execute(data))}
        className="flex flex-col gap-8"
      >
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
