declare module "events" {
  type EventMap = Record<string | symbol, any[]>;
  type EventKey<T extends EventMap> = keyof T & (string | symbol);
  type EventListener<T extends EventMap, K extends EventKey<T>> = (...args: T[K]) => void;

  export class EventEmitter<T extends EventMap = EventMap> {
    addListener<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this;
    on<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this;
    once<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this;
    off<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this;
    removeListener<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this;
    removeAllListeners<K extends EventKey<T>>(eventName?: K): this;
    emit<K extends EventKey<T>>(eventName: K, ...args: T[K]): boolean;
    listenerCount<K extends EventKey<T>>(eventName: K): number;
  }

  export default EventEmitter;
}
