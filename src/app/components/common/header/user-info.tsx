'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '~/lib/auth-client';

interface Props {
  name: string;
}
export function UserInfo({ name }: Props) {
  const router = useRouter();

  const handleClick = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push('/');
        },
      },
    });
    toast.success('Logged out succesfully');
  };

  return (
    <section className="flex items-center gap-2">
      <p>{name}</p>
      <Button onClick={handleClick}>Logout</Button>
    </section>
  );
}
