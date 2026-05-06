import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) => set((state) => {
        const exists = state.favorites.find(f => f.id === product.id)
        if (exists) return state
        return { favorites: [...state.favorites, product] }
      }),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(f => f.id !== id)
      })),
      isFavorite: (id) => {
        const state = get()
        return state.favorites.some(f => f.id === id)
      },
      toggleFavorite: (product) => set((state) => {
        const exists = state.favorites.find(f => f.id === product.id)
        if (exists) {
          return { favorites: state.favorites.filter(f => f.id !== product.id) }
        }
        return { favorites: [...state.favorites, product] }
      }),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-store',
    }
  )
)
