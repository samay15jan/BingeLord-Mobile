import { create } from 'zustand'

export const trendingStore = create((set) => ({
  trending: { movies: null, series: null },
  updateTrending: (newData) => set({ trending: newData }),
}))

export const contentStore = create((set) => ({
  content: { movies: null, series: null },
  updateContent: (newData) => set({ content: newData }),
}))

export const genreStore = create((set) => ({
  genre: { movies: null, series: null },
  updateGenre: (newGenreData) =>
    set((state) => ({
      genre: {
        ...state.genre,
        [newGenreData.type]: [
          ...(state.genre[newGenreData.type] || []),
          newGenreData.data,
        ],
      },
    })),
}))
