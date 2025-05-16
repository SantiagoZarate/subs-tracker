import { Suspense } from 'react';
import { SubsList } from './_components/subs/subs-list';
import { SubsSkeleton } from './_components/subs/subs-skeleton';

export default function SubsPage() {
  return (
    <section className="flex flex-col gap-12">
      <header className="flex flex-col">
        <h1>Your subscriptions</h1>
        <p className="text-muted">Visualize the state of each one</p>
      </header>
      <Suspense fallback={<SubsSkeleton />}>
        <SubsList />
      </Suspense>
    </section>
  );
}
