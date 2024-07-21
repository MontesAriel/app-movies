import ArrayMovies from "./fetchingMovies/ArrayMovies";
import Movies from "./movies/Movies";
import ReproductorMovie from "./reproductorMovie/ReproductorMovie";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ArrayMovies />
      <ReproductorMovie />
      <Movies />
    </main>
  );
}
