'use client'

import { fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies, fetchMovies } from '@/app/fetchingMovies/FetchingMovies';
import { useEffect } from 'react';
import { moviesArray } from '@/store/MoviesSlice';
import { useAppDispatch } from '@/store/hooks';

export default function ArrayMovies() {
    const dispatch = useAppDispatch();

    const fetchMovieData = async () => {
        try {
            const allMovies = await fetchMovies();
            const nowPlayingMovies = await fetchNowPlayingMovies();
            const topRatedMovies = await fetchTopRatedMovies();
            const popularMovies = await fetchPopularMovies();

            const combinedMovies = [
                ...allMovies,
                ...nowPlayingMovies,
                ...topRatedMovies,
                ...popularMovies
            ];

            const uniqueMovies = Array.from(
                new Map(combinedMovies.map(movie => [movie.id, movie])).values()
            );

            console.log({ uniqueMovies });
            dispatch(moviesArray(uniqueMovies));
        } catch (error) {
            console.error({ error });
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, []);

    return null; 
}
