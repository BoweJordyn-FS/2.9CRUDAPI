import { useState, useEffect } from 'react';
import MovieModal from '../components/MovieModal';
import EditDelete from '../components/EditDelete';
import {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
} from '../api/Movies';

const defaultForm = { title: '', genre: '', status: '', notes: '' };

export default function Watchlist() {
	const [movies, setMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState(defaultForm);
	const [editTarget, setEditTarget] = useState(null);
	const [editForm, setEditForm] = useState(defaultForm);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		getMovies()
			.then(setMovies)
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	const handleCreate = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const created = await createMovie(form);
			setMovies((prev) => [...prev, created]);
			setForm(defaultForm);
			setIsOpen(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	const openEdit = (movie) => {
		setEditTarget(movie);
		setEditForm({
			title: movie.title,
			genre: movie.genre,
			status: movie.status,
			notes: movie.notes,
		});
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsUpdating(true);
		try {
			const updated = await updateMovie(editTarget._id, editForm);
			setMovies((prev) =>
				prev.map((m) => (m._id === updated._id ? updated : m)),
			);
			setEditTarget(null);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDelete = async (id) => {
		setIsDeleting(true);
		try {
			await deleteMovie(id);
			setMovies((prev) => prev.filter((m) => m._id !== id));
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold text-[#FAF9F5]">My Watchlist</h2>
				<button
					onClick={() => setIsOpen(true)}
					className="px-4 py-2 bg-[#E5D1A3] text-[#480902] text-sm font-medium rounded-lg hover:bg-[#d4bc8a] transition-colors"
				>
					+ Add Movie
				</button>
			</div>

			{isLoading && <p className="text-[#FAF9F5]">Loading...</p>}
			{isError && <p className="text-red-400">Failed to load movies.</p>}

			<div className="grid grid-3 gap-4">
				{movies.map((movie) => (
					<div
						key={movie._id}
						className="bg-[#FAF9F5] rounded-xl p-4 flex justify-between items-start shadow w-sm"
					>
						<div className="">
							<h3 className="font-semibold text-[#480902]">{movie.title}</h3>
							<p className="text-sm text-gray-500 capitalize">{movie.genre}</p>
							<span className="text-xs text-white capitalize bg-[#CE793A] rounded-xl p-1 px-2">
								{movie.status}
							</span>
						</div>
						<EditDelete
							onEdit={() => openEdit(movie)}
							onDelete={() => handleDelete(movie._id)}
							isDeleting={isDeleting}
						/>
					</div>
				))}
			</div>

			{isOpen && (
				<MovieModal
					form={form}
					setForm={setForm}
					onSubmit={handleCreate}
					isSubmitting={isSubmitting}
					onClose={() => setIsOpen(false)}
				/>
			)}

			{editTarget && (
				<MovieModal
					form={editForm}
					setForm={setEditForm}
					onSubmit={handleUpdate}
					isSubmitting={isUpdating}
					onClose={() => setEditTarget(null)}
					title="Edit Movie"
				/>
			)}
		</div>
	);
}
