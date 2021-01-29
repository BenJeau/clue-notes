import { useRef, useEffect, Ref } from 'react';

export const useCombinedRefs = <T>(...refs: Ref<T>[]) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      } else if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref.current as any) = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};
