import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { MdOutlineLocalMovies } from 'react-icons/md';
import MovieModal from '../components/MovieModal';
import EditDelete from '../components/EditDelete';
import { getMovie, updateMovie, deleteMovie } from '../api/Movies';

const defaultForm = { title: '', genre: '', status: '', rating: '', notes: '' };

export default function MovieDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [movie, setMovie] = useState(null);
	const [editTarget, setEditTarget] = useState(null);
	const [editForm, setEditForm] = useState(defaultForm);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	useEffect(() => {
		getMovie(id)
			.then(setMovie)
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, [id]);

	const openEdit = () => {
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
			const updated = await updateMovie(movie._id, payload);
			setMovie(updated);
			setEditTarget(null);
		} catch (err) {
			alert(err.message);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await deleteMovie(movie._id);
			setIsDeleted(true);
		} catch (err) {
			alert(err.message);
		} finally {
			setIsDeleting(false);
		}
	};

	if (isLoading) return <p className="text-[#FAF9F5] p-6">Loading...</p>;
	if (isDeleted)
		return (
			<div className="p-6 flex flex-col gap-4">
				<p className="text-[#FAF9F5] text-lg">Movie deleted.</p>
				<Link
					to="/"
					className="w-fit border rounded-lg p-2 bg-[#f2f0e9] text-sm"
				>
					← Back to Watchlist
				</Link>
			</div>
		);
	if (isError || !movie)
		return <p className="text-red-400 p-6">Movie not found.</p>;

	return (
		<div className="p-6">
			<div className="flex flex-row items-center gap-2 mb-4">
				<Link
					to="/"
					className="border rounded-lg m-1 p-2 bg-[#f2f0e9] hover:bg-[#e0ddd5] cursor-pointer"
				>
					← Back
				</Link>
				<p className="text-white">Movie Details</p>
			</div>

			<div className="flex flex-col gap-5 m-10">
				<section className="bg-[#FAF9F6] flex items-center gap-4 p-4 mt-4 rounded-lg">
					<div className="bg-[#f2f0e9] w-20 h-24 shrink-0 flex items-center justify-center rounded-md border border-stone-300">
						<MdOutlineLocalMovies size={40} />
					</div>
					<div className="flex flex-col gap-1 flex-1">
						<h1 className="text-xl font-semibold text-[#480902]">
							{movie.title}
						</h1>
						<p className="text-sm text-gray-500 capitalize">{movie.genre}</p>
						<span
							className={`text-xs text-white capitalize rounded-xl p-1 px-2 w-fit ${movie.status === 'want to watch' ? 'bg-[#CE793A]' : 'bg-[#480902]'}`}
						>
							{movie.status}
						</span>
					</div>
					<div className="self-start">
						<EditDelete
							onEdit={openEdit}
							onDelete={handleDelete}
							isDeleting={isDeleting}
						/>
					</div>
				</section>

				<section className="bg-[#FAF9F6] rounded-lg p-5 ">
					<h2 className="text-lg font-semibold text-[#480902] mb-3">Details</h2>
					<div className="flex flex-col divide-y divide-stone-200 bg-[#f2f0e9] p-2 rounded-md">
						<div className="flex items-center py-3 px-2">
							<span className="text-sm text-stone-500 w-24 shrink-0">
								Status
							</span>
							<span
								className={`text-xs text-white capitalize rounded-xl py-1 px-2 ${movie.status === 'want to watch' ? 'bg-[#CE793A]' : 'bg-[#480902]'}`}
							>
								{movie.status}
							</span>
						</div>
						<div className="flex items-center py-3 px-2">
							<span className="text-sm  text-stone-500 w-24 shrink-0">
								Rating
							</span>
							<span className="text-sm font-medium text-[#480902]">
								{movie.rating ? `${movie.rating} / 5` : '—'}
							</span>
						</div>
						<div className="flex items-center py-3 px-2">
							<span className="text-sm  text-stone-500 w-24 shrink-0">
								Genre
							</span>
							<span className="text-sm capitalize">{movie.genre || '—'}</span>
						</div>
						<div className="flex items-start py-3 px-2">
							<span className="text-sm  text-stone-500 w-24 shrink-0">
								Notes
							</span>
							<span className="text-sm text-gray-600">
								{movie.notes || '—'}
							</span>
						</div>
					</div>
				</section>
			</div>

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
