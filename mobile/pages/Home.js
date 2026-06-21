import { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import MovieModal from '../components/MovieModal';
import { EditPencil, TrashSolid } from 'iconoir-react-native';
import {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
} from '../api/Movies';
import {
	DEFAULT_FORM,
	normalizeStatus,
	statusBadgeColor,
} from '../constants/movie';

export default function Home() {
	const navigation = useNavigation();
	const [movies, setMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState(DEFAULT_FORM);
	const [editTarget, setEditTarget] = useState(null);
	const [editForm, setEditForm] = useState(DEFAULT_FORM);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [filterStatus, setFilter] = useState('');

	useEffect(() => {
		getMovies()
			.then(setMovies)
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	const handleCreate = async () => {
		setIsSubmitting(true);
		try {
			const payload = {
				...form,
				rating: form.rating ? Number(form.rating) : undefined,
			};
			const created = await createMovie(payload);
			setMovies((prev) => [...prev, created]);
			setForm(DEFAULT_FORM);
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

	const handleUpdate = async () => {
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
		<Screen style={styles.screen}>
			<View style={styles.topRow}>
				<Text style={styles.bodyTitle}>My Watchlist</Text>
				<Pressable
					style={styles.openButton}
					onPress={() => setIsOpen(true)}
				>
					<Text style={styles.openButtonText}>+ Add Movie</Text>
				</Pressable>
			</View>

			{isOpen && (
				<MovieModal
					form={form}
					setForm={setForm}
					onSubmit={handleCreate}
					isSubmitting={isSubmitting}
					onClose={() => {
						setIsOpen(false);
						setForm(DEFAULT_FORM);
					}}
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

			<ScrollView
				style={styles.movieContainer}
				contentContainerStyle={styles.movieContent}
			>
				{movies
					.filter(
						(m) => !filterStatus || normalizeStatus(m.status) === filterStatus,
					)
					.map((movie) => (
						<Pressable
							key={movie._id}
							style={styles.movieItem}
							onPress={() => navigation.navigate('Details', { id: movie._id })}
						>
							<Text style={styles.movieTitle}>{movie.title}</Text>
							<Text style={styles.movieGenre}>{movie.genre}</Text>
							<View
								style={[
									styles.movieStatus,
									{ backgroundColor: statusBadgeColor(movie.status) },
								]}
							>
								<Text style={styles.movieStatusText}>{movie.status}</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									activeOpacity={0.6}
									underlayColor="#DDDDDD"
									style={styles.edit}
									onPress={() => openEdit(movie)}
								>
									<EditPencil
										color="#480902"
										width={20}
										height={20}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.delete}
									onPress={() => handleDelete(movie._id)}
									disabled={isDeleting}
									activeOpacity={0.6}
									underlayColor="#DDDDDD"
								>
									<TrashSolid
										color="#B64B0F"
										width={20}
										height={20}
									/>
								</TouchableOpacity>
							</View>
						</Pressable>
					))}
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	bodyTitle: {
		color: 'white',
		fontSize: 20,
		fontWeight: '800',
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 2,
		paddingTop: 16,
	},
	openButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		backgroundColor: '#E5D1A3',
	},
	openButtonText: {
		color: '#480902',
		fontSize: 14,
		fontWeight: '600',
	},
	movieContainer: {
		flex: 1,
		marginTop: 10,
	},
	movieContent: {
		padding: 10,
	},
	movieItem: {
		backgroundColor: '#FAF9F5',
		borderRadius: 8,
		marginBottom: 12,
		padding: 10,
		width: '100%',
		height: 'auto',
	},
	movieTitle: {
		color: '#480902',
		fontSize: 18,
		fontWeight: 'bold',
		margin: 2,
	},
	movieGenre: {
		color: 'gray',
		fontSize: 14,
		margin: 2,
	},
	movieStatus: {
		alignSelf: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 10,
		marginTop: 4,
	},
	movieStatusText: {
		color: '#FAF9F5',
		fontSize: 12,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		width: '20%',
		justifyContent: 'space-between',
		alignSelf: 'flex-end',
		padding: 2,
	},
});
