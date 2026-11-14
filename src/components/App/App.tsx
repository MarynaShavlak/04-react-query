import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginateModule from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';

// react-paginate is published as a CommonJS bundle, so with Vite's CJS interop
// the component ends up under the `default` key of the imported module
type ReactPaginateComponent = typeof ReactPaginateModule;

const ReactPaginate =
  (ReactPaginateModule as unknown as { default?: ReactPaginateComponent })
    .default ?? ReactPaginateModule;

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess, isPlaceholderData } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    // keep the previous page only while paginating the same query,
    // so the pagination stays in place and a new search starts from scratch
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey[1] === query ? previousData : undefined,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;
  const isLoadingMovies = isLoading || isPlaceholderData;

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, data]);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoadingMovies && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoadingMovies && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-center" />
    </div>
  );
}
