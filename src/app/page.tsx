'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
import {Tab} from '@headlessui/react';
import {Carousel} from 'react-responsive-carousel';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import MovieList from '@/components/MovieList';

export default function Home() {
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
    <div>
      <div>
        {queryMovies.isLoading ? (
          'Loading...'
        ) : queryMovies.error ? (
          queryMovies.error.message
        ) : (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}>
            {queryMovies.data.map(movie => (
              <div
                key={movie.id}
                style={{textDecoration: 'none', color: 'white'}}>
                <div className="h-[600px]">
                  <img
                    className="mx-auto block w-full"
                    src={`https://image.tmdb.org/t/p/original${
                      movie && movie.backdrop_path
                    }`}
                  />
                </div>
                <div
                  className="absolute bottom-0 p-20 h-3/4 flex flex-col w-full justify-end items-start hover:opacity-100"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgb(0,0,0,0), rgb(0,0,0,1))',
                    opacity: 1,
                    transition: 'opacity .3s',
                  }}>
                  <div className="font-bold text-7xl mb-2 text-left">
                    {movie.original_title}
                  </div>
                  <div className="text-4xl mb-4">
                    {movie.release_date}
                    <span className="ml-12">
                      {movie.vote_average}
                      <i className="fas fa-star" />{' '}
                    </span>
                  </div>
                  <div className="italic text-base mb-1 flex text-left w-1/2">
                    {movie.overview}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <Tab.Group>
          <Tab.List>
            <Tab>Now Showing</Tab>
            <Tab>Coming Soon</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <MovieList />
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
