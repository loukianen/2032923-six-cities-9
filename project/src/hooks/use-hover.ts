import {RefObject, useRef, useState, useEffect} from 'react';

type UseHoverType<T extends HTMLElement> = [RefObject<T>, boolean];

function useHover<T extends HTMLElement>(initElement: T | null = null): UseHoverType<T> {
  const [value, setValue] = useState<boolean>(false);

  const ref = useRef<T>(initElement);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          node.removeEventListener('mouseenter', handleMouseEnter);
          node.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    },
  );

  return [ref, value];
}

export default useHover;
