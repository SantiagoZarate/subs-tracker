import { Companies } from '@/(app)/sub/create/constants';
import { ComponentProps } from 'react';

type Props = {
  iconId: Companies;
} & ComponentProps<'svg'>;

export function Icon({ iconId, ...props }: Props) {
  return (
    <svg {...props} style={{ width: 24, height: 24 }}>
      <use href={`/companies.svg#${iconId}`} />
    </svg>
  );
}
