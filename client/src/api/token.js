// Holds the current JWT so API modules can attach it without each caller
// threading the token through. Initialized from localStorage at module load so
// requests made before AuthProvider mounts (e.g. a hard refresh) are still
// authenticated. AuthContext keeps this in sync on sign in / sign out.
const TOKEN_KEY = 'auth.token';

let authToken =
	typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

export const getStoredToken = () => authToken;

export const setAuthToken = (token) => {
	authToken = token || null;
	if (typeof localStorage === 'undefined') return;
	if (token) {
		localStorage.setItem(TOKEN_KEY, token);
	} else {
		localStorage.removeItem(TOKEN_KEY);
	}
};

// Authorization header for protected requests. The server's JWT strategy expects
// the `bearer` scheme (see server/services/passport.js).
export const authHeader = () =>
	authToken ? { Authorization: `bearer ${authToken}` } : {};
