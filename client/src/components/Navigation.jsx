import { MdMovieEdit } from 'react-icons/md';
import { Link } from 'react-router';

export default function Navigation() {
	return (
		<nav className="flex items-center justify-between px-6 py-4 bg-[#E5D1A3] shadow-sm">
			<div className="flex items-center gap-2">
				<MdMovieEdit className="text-[#480902] text-3xl" />
				<Link to="/">
					<h1 className="text-2xl font-semibold text-[#480902] tracking-tight">
						Watchlist
					</h1>
				</Link>
			</div>
		</nav>
	);
}
