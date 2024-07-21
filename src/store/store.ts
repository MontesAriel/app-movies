import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './MoviesSlice'
import filterReducer from './FilterSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        movies: moviesReducer,
        filter: filterReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']