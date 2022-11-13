export function isNumber(n: any): n is number {
  return typeof n === 'number';
}

export function noop() {

}

export function typedObjectAssign<T extends {}>(obj: T, props: Partial<T>) {
  Object.assign(obj, props);
}

