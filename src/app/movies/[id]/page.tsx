'use client';

import './movie.css';
import {useParams} from 'next/navigation';
import {StarIcon} from '@heroicons/react/24/outline';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export default function Movie() {
  const params = useParams();

  console.log('params :>> ', params);

  const queryMovie = useQuery<Movie, Error>({
    queryKey: ['movies', params.id],
    queryFn: () => {
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=6fd667caddd2260d05d4c4dc1e8044c4&language=en-US`,
        )
        .then(res => res.data);
    },
  });

  if (queryMovie.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryMovie.error) {
    return <div>{queryMovie.error.message}</div>;
  }

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${queryMovie.data.backdrop_path}`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${queryMovie.data.poster_path}`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{queryMovie.data.original_title}</div>
            <div className="movie__tagline">{queryMovie.data.tagline}</div>
            <div className="movie__rating flex items-center">
              {queryMovie.data.vote_average}{' '}
              <StarIcon className="inline-block h-6 w-6" aria-hidden="true" />
              <span className="movie__voteCount">
                {`(${queryMovie.data.vote_count}) votes`}
              </span>
            </div>
            <div className="movie__runtime">
              {`${queryMovie.data.runtime} mins`}
            </div>
            <div className="movie__releaseDate">
              {`Release date: ${queryMovie.data.release_date}`}
            </div>
            <div className="movie__genres">
              {queryMovie.data.genres.map(genre => (
                <span
                  key={genre.id}
                  id={`${genre.id}`}
                  className="movie__genre">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{queryMovie.data.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
