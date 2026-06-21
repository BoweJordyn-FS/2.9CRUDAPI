import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import Screen from '../components/Screen';
import { Movie } from 'iconoir-react-native';
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

export default function Details() {
	const navigation = useNavigation();
	const route = useRoute();
	const { id } = route.params;

	const [movies, setMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [editTarget, setEditTarget] = useState(null);
	const [editForm, setEditForm] = useState(DEFAULT_FORM);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		getMovie(id)
			.then(setMovie)
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, [id]);

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
				onPress={() => navigation.push('Home')}
				style={styles.backButton}
			>
				← Back
			</Button>

			<View>
				<View style={styles.detailsContainer}>
					<View style={styles.topSection}>
						<Movie
							color="black"
							width={30}
							height={30}
						/>
					</View>
					<View>
						<Text>{movie.title}</Text>
						<Text>{movie.genre}</Text>
						<View>
							<Text>{movie.status}</Text>
						</View>
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
				</View>
				<View style={styles.bottomSection}>
					<Text>Details</Text>
					<View style={styles.tableView}></View>
				</View>
			</View>
		</Screen>
	);
}
const styles = StyleSheet.create({
	backButton: {
		alignSelf: 'flex-start',
		backgroundColor: '#E5D1A3',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		marginBottom: 16,
	},
});
