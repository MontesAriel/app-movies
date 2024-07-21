
import SearchMovie from '../searchMovie/SearchMovie';
import ViewMovies from './ViewMovies';

export default function Movies() {

    return (
        <section className='container'>
            <SearchMovie />
            <ViewMovies />
        </section>
    );
}
