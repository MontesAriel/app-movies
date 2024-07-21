
'use client'
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSelectedMovieID, setSelectedMovieID } from "@/store/MoviesSlice";
import { useState, useEffect } from "react";
import Youtube from "react-youtube";

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


export default function YoutubeVideo() {
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = '7fc6a5cb22d2fc4a9a535a011831c0a4';
    const dispatch = useAppDispatch();
    const selectedMovieID = useAppSelector(selectSelectedMovieID);

    const [trailer, setTrailer] = useState<null | TrailerI>(null);
    const [showVideo, setShowVideo] = useState<boolean>(false);

   
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
    return(
        <>
        {showVideo && trailer &&
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

                <button onClick={onCloseVideo} className="mt-20 uppercase flex mx-auto text-red-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 hover:text-red-500 dark:border-red-400 dark:hover:bg-gray-900 dark:hover:border-red-500 dark:focus:ring-red-700">Close</button>
            </>
        }
        </>
    )
}