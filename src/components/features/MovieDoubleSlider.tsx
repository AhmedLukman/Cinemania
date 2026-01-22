import { TmdbApiMovieEndpoints } from "@/lib/constants";
import { cachedFetchMedia } from "@/lib/serverService";

const MovieDoubleSlider = async () => {
  let popularMovies: any;
  try {
    const { results } = await cachedFetchMedia(TmdbApiMovieEndpoints.Popular);
    popularMovies = results || [];
  } catch {
    return (
      <section className="h-screen flex items-center 2xl:text-lg justify-center">
        <p className="text-red-500">⚠️ Error fetching popular movies ⚠️</p>
      </section>
    );
  }

  if (popularMovies.length === 0) {
    return (
      <section className="h-screen flex items-center 2xl:text-lg justify-center">
        <p className="text-gray-500">No popular movies found. 😢</p>
      </section>
    );
  }

  return (
    <div>
      {popularMovies.map((movie: any) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default MovieDoubleSlider;
