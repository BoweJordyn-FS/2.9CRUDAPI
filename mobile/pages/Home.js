import { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ScrollView,
	TouchableOpacity,
	Alert,
	Platform,
	useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import MovieModal from '../components/MovieModal';
import { EditPencil, TrashSolid, StarSolid } from 'iconoir-react-native';
import {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
} from '../api/Movies';
import {
	DEFAULT_FORM,
	WANT_TO_WATCH,
	WATCHED,
	normalizeStatus,
	statusBadgeColor,
} from '../constants/movie';
import { useAuth } from '../context/AuthContext';

const FILTER_OPTIONS = [
	{ value: '', label: 'All' },
	{ value: WANT_TO_WATCH, label: 'Want to Watch' },
	{ value: WATCHED, label: 'Watched' },
];

export default function Home() {
	const navigation = useNavigation();
	const { logOut } = useAuth();
	const { width } = useWindowDimensions();
	const isWideScreen = width >= 700;
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
	const [isFilterOpen, setIsFilterOpen] = useState(false);

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
			setMovies((prev) => [created, ...prev]);
			setForm(DEFAULT_FORM);
			setIsOpen(false);
		} catch (err) {
			Alert.alert('Error', err.message);
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
			Alert.alert('Error', err.message);
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
			Alert.alert('Error', err.message);
		} finally {
			setIsDeleting(false);
		}
	};

	const confirmDelete = (id) => {
		Alert.alert('Delete Movie', 'Are you sure you want to delete this movie?', [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Delete', style: 'destructive', onPress: () => handleDelete(id) },
		]);
	};

	if (isLoading) {
		return (
			<Screen>
				<Text style={styles.statusText}>Loading...</Text>
			</Screen>
		);
	}
	if (isError) {
		return (
			<Screen>
				<Text style={styles.statusText}>Failed to load movies.</Text>
			</Screen>
		);
	}

	return (
		<Screen style={styles.screen}>
			<View style={styles.topRow}>
				<Text style={styles.bodyTitle}>My Watchlist</Text>
				<View style={styles.topActions}>
					<Pressable
						style={styles.openButton}
						onPress={() => setIsOpen(true)}
					>
						<Text style={styles.openButtonText}>+ Add Movie</Text>
					</Pressable>
				</View>
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

			<ScrollView style={styles.movieContainer}>
				<View style={styles.filterRow}>
					<Pressable
						style={[styles.filterButton, isWideScreen && styles.movieItemWide]}
						onPress={() => setIsFilterOpen((prev) => !prev)}
					>
						<Text style={styles.filterButtonText}>
							{FILTER_OPTIONS.find((o) => o.value === filterStatus)?.label}
						</Text>
						<Text style={styles.filterArrow}>{isFilterOpen ? '▲' : '▼'}</Text>
					</Pressable>

					{isFilterOpen && (
						<View style={styles.filterDropdown}>
							{FILTER_OPTIONS.map((option) => (
								<Pressable
									key={option.value}
									style={styles.filterOption}
									onPress={() => {
										setFilter(option.value);
										setIsFilterOpen(false);
									}}
								>
									<Text
										style={[
											styles.filterOptionText,
											option.value === filterStatus &&
												styles.filterOptionTextSelected,
										]}
									>
										{option.label}
									</Text>
								</Pressable>
							))}
						</View>
					)}
				</View>
				{movies
					.filter(
						(m) => !filterStatus || normalizeStatus(m.status) === filterStatus,
					)
					.map((movie) => (
						<Pressable
							key={movie._id}
							style={[styles.movieItem, isWideScreen && styles.movieItemWide]}
							onPress={() => navigation.navigate('Details', { id: movie._id })}
						>
							<Text style={styles.movieTitle}>{movie.title}</Text>
							<Text style={styles.movieGenre}>{movie.genre}</Text>
							{movie.rating ? (
								<View style={styles.starsRow}>
									{Array.from({ length: movie.rating }).map((_, i) => (
										<StarSolid
											key={i}
											color="#917B24"
											width={12}
											height={12}
										/>
									))}
								</View>
							) : null}
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
									onPress={() => confirmDelete(movie._id)}
									disabled={isDeleting}
									activeOpacity={0.6}
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
	statusText: {
		color: '#FAF9F5',
		fontSize: 16,
		margin: 16,
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
		marginHorizontal: '4%',
	},
	topActions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
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
	filterRow: {
		marginTop: 12,
		marginBottom: 12,
		zIndex: 10,
	},
	filterButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 8,
		backgroundColor: '#FAF9F5',
	},
	filterButtonText: {
		color: '#480902',
		fontSize: 15,
		fontWeight: '600',
	},
	filterArrow: {
		color: '#480902',
		fontSize: 10,
	},
	filterDropdown: {
		position: 'absolute',
		top: '100%',
		left: 0,
		marginTop: 4,
		minWidth: 140,
		backgroundColor: '#FAF9F5',
		borderRadius: 8,
		overflow: 'hidden',
		boxShadow: '2px 2px 6px grey',
	},
	filterOption: {
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	filterOptionText: {
		color: '#480902',
		fontSize: 13,
	},
	filterOptionTextSelected: {
		fontWeight: '700',
	},
	movieContainer: {
		flex: 1,
		marginTop: 10,
		marginHorizontal: 16,
	},
	movieItem: {
		backgroundColor: '#FAF9F5',
		borderRadius: 8,
		marginBottom: 12,
		padding: 10,
		width: '100%',
		height: 'auto',
	},
	movieItemWide: {
		width: '60%',
		alignSelf: 'center',
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
		margin: 4,
	},
	starsRow: {
		flexDirection: 'row',
		gap: 2,
		marginHorizontal: 4,
		marginVertical: 4,
	},
	movieStatus: {
		alignSelf: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 10,
		marginTop: 8,
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
		gap: 30,
		alignSelf: 'flex-end',
		padding: 2,
	},
});
