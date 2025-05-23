import { M } from '@/components/motion/m';
import { Icon } from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { companyColors } from '@/constants/company-colors';
import { differenceInDays } from 'date-fns';
import { AnimatePresence } from 'motion/react';
import { useFormContext } from 'react-hook-form';
import { getEndDate } from '~/lib/get-end-date';
import { formatMoney } from '~/lib/money-formatter';
import { CreateSubFormSchema } from './form-schema';

const hexToRgba = (hex: string, alpha: number) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function SubCard() {
  const form = useFormContext<CreateSubFormSchema>();

  const { service, name, notify, price, duration, startAt, timeInterval } = {
    notify: form.watch('notifyWhenCloseToFinish'),
    timeInterval: form.watch('timeInterval'),
    duration: form.watch('duration'),
    service: form.watch('service'),
    startAt: form.watch('startAt'),
    price: form.watch('price'),
    name: form.watch('name'),
  };

  const finishAt = getEndDate(startAt, duration, timeInterval);
  const daysToFinish = differenceInDays(finishAt, startAt);

  const companyColor = service && companyColors[service];
  const lowerOpacityShadowColor = hexToRgba(companyColor, 0.3); // 30% opacity

  return (
    <div
      style={
        {
          boxShadow: `0 4px 6px -10px var(--company), 0 2px 4px -2px var(--company), 0 30px 40px -10px ${lowerOpacityShadowColor}`,
          '--company': companyColor,
        } as React.CSSProperties
      }
      className="sticky top-[calc(var(--spacing-top)_+_48px)] flex h-fit w-[300px] flex-col gap-4 rounded-xl border p-4"
    >
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
      <AnimatePresence mode="wait">
        {startAt ? (
          <M key="b" className="text-primary/60 text-sm">
            Finish in {daysToFinish} days
          </M>
        ) : (
          <M key="b">
            <Skeleton className="h-4 w-1/2" />
          </M>
        )}
      </AnimatePresence>
    </div>
  );
}
