interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class SimpleCache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private ttl: number;

  constructor(ttlMs: number = 60_000) {
    this.ttl = ttlMs;
  }

  set(key: string, value: T): void {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttl });
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  invalidate(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

export default SimpleCache;
export { SimpleCache };
