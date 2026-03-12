type Handler = (...args: unknown[]) => void;

class EventEmitter {
  private listeners: Map<string, Handler[]> = new Map();

  on(event: string, handler: Handler): () => void {
    const handlers = this.listeners.get(event) ?? [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
    return () => this.off(event, handler);
  }

  off(event: string, handler: Handler): void {
    const handlers = this.listeners.get(event) ?? [];
    this.listeners.set(event, handlers.filter(h => h !== handler));
  }

  emit(event: string, ...args: unknown[]): void {
    const handlers = this.listeners.get(event) ?? [];
    handlers.forEach(h => h(...args));
  }

  once(event: string, handler: Handler): void {
    const wrapper: Handler = (...args) => {
      handler(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  removeAllListeners(event?: string): void {
    if (event) this.listeners.delete(event);
    else this.listeners.clear();
  }
}

export const appEvents = new EventEmitter();
export default EventEmitter;
