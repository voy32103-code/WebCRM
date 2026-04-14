import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function BlurText({
  text,
  className,
  delay = 200,
  stepDuration = 0.35,
  once = true,
  splitBy = 'word'
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-20% 0px' });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {items.map((item, index) => (
        <span key={index} className="inline-block whitespace-pre">
          <motion.span
            className="inline-block"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { filter: 'blur(10px)', opacity: 0, y: 50 },
              visible: { 
                filter: 'blur(0px)', 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: stepDuration,
                  delay: index * (delay / 1000),
                  ease: 'easeOut'
                }
              }
            }}
          >
            {item}
          </motion.span>
          {splitBy === 'word' && index < items.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}
