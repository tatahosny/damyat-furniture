import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      isRTL: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (isDark) => set({ isDark }),
      setRTL: (isRTL) => set({ isRTL }),
    }),
    {
      name: 'theme-store',
    }
  )
)
