export function throwExpression(errorMessage: string, Constructor: { new(text: string): Error } = Error): never {
  throw new Constructor(errorMessage);
}
