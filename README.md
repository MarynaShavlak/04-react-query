# 04-react-query

Застосунок для пошуку фільмів за ключовим словом, який працює з API сервісу
[TMDB](https://www.themoviedb.org/). Користувач вводить запит, отримує галерею
постерів і може відкрити модальне вікно з детальною інформацією про фільм:
backdrop-зображенням, описом, датою релізу та рейтингом.

## Стек

- React + TypeScript
- Vite
- Axios
- React Hot Toast
- CSS Modules
- modern-normalize
- Prettier

## Структура

```
src/
├── components/
│   ├── App/
│   ├── ErrorMessage/
│   ├── Loader/
│   ├── MovieGrid/
│   ├── MovieModal/
│   └── SearchBar/
├── services/
│   └── movieService.ts
├── types/
│   └── movie.ts
└── main.tsx
```

## Змінні оточення

Для запитів до TMDB потрібен API Read Access Token. Створіть у корені проєкту
файл `.env` (за зразком `.env.example`):

```
VITE_TMDB_TOKEN=your_tmdb_api_read_access_token
```

## Запуск

```bash
npm install
npm run dev
```

## Скрипти

- `npm run dev` — dev-сервер
- `npm run build` — перевірка типів і production-збірка
- `npm run preview` — перегляд збірки
- `npm run lint` — лінтинг
- `npm run format` — форматування коду через Prettier
