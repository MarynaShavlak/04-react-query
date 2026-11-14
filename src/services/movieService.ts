import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesParams {
  query: string;
  page: number;
  include_adult: boolean;
  language: string;
}

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<FetchMoviesResponse> => {
  const params: FetchMoviesParams = {
    query,
    page,
    include_adult: false,
    language: 'en-US',
  };

  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  return response.data;
};
