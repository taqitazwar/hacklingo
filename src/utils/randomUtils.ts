export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

export function randomElement<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)];
}

export function randomColor(): string {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

export function randomId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
