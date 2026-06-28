// In-memory JWT holder so the movies API can attach the token without each
// caller passing it.
let authToken = null;

export const setAuthToken = (token) => {
	authToken = token ?? null;
};

// Authorization header for protected requests. The server's JWT strategy expects
// the `bearer` scheme (see server/services/passport.js).
export const authHeader = () =>
	authToken ? { Authorization: `bearer ${authToken}` } : {};
