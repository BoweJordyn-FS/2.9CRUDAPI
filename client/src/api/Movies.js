import { authHeader } from './token';

const API_BASE = import.meta.env.DEV
	? 'http://localhost:3000/api/v1'
	: '/api/v1';

export const getMovies = async () => {
	const res = await fetch(`${API_BASE}/movies`, { headers: authHeader() });
	if (!res.ok) throw new Error('Failed to fetch movies');
	return res.json();
};

export const getMovie = async (id) => {
	const res = await fetch(`${API_BASE}/movies/${id}`, { headers: authHeader() });
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
