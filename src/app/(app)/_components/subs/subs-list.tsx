import { subsService } from '~/services/subs.service';

export async function SubsList() {
  const subs = await subsService.getAll();

  if (!subs.length) {
    return <div>There are no subs yet!</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {subs.map((sub) => (
        <li key={sub.id}>{sub.name}</li>
      ))}
    </ul>
  );
}
