import {RefObject, useRef} from 'react';

export function useRefOrMyRef<T>(ref: RefObject<T> | undefined) {
  const innerRef = useRef<T>(null);

  return ref ?? innerRef;
}
