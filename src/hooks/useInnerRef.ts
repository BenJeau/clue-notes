import { Ref, useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export const useInnerRef = <T>(ref: Ref<T>) => {
  const innerRef = useRef<T>(null);

  return [useCombinedRefs<T>(ref, innerRef), innerRef];
};
