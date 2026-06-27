import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Watchlist from './pages/WatchList';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

// Gate protected pages: send unauthenticated visitors to the login screen.
function RequireAuth({ children }) {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Keep authenticated users out of the auth screens.
function RedirectIfAuth({ children }) {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="App bg-[#480902] min-h-screen">
					<Navigation />
					<div className="m-25">
						<Routes>
							<Route
								path="/login"
								element={
									<RedirectIfAuth>
										<Login />
									</RedirectIfAuth>
								}
							/>
							<Route
								path="/signup"
								element={
									<RedirectIfAuth>
										<Signup />
									</RedirectIfAuth>
								}
							/>
							<Route
								path="/"
								element={
									<RequireAuth>
										<Watchlist />
									</RequireAuth>
								}
							/>
							<Route
								path="/movies/:id"
								element={
									<RequireAuth>
										<MovieDetails />
									</RequireAuth>
								}
							/>
						</Routes>
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
