import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '7fc6a5cb22d2fc4a9a535a011831c0a4';


export const fetchPopularMovies = async () => {
    const { data } = await axios.get(`${API_URL}movie/popular`, {
        params: {
            api_key: API_KEY,
        }
    });

    // lista de películas populares
    return data.results;
}

export const fetchTopRatedMovies = async () => {
    const { data } = await axios.get(`${API_URL}movie/top_rated`, {
        params: {
            api_key: API_KEY,
        }
    });

    // lista de películas mejor valoradas
    return data.results;
}

export const fetchNowPlayingMovies = async () => {
    
    const { data } = await axios.get(`${API_URL}movie/now_playing`, {
        params: {
            api_key: API_KEY,
        }
    });

    // lista de películas en cartelera
    return data.results.slice(0, 5);
}


export const fetchMovies = async () => {
    const { data } = await axios.get(`${API_URL}search/movie`, {
        params: {
            api_key: API_KEY,
            query: 'search'
        }
    });

    return data.results;
}   


