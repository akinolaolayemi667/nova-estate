/**
 * Tiny external store for saved properties, persisted to localStorage.
 * Consumed through `useFavorites` via `useSyncExternalStore`, so every
 * component shares one source of truth without a context provider.
 */
const STORAGE_KEY = 'nova-estates:favorites';
const EMPTY: readonly string[] = Object.freeze([]);

type Listener = () => void;

const listeners = new Set<Listener>();
let snapshot: readonly string[] | null = null;

function read(): readonly string[] {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: readonly string[]) {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode, quota) — keep in-memory state.
  }
  listeners.forEach((listener) => listener());
}

function handleStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  snapshot = read();
  listeners.forEach((listener) => listener());
}

export const favoritesStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    if (listeners.size === 1) window.addEventListener('storage', handleStorage);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) window.removeEventListener('storage', handleStorage);
    };
  },
  getSnapshot(): readonly string[] {
    snapshot ??= read();
    return snapshot;
  },
  getServerSnapshot(): readonly string[] {
    return EMPTY;
  },
  toggle(id: string) {
    const current = favoritesStore.getSnapshot();
    write(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  },
  remove(id: string) {
    write(favoritesStore.getSnapshot().filter((item) => item !== id));
  },
  clear() {
    write(EMPTY);
  },
};
