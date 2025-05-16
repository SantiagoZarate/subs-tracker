import { HTMLMotionProps, Variants, motion } from 'motion/react';

const customVariants = ['fadeInOut', 'upDown'] as const;

type CustomVariants = (typeof customVariants)[number];

const variants: Record<CustomVariants, Variants> = {
  fadeInOut: {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(10px)',
    },
  },
  upDown: {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
  },
};

type Props = HTMLMotionProps<'div'> & {
  variant?: CustomVariants;
};

export function M({ variant = 'fadeInOut', ...args }: Props) {
  return (
    <motion.div
      {...args}
      variants={variants[variant]}
      animate="visible"
      exit="hidden"
      initial="hidden"
    />
  );
}
