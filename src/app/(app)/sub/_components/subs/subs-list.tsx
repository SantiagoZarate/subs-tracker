import { Icon } from '@/components/ui/icon';
import { subsService } from '~/services/subs.service';

export async function SubsList() {
  await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

  const subs = await subsService.getAll();

  if (!subs.length) {
    return <div>There are no subs yet!</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {subs.map((sub) => (
        <li key={sub.id} className="flex gap-2">
          <Icon iconId={sub.company.name} />
          <p>{sub.name}</p>
        </li>
      ))}
    </ul>
  );
}
