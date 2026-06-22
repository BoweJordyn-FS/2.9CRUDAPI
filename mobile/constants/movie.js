export const DEFAULT_FORM = {
	title: '',
	genre: '',
	status: '',
	rating: '',
	notes: '',
};

export const WANT_TO_WATCH = 'want to watch';
export const WATCHED = 'watched';

// Normalize a stored status for comparison (handles casing/whitespace variance).
export const normalizeStatus = (status) => status?.trim().toLowerCase() ?? '';

// Background color for a movie's status badge (React Native style values).
export const statusBadgeColor = (status) =>
	normalizeStatus(status) === WANT_TO_WATCH ? '#CE793A' : '#480902';
