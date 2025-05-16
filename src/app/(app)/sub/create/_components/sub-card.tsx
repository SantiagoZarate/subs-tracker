import { M } from '@/components/motion/m';
import { Icon } from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence } from 'motion/react';
import { useFormContext } from 'react-hook-form';
import { formatMoney } from '~/lib/money-formatter';
import { CreateSubFormSchema } from './form-schema';

export function SubCard() {
  const form = useFormContext<CreateSubFormSchema>();

  const { service, name, notify, price } = {
    service: form.watch('service'),
    name: form.watch('name'),
    notify: form.watch('notifyWhenCloseToFinish'),
    price: form.watch('price'),
  };

  return (
    <div className="sticky top-[calc(var(--spacing-top)_+_48px)] flex h-fit w-[300px] flex-col gap-4 rounded-xl border p-4">
      <header className="flex items-center justify-between">
        <AnimatePresence mode="wait">
          {service ? (
            <M key={service} className="flex items-center gap-2">
              <Icon iconId={service!} />
              <p className="text-primary/60 text-xs">{service}</p>
            </M>
          ) : (
            <M className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-3 w-18" />
            </M>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {price ? (
            <M key="a" className="text-green-500">
              {formatMoney(price)}
            </M>
          ) : (
            <M key="b">
              <Skeleton className="h-6 w-12" />
            </M>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence mode="wait">
        {name.length ? (
          <M key="a">{name}</M>
        ) : (
          <M key="b">
            <Skeleton className="h-4 w-1/2" />
          </M>
        )}
      </AnimatePresence>
    </div>
  );
}
