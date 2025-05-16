'use client';

import { SpriteIcon } from '@/components/sprite-icon/sprite-icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
import { differenceInCalendarDays, format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CompanyDTO } from '~/common/dtos/company.dto';
import { getEndDate } from '~/lib/get-end-date';
import { cn } from '~/lib/utils';
import { myFirstServerAction } from '../actions';
import {
  createSubFormSchema,
  CreateSubFormSchema,
  timeIntervals,
} from './form-schema';
import { SubCard } from './sub-card';

interface Props {
  companies: CompanyDTO[];
}

export function CreateSubForm({ companies }: Props) {
  const formState = useForm<CreateSubFormSchema>({
    resolver: zodResolver(createSubFormSchema),
    defaultValues: {
      name: '',
      price: undefined,
      service: undefined,
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

  const endSubscriptionDate = getEndDate(
    formState.watch('startAt'),
    formState.watch('duration'),
    formState.watch('timeInterval'),
  );

  const daysLeft = differenceInCalendarDays(endSubscriptionDate, new Date());

  return (
    <Form {...formState}>
      <section className="grid grid-cols-[1fr_auto] gap-8">
        <form
          onSubmit={formState.handleSubmit(execute)}
          className="flex flex-col divide-y [&>section]:py-12"
        >
          <section>
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
          </section>
          <section className="flex gap-4 *:flex-1">
            <FormField
              control={formState.control}
              name="service"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <SpriteIcon name="CIRCLE_BADGE" />
                    Company
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            <p className="flex items-center gap-2">
                              <Icon
                                iconId={
                                  companies.find(
                                    (company) => company.id === field.value,
                                  )?.id!
                                }
                              />
                              <span>
                                {
                                  companies.find(
                                    (company) => company.id === field.value,
                                  )?.name
                                }
                              </span>
                            </p>
                          ) : (
                            'Select language'
                          )}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                value={company.id}
                                key={company.id}
                                onSelect={() => {
                                  formState.setValue('service', company.id);
                                }}
                              >
                                <Icon iconId={company.id} />
                                {company.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    company.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
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
                  <FormLabel>
                    <SpriteIcon name={'DOLAR_SIGN'} />
                    Subscription Price
                  </FormLabel>
                  <Input placeholder="$20.00" type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="grid grid-cols-2 gap-2">
              <FormField
                control={formState.control}
                name="timeInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Interval</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time interval" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeIntervals.map((time) => (
                          <SelectItem value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            </section>
            <FormDescription className="flex">
              <p className="pr-2">
                Subscription ends in {endSubscriptionDate.toLocaleDateString()}
              </p>
              <span className="pl-2">{daysLeft} Days left</span>
            </FormDescription>
          </section>
          <section>
            <FormField
              control={formState.control}
              name="notifyWhenCloseToFinish"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4 shadow">
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
          </section>
          <Button>Create</Button>
        </form>
        <section className="relative w-full">
          <SubCard />
        </section>
      </section>
    </Form>
  );
}
