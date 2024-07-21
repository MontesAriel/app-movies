'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Movie, selectMovies, setSelectedMovieID } from '@/store/MoviesSlice';
import { useEffect, useState } from 'react';
import CarouselSkeleton from '../carouselSkeleton/CarouselSkeleton';
import { selectFilterCartelera, selectFilterPopular, selectFilterSearch, selectFilterValoradas } from '@/store/FilterSlice';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies } from "../fetchingMovies/FetchingMovies";


export default function ViewMovies() {
    const dispatch = useAppDispatch();
    const movies = useAppSelector(selectMovies);
    const selectedMovieName = useAppSelector(selectFilterSearch);
    const selectedFilterBillboard = useAppSelector(selectFilterCartelera);
    const selectedFilterValued = useAppSelector(selectFilterValoradas);
    const selectedFilterPopular = useAppSelector(selectFilterPopular);
    const [ topRatedState, setTopRateState ] = useState<Movie[]>([]);
    const [ popularState, setPopularState ] = useState<Movie[]>([]);
    const [ billboardState, setBillboardState ] = useState<Movie[]>([]);

    const moviesCategoriesFilter = async() => {
        const topRatedMovies = await fetchTopRatedMovies();
        const popularMovies = await fetchPopularMovies();
        const billboardMovies = await fetchNowPlayingMovies()

        setTopRateState(topRatedMovies)
        setPopularState(popularMovies)
        setBillboardState(billboardMovies)
    }

    const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

    const moviesPath = movies.filter((movie) => movie.poster_path !== null);

    const handleClickMovie = (id: number) => () => dispatch(setSelectedMovieID(id));

    const moviesFilter = movies.filter((movie) => {
        if (selectedMovieName && movie.poster_path !== null) {
            return movie.title.toUpperCase().includes(selectedMovieName.toUpperCase());        
        }
        if (selectedFilterValued && topRatedState.find(topRatedMovie => topRatedMovie.id === movie.id)) {
        return true;
        }
        if (selectedFilterPopular && popularState.find(popularMovie => popularMovie.id === movie.id)) {
            return true;
        }
        if (selectedFilterBillboard && billboardState.find(billboardMovie => billboardMovie.id === movie.id)) {
            return true;
        }
        return false;
    });

    useEffect(() => {
        moviesCategoriesFilter()
    }, [selectedFilterValued, selectedFilterPopular, selectedFilterBillboard])


    return (
        <>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 md:gap-4 gap-2'>
            {selectedMovieName === null && !selectedFilterPopular && !selectedFilterValued && !selectedFilterBillboard && moviesPath.length > 0 ? (
                <>
                    {moviesPath.map((movie) => (
                        <div key={movie.id} onClick={handleClickMovie(movie.id)}>
                            <img
                                src={`${URL_IMAGE + movie.poster_path}`}
                                alt={movie.title}
                                className='rounded cursor-pointer card-img transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:brightness-110'
                            />
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {moviesFilter.map((movie) => (
                        <div key={movie.id} onClick={handleClickMovie(movie.id)}>
                            <img
                                src={`${URL_IMAGE + movie.poster_path}`}
                                alt={movie.title}
                                className='rounded cursor-pointer card-img transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:brightness-110'
                            />
                        </div>
                    ))}
                </>
            )}
            {selectedMovieName === null && moviesPath.length === 0 && <CarouselSkeleton />}

        </div>
        </>
    );
}
