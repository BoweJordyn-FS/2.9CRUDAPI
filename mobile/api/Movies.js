const API_BASE = __DEV__
	? 'http://localhost:3000/api/v1'
	: 'https://watchlist-crudapi-9855cdafdb36.herokuapp.com/api/v1';

export const getMovies = async () => {
	const res = await fetch(`${API_BASE}/movies`);
	if (!res.ok) throw new Error('Failed to fetch movies');
	return res.json();
};

export const getMovie = async (id) => {
	const res = await fetch(`${API_BASE}/movies/${id}`);
	if (!res.ok) throw new Error('Failed to fetch movie');
	return res.json();
};

export const createMovie = async (movie) => {
	const res = await fetch(`${API_BASE}/movies`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(movie),
	});
	if (!res.ok) throw new Error('Failed to create movie');
	return res.json();
};

export const updateMovie = async (id, updates) => {
	const res = await fetch(`${API_BASE}/movies/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updates),
	});
	if (!res.ok) throw new Error('Failed to update movie');
	return res.json();
};

export const deleteMovie = async (id) => {
	const res = await fetch(`${API_BASE}/movies/${id}`, {
		method: 'DELETE',
	});
	if (!res.ok) throw new Error('Failed to delete movie');
	return res.json();
};
