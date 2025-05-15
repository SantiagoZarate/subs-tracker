import Link from 'next/link';

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

export function Header() {
  return (
    <header className="fixed top-0 w-full border border-b backdrop-blur-md">
      <div className="max-w-tablet mx-auto flex w-full justify-between py-4">
        <div>
          <Link href="/">Sub Tracker</Link>
        </div>
        <nav className="flex">
          {links.map((link) => (
            <Link className="px-2" key={link.value} href={link.href}>
              {link.value}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
