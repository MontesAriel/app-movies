'use client'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { selectSelectedMovieID, setSelectedMovieID } from "@/store/MoviesSlice";
import Youtube from "react-youtube";
import { fetchNowPlayingMovies } from "../fetchingMovies/FetchingMovies";
import CarouselSkeleton from "../carouselSkeleton/CarouselSkeleton";

interface TrailerI {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}

interface Movie {
    id: number;
    poster_path: string;
    title: string;
}

export default function ReproductorMovie() {
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = '7fc6a5cb22d2fc4a9a535a011831c0a4';
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

    const [trailer, setTrailer] = useState<null | TrailerI>(null);
    const [topMovies, setTopMovies] = useState<Movie[]>([]);
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [banner, setBanner] = useState<Movie[]>([]);
    const selectedMovieID = useAppSelector(selectSelectedMovieID);

    const dispatch = useAppDispatch();

    const fetchMovie = async (id: number | null) => {
        const { data } = await axios.get(`${API_URL}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        });

        if (data.videos && data.videos.results) {
            setShowVideo(true);
            setTrailer(data.videos.results[0]);
        }
    };

    useEffect(() => {
        if (selectedMovieID) {
            fetchMovie(selectedMovieID);
        }
    }, [selectedMovieID]);

    const onCloseVideo = () => {
        dispatch(setSelectedMovieID(null));
        setShowVideo(false);
    };

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

    const handleClickMovie = (id: number) => () => dispatch(setSelectedMovieID(id));
    return (
        <header className="mt-10">
            {showVideo && trailer ? (
                <>
                    <Youtube
                        videoId={trailer.key}
                        className="container-reproductor w-lvw pb-5"
                        containerClassName={"youtube-container amru"}
                        opts={{
                            width: "100%",
                            height: "100%",
                            playerVars: {
                                autoplay: 1,
                                controls: 0,
                                cc_load_policy: 0,
                                fs: 0,
                                iv_load_policy: 0,
                                modestbranding: 0,
                                rel: 0,
                                showinfo: 0,
                            }
                        }}
                    />
                    <div className="flex mx-auto justify-center">
                        <button onClick={onCloseVideo} className="mt-20 uppercase  text-red-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 hover:text-red-500 dark:border-red-400 dark:hover:bg-gray-900 dark:hover:border-red-500 dark:focus:ring-red-700">Close</button>
                    </div>
                </>
            ) : (
                <div >
                    <h2 className="text-white font-bold uppercase text-lg mb-1">películas en cartelera</h2>
                        <div className="max-h-[600px] flex">
                            {banner.length > 0 ?
                                banner.map((movie) => 
                                    <img
                                        onClick={handleClickMovie(movie.id)}
                                        src={`${URL_IMAGE + movie.poster_path}`}
                                        alt={movie.title}
                                        className='max-h-[600px] w-full  rounded cursor-pointer card-img transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:brightness-110'

                                        key={movie.id}
                                    />
                                )
                                : <CarouselSkeleton />
                            }
                        </div>
                </div>

            )}
        </header>
    );
}
