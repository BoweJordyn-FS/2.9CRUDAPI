import {
	Modal,
	View,
	Text,
	Pressable,
	TextInput,
	StyleSheet,
} from 'react-native';
import { WANT_TO_WATCH, WATCHED } from '../constants/movie';

const RATINGS = [1, 2, 3, 4, 5];

export default function MovieModal({
	onClose,
	form,
	setForm,
	onSubmit,
	isSubmitting,
	title = 'Add Movie',
}) {
	const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

	return (
		<Modal
			animationType="slide"
			transparent
			visible
			onRequestClose={onClose}
		>
			<View style={styles.backdrop}>
				<Pressable
					style={StyleSheet.absoluteFill}
					onPress={onClose}
				/>
				<View style={styles.card}>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>{title}</Text>
						<Pressable onPress={onClose}>
							<Text style={styles.closeIcon}>×</Text>
						</Pressable>
					</View>

					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={form.title}
						onChangeText={(v) => update('title', v)}
						placeholder="Movie title"
						placeholderTextColor="#9CA3AF"
					/>

					<Text style={styles.label}>Genre</Text>
					<TextInput
						style={styles.input}
						value={form.genre}
						onChangeText={(v) => update('genre', v)}
						placeholder="Genre"
						placeholderTextColor="#9CA3AF"
					/>

					<Text style={styles.label}>Status</Text>
					<View style={styles.row}>
						{[
							{ value: WANT_TO_WATCH, label: 'Want to Watch' },
							{ value: WATCHED, label: 'Watched' },
						].map(({ value, label }) => {
							const selected = form.status === value;
							return (
								<Pressable
									key={value}
									onPress={() => update('status', value)}
									style={[styles.chip, selected && styles.chipSelected]}
								>
									<Text
										style={[
											styles.chipText,
											selected && styles.chipTextSelected,
										]}
									>
										{label}
									</Text>
								</Pressable>
							);
						})}
					</View>

					<Text style={styles.label}>Rating (1–5)</Text>
					<View style={styles.row}>
						{RATINGS.map((n) => {
							const disabled = form.status === WANT_TO_WATCH;
							const selected = form.rating === n;
							return (
								<Pressable
									key={n}
									disabled={disabled}
									onPress={() => update('rating', n)}
									style={[
										styles.ratingChip,
										selected && styles.chipSelected,
										disabled && styles.chipDisabled,
									]}
								>
									<Text
										style={[
											styles.chipText,
											selected && styles.chipTextSelected,
										]}
									>
										{n}
									</Text>
								</Pressable>
							);
						})}
					</View>

					<Text style={styles.label}>Notes</Text>
					<TextInput
						style={[styles.input, styles.notesInput]}
						value={form.notes}
						onChangeText={(v) => update('notes', v)}
						placeholder="Notes"
						placeholderTextColor="#9CA3AF"
						multiline
						numberOfLines={3}
					/>

					<View style={styles.actions}>
						<Pressable
							style={styles.cancelButton}
							onPress={onClose}
						>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</Pressable>
						<Pressable
							style={styles.saveButton}
							onPress={onSubmit}
							disabled={isSubmitting}
						>
							<Text style={styles.saveButtonText}>
								{isSubmitting ? 'Saving...' : 'Save'}
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	card: {
		width: '100%',
		maxWidth: 420,
		backgroundColor: '#FAF9F5',
		borderRadius: 16,
		padding: 24,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 16,
		elevation: 8,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#480902',
	},
	closeIcon: {
		fontSize: 24,
		color: '#9CA3AF',
		lineHeight: 24,
	},
	label: {
		fontSize: 13,
		color: '#6B7280',
		marginBottom: 6,
		marginTop: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: '#111827',
	},
	notesInput: {
		minHeight: 72,
		textAlignVertical: 'top',
	},
	row: {
		flexDirection: 'row',
		gap: 8,
	},
	chip: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 8,
		paddingVertical: 10,
		alignItems: 'center',
	},
	ratingChip: {
		width: 40,
		height: 40,
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	chipSelected: {
		backgroundColor: '#480902',
		borderColor: '#480902',
	},
	chipDisabled: {
		opacity: 0.4,
	},
	chipText: {
		fontSize: 14,
		color: '#374151',
		fontWeight: '500',
	},
	chipTextSelected: {
		color: '#FAF9F5',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 12,
		marginTop: 20,
	},
	cancelButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#480902',
	},
	cancelButtonText: {
		color: '#480902',
		fontSize: 14,
		fontWeight: '500',
	},
	saveButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		backgroundColor: '#480902',
	},
	saveButtonText: {
		color: '#FAF9F5',
		fontSize: 14,
		fontWeight: '500',
	},
});
