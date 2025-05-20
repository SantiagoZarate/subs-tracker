import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '~/lib/auth';
import { GithubProviderButton } from './github-provider-button';
import { UserInfo } from './user-info';

type Link = {
  href: string;
  value: string;
};

const links: Link[] = [
  {
    href: '/',
    value: 'About',
  },
  {
    href: '/',
    value: 'Pricing',
  },
];

export async function Header() {
  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="fixed top-0 w-full border border-b backdrop-blur-md">
      <div className="max-w-tablet mx-auto flex w-full justify-between py-4">
        <div>
          <Link href="/">Sub Tracker</Link>
        </div>
        <section className="flex items-center gap-8">
          <nav className="flex">
            {links.map((link) => (
              <Link className="px-2" key={link.value} href={link.href}>
                {link.value}
              </Link>
            ))}
          </nav>
          {currentSession?.user ? (
            <UserInfo name={currentSession.user.name} />
          ) : (
            <GithubProviderButton />
          )}
        </section>
      </div>
    </header>
  );
}
