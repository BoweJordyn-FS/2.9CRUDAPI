import { MdMovieEdit } from 'react-icons/md';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
	const { isAuthenticated, signOut } = useAuth();

	return (
		<header className="flex items-center justify-between px-6 py-4 bg-[#E5D1A3] shadow-sm">
			<div className="flex items-center gap-2">
				<MdMovieEdit className="text-[#480902] text-3xl" />

				<Link to="/">
					<h1 className="text-2xl font-semibold text-[#480902] tracking-tight">
						Watchlist
					</h1>
				</Link>
			</div>
			<div className="flex items-center gap-4">
				<h2 className="text-xl font-semibold text-[#480902] tracking-tight">
					Your Movies, Your List.
				</h2>
				{isAuthenticated && (
					<button
						onClick={signOut}
						className="px-3 py-1.5 rounded-lg border border-[#480902] text-[#480902] text-sm font-medium hover:bg-[#480902]/10 transition-colors"
					>
						Sign Out
					</button>
				)}
			</div>
		</header>
	);
}
