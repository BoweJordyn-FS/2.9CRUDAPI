import { authHeader } from '../services/auth-header';

// Always use the deployed API so the app works on a physical device in dev
// (localhost would resolve to the device itself, not the dev machine).
const API_BASE = 'https://watchlist-crudapi-9855cdafdb36.herokuapp.com/api/v1';

export const getMovies = async () => {
	const res = await fetch(`${API_BASE}/movies`, { headers: authHeader() });
	if (!res.ok) throw new Error('Failed to fetch movies');
	return res.json();
};

export const getMovie = async (id) => {
	const res = await fetch(`${API_BASE}/movies/${id}`, {
		headers: authHeader(),
	});
	if (!res.ok) throw new Error('Failed to fetch movie');
	return res.json();
};

export const createMovie = async (movie) => {
	const res = await fetch(`${API_BASE}/movies`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
		body: JSON.stringify(movie),
	});
	if (!res.ok) throw new Error('Failed to create movie');
	return res.json();
};

export const updateMovie = async (id, updates) => {
	const res = await fetch(`${API_BASE}/movies/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
		body: JSON.stringify(updates),
	});
	if (!res.ok) throw new Error('Failed to update movie');
	return res.json();
};

export const deleteMovie = async (id) => {
	const res = await fetch(`${API_BASE}/movies/${id}`, {
		method: 'DELETE',
		headers: authHeader(),
	});
	if (!res.ok) throw new Error('Failed to delete movie');
	return res.json();
};
