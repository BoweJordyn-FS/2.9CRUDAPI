import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signin, signup } from '../api/Auth';
import { setAuthToken } from '../api/token';

const TOKEN_KEY = 'auth.token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Persist (or clear) the token everywhere: state, AsyncStorage, and the
	// in-memory holder the API layer reads from.
	const applyToken = async (next) => {
		setToken(next);
		setAuthToken(next);
		if (next) {
			await AsyncStorage.setItem(TOKEN_KEY, next);
		} else {
			await AsyncStorage.removeItem(TOKEN_KEY);
		}
	};

	// Restore a saved session on app start.
	useEffect(() => {
		(async () => {
			try {
				const saved = await AsyncStorage.getItem(TOKEN_KEY);
				if (saved) {
					setToken(saved);
					setAuthToken(saved);
				}
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const signIn = async (email, password) => {
		const data = await signin(email, password);
		await applyToken(data.token);
	};

	const signUp = async (email, password) => {
		const data = await signup(email, password);
		await applyToken(data.token);
	};

	const signOut = () => applyToken(null);

	return (
		<AuthContext.Provider
			value={{ token, isAuthenticated: !!token, isLoading, signIn, signUp, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
