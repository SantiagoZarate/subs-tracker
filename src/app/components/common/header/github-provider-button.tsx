'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '~/lib/auth-client';

export function GithubProviderButton() {
  const handleClick = () => {
    authClient.signIn.social({
      provider: 'github',
    });
  };

  return <Button onClick={handleClick}>Login with Github</Button>;
}
