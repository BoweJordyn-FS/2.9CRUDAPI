import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Navigation from './components/Navigation';
import Watchlist from './pages/WatchList';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
	return (
		<Router>
			<div className="App bg-[#480902] min-h-screen">
				<Navigation />
				<div className="m-25">
					<Routes>
						<Route
							path="/"
							element={<Watchlist />}
						/>
						<Route
							path="/movies/:id"
							element={<MovieDetails />}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
