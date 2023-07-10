import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function MovieList() {
  const queryMovies = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: () => {
      return axios
        .get(
          'https://api.themoviedb.org/3/movie/popular?api_key=6fd667caddd2260d05d4c4dc1e8044c4',
        )
        .then(res => res.data.results);
    },
  });

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {queryMovies.isLoading
            ? 'Loading...'
            : queryMovies.error
            ? queryMovies.error.message
            : queryMovies.data.map(movie => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>
                    <img
                      className="aspect-[14/13] w-full rounded object-cover"
                      src={`https://image.tmdb.org/t/p/original${
                        movie && movie.backdrop_path
                      }`}
                      alt=""
                    />
                  </Link>
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                    {movie.release_date}
                  </h3>
                  <p className="text-base leading-7 text-gray-300">
                    {movie.original_title}
                  </p>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
