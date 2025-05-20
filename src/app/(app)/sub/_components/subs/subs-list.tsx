import { Icon } from '@/components/ui/icon';
import { differenceInDays } from 'date-fns';
import { formatMoney } from '~/lib/money-formatter';
import { subsService } from '~/services/subs.service';

export async function SubsList() {
  await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

  const subs = await subsService.getAllMySubs();

  if (!subs.length) {
    return <div>There are no subs yet!</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {subs.map((sub) => (
        <li
          key={sub.id}
          className="flex items-center justify-between gap-2 rounded-xl border p-4"
        >
          <section className="flex items-start gap-4">
            <Icon iconId={sub.company.name} />
            <div className="flex flex-col gap-2">
              <p className="text-primary/60 text-xs">{sub.company.name}</p>
              <p>{sub.name}</p>
              <p>
                Finishes in {differenceInDays(sub.finishAt, new Date())} days
              </p>
            </div>
          </section>
          <p>{formatMoney(sub.price)}</p>
        </li>
      ))}
    </ul>
  );
}
