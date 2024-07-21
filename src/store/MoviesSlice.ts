import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface MoviesState {
    movies: Movie[];
    selectedMovieID: number | null;
}

const initialState: MoviesState = {
    movies: [],
    selectedMovieID: null,
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        moviesArray: (state, action: PayloadAction<Movie[]>) => {
            console.log('Action payload:', action.payload);
            state.movies = action.payload;
        },
        setSelectedMovieID: (state, action: PayloadAction<number | null>) => {
            state.selectedMovieID = action.payload;
        }
    }
});

export const { moviesArray, setSelectedMovieID } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectSelectedMovieID = (state: RootState) => state.movies.selectedMovieID;

export default moviesSlice.reducer;
