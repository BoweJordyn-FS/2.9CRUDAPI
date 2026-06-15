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

## Deployment

This project is configured for Heroku. The root `Procfile` starts the Express server, which serves the built React client from `client/dist/`.

```bash
npm run build-client   # Build the React app
```
