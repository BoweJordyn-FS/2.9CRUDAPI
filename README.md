# Watchlist

A full-stack CRUD application for tracking movies you want to watch or have already watched. Built with React, Express, and MongoDB.

## Features

- Add movies with title, genre, status, rating, and notes
- Filter your watchlist by status
- View full movie details on a dedicated page
- Edit or delete any movie

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router v7  
**Backend:** Node.js, Express 5, Mongoose  
**Database:** MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account with a cluster set up

### Installation

1. Clone the repo and install dependencies:

```bash
npm install
npm run install-client
npm run install-server
```

2. Create a `.env` file inside the `server/` directory:

```
DATABASE_URL=your_mongodb_connection_string
PORT=3000
```

3. Start the development server:

```bash
npm run dev
```

This runs the Express server and Vite client concurrently. The client will be available at `http://localhost:5173` and the API at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/v1/movies`     | Get all movies    |
| POST   | `/api/v1/movies`     | Create a movie    |
| GET    | `/api/v1/movies/:id` | Get a movie by ID |
| PATCH  | `/api/v1/movies/:id` | Update a movie    |
| DELETE | `/api/v1/movies/:id` | Delete a movie    |

### Movie Schema

```json
{
	"title": "string (required)",
	"genre": "string (required)",
	"status": "want to watch | watched (required)",
	"rating": "number 1–5 (optional)",
	"notes": "string (optional)"
}
```

---

## Mobile App

A parallel Expo/React Native app lives in `mobile/`, styled to match the web client and backed by the same API.

### Features

- Login and Sign Up screens, backed by JWT authentication
- Browse, filter (by status), and search your watchlist
- View full movie details on a dedicated screen
- Add, edit, or delete movies (with a delete confirmation prompt)
- Star rating display
- Sign out from the watchlist header

### Tech Stack

Expo SDK 56, React Native 0.85, React 19, React Navigation (native-stack), `react-native-tab-view`, `@expo/vector-icons`, `iconoir-react-native`, Axios.

### Structure

```
mobile/
├── api/            # Auth.js (login/signup), Movies.js (CRUD), token.js (in-memory JWT holder)
├── components/      # Screen, AuthScreen, MovieModal, Heading
├── constants/        # Shared movie status constants/helpers
├── context/          # AuthContext — holds the current user/JWT in memory
└── pages/             # Home, Details, Login, Signup
```

The mobile app always talks to the deployed Heroku API (see `api/Auth.js`/`api/Movies.js`), so it works without running the server locally. Authentication is in-memory only via `AuthContext` — there's no persisted session, so the app always starts at the Login screen.

### Running the Mobile App

```bash
cd mobile
npm install
npm start
```

## Deployment

This project is configured for Heroku. The root `Procfile` starts the Express server, which serves the built React client from `client/dist/`. The Heroku build (`heroku-postbuild`) only installs/builds `client/` and `server/` — the `mobile/` app is not part of this deployment and is run separately via Expo.

[Mobile App Deployment]('https://bowejordyn39reactnative.expo.app')

```bash
npm run build-client
```

#### _Claude Code use for Debugging_

Paste a symptom, have it investigate the _running system_ (logs, the deployed bundle, `node_modules`, the live API) rather than just reading code, find the root cause, and apply a fix.

- **Heroku build failed — `Could not resolve '@vitejs/plugin-react'`.** Traced to
  `vite`/`@vitejs/plugin-react` living in `devDependencies`, which Heroku skips
  (`NODE_ENV=production`). Fix: moved them to `dependencies`.

- **Watchlist filter showed no "watched" movies.** Querying the live API revealed
  data stored as `"Watched"` while the filter compared `"watched"`, a mismatch
  hidden by the `capitalize` CSS. Fix: case-insensitive comparison.

- **Deployed web app: "Failed to load movies".** Inspecting the deployed JS bundle
  showed the API base compiled to `undefined` because `VITE_BASE_URL` was never set
  at build time. Fix: use a relative `/api/v1` path.

- **Sign up / login failing.** `curl`ing the Heroku auth routes returned `404`,
  proving the server hadn't been redeployed yet — a deployment problem, not a code
  problem.

- **Expo crash** — `Cannot find native module 'ExpoAsset'` / "main has not been
  registered". `expo-asset`/`expo-constants` were physically missing from
  `node_modules` despite `npm ls` listing them. Fix: clean reinstall.

- **Mobile "Failed to load movies" after a successful login.** Since login worked,
  the server was up, the issue was `api/Movies.js` importing `authHeader` from a
  broken `services/auth-header.js` (wrong export, a `localStorage` typo) instead of
  the real `./token` store, so requests carried no token (401). Fix: corrected the
  import; verified the live API then returned 200.

- **User–movie relationship not enforced.** Spotted dead `Movie.findOne(...)` lines
  that assigned to an unused variable while the handlers actually used `res.movie`
  from an unscoped middleware. Fix: moved the `user` filter into the `getMovie`
  middleware; confirmed with a two-user test that each user sees only their own data.
