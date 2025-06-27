import { log } from "console";

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
    this.#startReapLoop();
  }

  get<T>(key: string) {
    return this.#cache.get(key)?.val;
  }

  #reap() {
    this.#cache.forEach((value, key, map) => {
      if (value.createdAt < Date.now() - this.#interval) {
        log(`Reaping cache entry for key: ${key}`);
        map.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReadLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
