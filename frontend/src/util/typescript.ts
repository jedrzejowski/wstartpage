export function isNumber(n: any): n is number {
  return typeof n === 'number';
}

export function noop() {

}

export function typedObjectAssign<T extends {}>(obj: T, props: Partial<T>) {
  Object.assign(obj, props);
}

type ObjectKeys<T> =
  T extends object ? (keyof T)[] :
    T extends number ? [] :
      T extends Array<any> | string ? string[] :
        never;

declare global {
  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
  }
}
