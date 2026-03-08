/**
 * Input validation utilities.
 */

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidUsername(name: string): boolean {
  return name.length >= 2 && name.length <= 30 && /^[a-zA-Z0-9_]+$/.test(name);
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function isPositiveInt(n: number): boolean {
  return Number.isInteger(n) && n > 0;
}
