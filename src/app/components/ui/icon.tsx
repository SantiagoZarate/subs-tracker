import { Companies } from '@/(app)/sub/create/constants';

type Props = {
  iconId: Companies;
};

export function Icon({ iconId }: Props) {
  return (
    <svg style={{ width: 24, height: 24 }}>
      <use href={`/companies.svg#${iconId}`} />
    </svg>
  );
}
