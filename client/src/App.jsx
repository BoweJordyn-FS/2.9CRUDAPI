import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [movies, setMovies] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const API_BASE =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000/api/v1'
			: process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		let ignore = false;
		getMovies();
		return () => {
			ignore = true;
		};
	}, []);

	const getMovies = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${API_BASE}/movies`);
			const data = await res.json();
			console.log({ data });
			setMovies(data);
		} catch (error) {
			setError(error.message || 'Unexpected Error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<h1>Movies</h1>
		</>
	);
}

export default App;
