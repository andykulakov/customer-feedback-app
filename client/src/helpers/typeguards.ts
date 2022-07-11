export interface TypeGuard<T> {
  (value: unknown): value is T;
}

export function isString(candidate: unknown): candidate is string {
  return typeof candidate === 'string';
}

export function isNumber(candidate: unknown): candidate is number {
  return typeof candidate === 'number';
}

export function isBoolean(candidate: unknown): candidate is boolean {
  return typeof candidate === 'boolean';
}

export function isArray(candidate: unknown): candidate is unknown[] {
  return Array.isArray(candidate);
}

export function isObject(
  candidate: unknown
): candidate is { [key: string]: unknown } {
  return typeof candidate === 'object';
}

export function isNotUndefined<T>(candidate: T | undefined): candidate is T {
  return candidate !== undefined;
}

export function isNotNull<T>(candidate: T | undefined): candidate is T {
  return candidate !== null;
}
