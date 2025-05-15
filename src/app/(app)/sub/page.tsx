import { SubsList } from '../_components/subs/subs-list';

export default function SubsPage() {
  return (
    <section className="flex flex-col gap-12">
      <header>Your subscriptions</header>
      <SubsList />
    </section>
  );
}
