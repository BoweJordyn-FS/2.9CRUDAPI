// Holds the current JWT in memory so API modules can attach it without each
// caller threading the token through. AuthContext keeps this in sync with the
// persisted token (AsyncStorage) on sign in, sign out, and app start.
let authToken = null;

export const setAuthToken = (token) => {
	authToken = token ?? null;
};

// Authorization header for protected requests. The server's JWT strategy expects
// the `bearer` scheme (see server/services/passport.js).
export const authHeader = () =>
	authToken ? { Authorization: `bearer ${authToken}` } : {};
