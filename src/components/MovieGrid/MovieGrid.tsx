import type { KeyboardEvent } from 'react';
import type { Movie } from '../../types/movie';
import placeholder from '../../assets/no-image.svg';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    movie: Movie,
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(movie);
    }
  };

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            aria-label={movie.title}
            onClick={() => onSelect(movie)}
            onKeyDown={(event) => handleCardKeyDown(event, movie)}
          >
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `${POSTER_BASE_URL}${movie.poster_path}`
                  : placeholder
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
