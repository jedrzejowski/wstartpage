import {useMemo} from 'react';

let i = 0;

const I: Partial<Record<string, number>> = {};

export function makeUniqueId(): string;
export function makeUniqueId(prefix: string | undefined): string;
export function makeUniqueId(prefix?: string | undefined): number | string {
  if (prefix) {
    I[prefix] = (I[prefix] ?? (I[prefix] = 0));
    // @ts-ignore
    return prefix + (++I[prefix]);
  }
  return (++i).toString();
}

export function useUniqueId(prefix?: string): string {
  return useMemo(() => makeUniqueId(prefix), [prefix]);
}
