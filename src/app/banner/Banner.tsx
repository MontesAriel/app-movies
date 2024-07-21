'use client'

import { useAppDispatch } from "@/store/hooks";
import { fetchNowPlayingMovies } from "../fetchingMovies/FetchingMovies";
import { useState, useEffect } from "react";
import { setSelectedMovieID } from "@/store/MoviesSlice";

interface Movie {
    id: number;
    poster_path: string;
    title: string;
}

export default function Banner() {
    const [topMovies, setTopMovies] = useState<Movie[]>([]);
    const dispatch = useAppDispatch();
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
    const [ showBanner, setShowBanner ] =useState<boolean>(true)
    const [banner, setBanner] = useState<Movie[]>([]);

    const fetchTopMovies = async () => {
        try {
            const topMovies = await fetchNowPlayingMovies();
            setTopMovies(topMovies);
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
        fetchTopMovies();
    }, []);

    useEffect(() => {
        if (topMovies.length > 0) {
            setBanner(topMovies);
        }
    }, [topMovies]);

    const handleClickMovie = (id: number) => () => {
        dispatch(setSelectedMovieID(id))
        setShowBanner(false)
    };

    return(
        <div className="max-h-[600px] flex">

            {showBanner && banner.length > 0 && 
                banner.map((movie) => 
                    <img
                        onClick={handleClickMovie(movie.id)}
                        src={`${URL_IMAGE + movie.poster_path}`}
                        alt={movie.title}
                        className='max-h-[600px] w-full  rounded cursor-pointer card-img transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:brightness-110'

                        key={movie.id}
                    />
                )    
            }
        </div>
    )
}