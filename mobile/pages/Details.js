import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import Screen from '../components/Screen';
import MovieModal from '../components/MovieModal';
import { Movie, EditPencil, TrashSolid } from 'iconoir-react-native';
import { getMovie, updateMovie, deleteMovie } from '../api/Movies';
import { DEFAULT_FORM, statusBadgeColor } from '../constants/movie';

export default function Details() {
	const navigation = useNavigation();
	const route = useRoute();
	const { id } = route.params;

	const [movie, setMovie] = useState(null);
	const [editTarget, setEditTarget] = useState(null);
	const [editForm, setEditForm] = useState(DEFAULT_FORM);
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

	const handleUpdate = async () => {
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
			Alert.alert('Error', err.message);
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
			Alert.alert('Error', err.message);
		} finally {
			setIsDeleting(false);
		}
	};

	if (isLoading) {
		return (
			<Screen>
				<Text style={styles.statusText}>Loading...</Text>
			</Screen>
		);
	}

	if (isDeleted) {
		return (
			<Screen>
				<Text style={styles.statusText}>Movie deleted.</Text>
				<Button
					variant="plain"
					color="#480902"
					onPress={() => navigation.navigate('Home')}
					style={styles.backButton}
				>
					← Back to Watchlist
				</Button>
			</Screen>
		);
	}

	if (isError || !movie) {
		return (
			<Screen>
				<Text style={styles.statusText}>Movie not found.</Text>
			</Screen>
		);
	}

	return (
		<Screen>
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

			<Button
				variant="plain"
				color="#480902"
				onPress={() => navigation.navigate('Home')}
				style={styles.backButton}
			>
				← Back
			</Button>

			<View style={styles.card}>
				<View style={styles.iconBox}>
					<Movie
						color="#480902"
						width={30}
						height={30}
					/>
				</View>
				<View style={styles.cardInfo}>
					<Text style={styles.title}>{movie.title}</Text>
					<Text style={styles.genre}>{movie.genre}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={openEdit}
					>
						<EditPencil
							color="#480902"
							width={20}
							height={20}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={handleDelete}
						disabled={isDeleting}
					>
						<TrashSolid
							color="#B64B0F"
							width={20}
							height={20}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.detailsSection}>
				<Text style={styles.detailsHeading}>Details</Text>
				<View style={styles.detailsTable}>
					<View style={styles.detailsRow}>
						<Text style={styles.detailsLabel}>Status</Text>
						<View
							style={[
								styles.statusBadge,
								{ backgroundColor: statusBadgeColor(movie.status) },
							]}
						>
							<Text style={styles.statusBadgeText}>{movie.status}</Text>
						</View>
					</View>
					<View style={styles.detailsRow}>
						<Text style={styles.detailsLabel}>Rating</Text>
						<Text style={styles.detailsValue}>
							{movie.rating ? `${movie.rating} / 5` : '—'}
						</Text>
					</View>
					<View style={styles.detailsRow}>
						<Text style={styles.detailsLabel}>Genre</Text>
						<Text style={styles.detailsValue}>{movie.genre || '—'}</Text>
					</View>
					<View style={styles.detailsRow}>
						<Text style={styles.detailsLabel}>Notes</Text>
						<Text style={styles.detailsValue}>{movie.notes || '—'}</Text>
					</View>
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	statusText: {
		color: '#FAF9F5',
		fontSize: 16,
		margin: 16,
	},
	backButton: {
		alignSelf: 'flex-start',
		backgroundColor: '#E5D1A3',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		marginBottom: 16,
	},
	card: {
		backgroundColor: '#FAF9F5',
		borderRadius: 8,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	iconBox: {
		width: 60,
		height: 70,
		backgroundColor: '#f2f0e9',
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardInfo: {
		flex: 1,
		gap: 2,
	},
	title: {
		color: '#480902',
		fontSize: 18,
		fontWeight: 'bold',
		margin: 2,
	},
	genre: {
		color: 'gray',
		fontSize: 14,
		textTransform: 'capitalize',
		margin: 4,
	},
	statusBadge: {
		alignSelf: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 10,
		marginTop: 4,
	},
	statusBadgeText: {
		color: '#FAF9F5',
		fontSize: 12,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 12,
		alignSelf: 'flex-start',
	},
	detailsSection: {
		backgroundColor: '#FAF9F5',
		borderRadius: 8,
		padding: 16,
		marginTop: 16,
	},
	detailsHeading: {
		color: '#480902',
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 8,
	},
	detailsTable: {
		backgroundColor: '#f2f0e9',
		borderRadius: 6,
		padding: 8,
	},
	detailsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#e5e1d8',
	},
	detailsLabel: {
		color: '#8a8a8a',
		fontSize: 13,
		width: 70,
	},
	detailsValue: {
		flex: 1,
		flexShrink: 1,
		color: '#480902',
		fontSize: 13,
	},
});
