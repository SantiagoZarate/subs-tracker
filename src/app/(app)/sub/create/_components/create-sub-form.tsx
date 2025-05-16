'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CompanyDTO } from '~/common/dtos/company.dto';
import { cn } from '~/lib/utils';
import { myFirstServerAction } from '../actions';
import {
  createSubFormSchema,
  CreateSubFormSchema,
  timeIntervals,
} from './form-schema';

interface Props {
  companies: CompanyDTO[];
}

export function CreateSubForm({ companies }: Props) {
  const formState = useForm<CreateSubFormSchema>({
    resolver: zodResolver(createSubFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      service: 'ChatGPT',
      duration: 1,
      notifyWhenCloseToFinish: false,
      startAt: new Date(),
      timeInterval: 'month',
    },
  });

  const { execute, isExecuting } = useAction(myFirstServerAction, {
    onSuccess() {
      toast.success('Subscription added succesfully');
    },
    onError({ error }) {
      console.log({ error });
      toast.error('there was an error');
    },
  });

  const handleSubmit = (data: CreateSubFormSchema) => {
    execute(data);
  };

  return (
    <Form {...formState}>
      <form
        onSubmit={formState.handleSubmit(handleSubmit)}
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
                  {companies.map((service) => (
                    <SelectItem value={service.name}>
                      <Icon iconId={service.name} />
                      {service.name}
                    </SelectItem>
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
        <FormField
          control={formState.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of start</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formState.control}
          name="timeInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time interval" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeIntervals.map((time) => (
                    <SelectItem value={time}>{time}</SelectItem>
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
          name="duration"
          control={formState.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Subscription duration</FormLabel>
              <Input placeholder="example" type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formState.control}
          name="notifyWhenCloseToFinish"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Notify when subscription is close to finish
                </FormLabel>
                <FormDescription>
                  You can manage your email in{' '}
                  <Link href="/examples/forms">account settings</Link> page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button>Create</Button>
      </form>
    </Form>
  );
}
