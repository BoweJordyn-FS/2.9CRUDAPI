// In-memory JWT holder so the movies API can attach the token without each
// caller passing it. Not persisted, so a reload clears it and the app returns
// to the login screen (acceptable for this assignment).
let authToken = null;

export const setAuthToken = (token) => {
	authToken = token ?? null;
};

// Authorization header for protected requests. The server's JWT strategy expects
// the `bearer` scheme (see server/services/passport.js).
export const authHeader = () =>
	authToken ? { Authorization: `bearer ${authToken}` } : {};
