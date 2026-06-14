import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import MovieModal from '../components/MovieModal';
import EditDelete from '../components/EditDelete';
import {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
} from '../api/Movies';

const defaultForm = { title: '', genre: '', status: '', rating: '', notes: '' };

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
	const [filterStatus, setFilter] = useState('');

	useEffect(() => {
		getMovies()
			.then((data) => {
				console.log('movies from db:', data);
				setMovies(data);
			})
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);
	const handleCreate = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const payload = {
				...form,
				rating: form.rating ? Number(form.rating) : undefined,
			};
			const created = await createMovie(payload);
			setMovies((prev) => [...prev, created]);
			setForm(defaultForm);
			setIsOpen(false);
		} catch (err) {
			alert(err.message);
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
			rating: movie.rating,
			notes: movie.notes,
		});
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsUpdating(true);
		try {
			const payload = {
				...editForm,
				rating: editForm.rating ? Number(editForm.rating) : undefined,
			};
			const updated = await updateMovie(editTarget._id, payload);
			setMovies((prev) =>
				prev.map((m) => (m._id === updated._id ? updated : m)),
			);
			setEditTarget(null);
		} catch (err) {
			alert(err.message);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDelete = async (id) => {
		setIsDeleting(true);
		try {
			await deleteMovie(id);
			setMovies((prev) => prev.filter((m) => m._id !== id));
		} catch (err) {
			alert(err.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div className="flex flex-row gap-4 items-center">
					<h2 className="text-2xl font-semibold text-[#FAF9F5]">
						My Watchlist
					</h2>
					<select
						className="mt-1 text-sm bg-transparent text-[#FAF9F5] border-b border-[#FAF9F5]/40 focus:outline-none"
						value={filterStatus}
						onChange={(e) => setFilter(e.target.value)}
					>
						<option
							value=""
							className="text-black"
						>
							All
						</option>
						<option
							value="want to watch"
							className="text-black"
						>
							Want to Watch
						</option>
						<option
							value="watched"
							className="text-black"
						>
							Watched
						</option>
					</select>
				</div>
				<button
					onClick={() => setIsOpen(true)}
					className="px-4 py-2 bg-[#E5D1A3] text-[#480902] text-sm font-medium rounded-lg hover:bg-[#d4bc8a] transition-colors"
				>
					+ Add Movie
				</button>
			</div>

			{isLoading && <p className="text-[#FAF9F5]">Loading...</p>}
			{isError && <p className="text-red-400">Failed to load movies.</p>}

			<div className="grid grid-cols-4 gap-5">
				{movies
					.filter(
						(m) =>
							!filterStatus || m.status?.trim().toLowerCase() === filterStatus,
					)
					.map((movie) => (
						<Link
							key={movie._id}
							to={`/movies/${movie._id}`}
							className="block"
						>
							<div className="bg-[#FAF9F5] rounded-xl p-4 flex justify-between items-start shadow">
								<div className="m-1 display flex flex-col gap-2">
									<h3 className="font-semibold text-[#480902]">
										{movie.title}
									</h3>
									<p className="text-sm text-gray-500 capitalize">
										{movie.genre}
									</p>
									<div>
										<span
											className={`text-xs text-white capitalize rounded-xl p-1 text-wrap ${movie.status === 'want to watch' ? 'bg-[#CE793A]' : 'bg-[#480902]'}`}
										>
											{movie.status}
										</span>
									</div>
								</div>
								<EditDelete
									onEdit={() => openEdit(movie)}
									onDelete={() => handleDelete(movie._id)}
									isDeleting={isDeleting}
								/>
							</div>
						</Link>
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
