import { create } from 'zustand'

export const trendingStore = create((set) => ({
  trending: { movies: null, series: null },
  updateTrending: (newData) => set({ trending: newData }),
  removeTrending: () => set({ trending: 0 }),
}))
