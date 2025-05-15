import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-tablet">
      <Link href="/sub/create">
        <Button>Add a new subscription</Button>
      </Link>
    </section>
  );
}
