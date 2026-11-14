import type { Movie } from '../../types/movie';
import placeholder from '../../assets/no-image.svg';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie)}>
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
