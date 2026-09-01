import { useEffect, useRef, useState } from 'react';

export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const threshold = options.threshold ?? 0.15;
  const rootMargin = options.rootMargin ?? '0px';

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return [ref, visible];
};
