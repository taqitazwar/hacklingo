export function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function nonNull<T>(value: T | null | undefined, message = 'Expected non-null value'): T {
  if (!isDefined(value)) throw new Error(message);
  return value;
}
