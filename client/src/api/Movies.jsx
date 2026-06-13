import React, { useState, useEffect } from 'react';

export default function Movies() {
	const [movies, setMovies] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const API_BASE =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000/api/v1'
			: process.env.REACT_APP_BASE_URL;

	let ignore = false;
	useEffect(() => {
		if (!ignore) {
			getMovies();
		}
		return () => {
			ignore = true;
		};
	}, []);
	const getMovies = async () => {
		setLoading(true);
		try {
			await fetch(`${API_BASE}/movies`)
				.then((res) => res.json())
				.then((data) => {
					console.log({ data });
					setMovies(data);
				});
		} catch (error) {
			setError(error.message || 'Unexpected Error');
		} finally {
			setLoading(false);
		}
	};
	return <div></div>;
}
