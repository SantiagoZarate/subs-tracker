import * as IconNames from '~/../public/sprite/names';

interface IconProps {
  name: (typeof IconNames)[keyof typeof IconNames];
}

export const SpriteIcon = ({ name }: IconProps) => {
  return (
    <svg style={{ width: 16, height: 16 }}>
      <use href={`/sprite/sprite.svg#${name}`} />
    </svg>
  );
};
