# Products List

Prosta aplikacja frontendowa zbudowana na Vite, która pobiera i wyświetla listę produktów z API.

## Wymagania

- Node.js >= 18
- npm >= 9

## Instalacja

```bash
npm install
```

## Konfiguracja środowiska

Skopiuj plik `.env.example` i uzupełnij zmienną środowiskową:

```bash
cp .env.example .env
```

Edytuj `.env`:

```env
VITE_API_URL=
```

## Uruchomienie

### Tryb deweloperski

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

### Budowanie do produkcji

```bash
npm run build
```

Pliki wynikowe trafią do katalogu `dist/`.

### Podgląd buildu produkcyjnego

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

Projekt używa ESLint + Prettier z automatycznym formatowaniem przy commitach (Husky + lint-staged).
