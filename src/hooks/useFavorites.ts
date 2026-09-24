import { useCallback, useSyncExternalStore } from 'react';
import { favoritesStore } from '@/lib/favoritesStore';

export function useFavorites() {
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot,
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return {
    favorites,
    count: favorites.length,
    isFavorite,
    toggleFavorite: favoritesStore.toggle,
    removeFavorite: favoritesStore.remove,
    clearFavorites: favoritesStore.clear,
  };
}
