type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  tagline: string;
  genres: Genre[];
  runtime: number;
};
