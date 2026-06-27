import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthScreen from '../components/AuthScreen';
import { signin } from '../api/Auth';

export default function Login() {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogin = async () => {
		setIsSubmitting(true);
		try {
			await signin(email, password);
			navigation.navigate('Watchlist');
		} catch (err) {
			Alert.alert('Login failed', err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthScreen
			title="Login"
			style={styles.screen}
		>
			<TextInput
				style={styles.input}
				value={email}
				onChangeText={setEmail}
				placeholder="Email"
				placeholderTextColor="#D8C9A0"
				autoCapitalize="none"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				placeholderTextColor="#D8C9A0"
				secureTextEntry
			/>
			<Pressable
				style={styles.loginButton}
				onPress={handleLogin}
				disabled={isSubmitting}
			>
				<Text style={styles.loginButtonText}>
					{isSubmitting ? 'Logging in...' : 'Login'}
				</Text>
			</Pressable>
			<Pressable onPress={() => navigation.navigate('Sign Up')}>
				<Text style={styles.signupLink}>Don't have an account? Sign up</Text>
			</Pressable>
		</AuthScreen>
	);
}

const styles = StyleSheet.create({
	screen: {},
	input: {
		width: '80%',
		borderWidth: 1,
		borderColor: '#E5D1A3',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: '#FAF9F5',
		marginBottom: 12,
	},
	loginButton: {
		width: '80%',
		alignItems: 'center',
		paddingVertical: 12,
		borderRadius: 8,
		backgroundColor: '#E5D1A3',
		marginTop: 8,
	},
	loginButtonText: {
		color: '#480902',
		fontSize: 14,
		fontWeight: '600',
	},
	signupLink: {
		color: '#E5D1A3',
		fontSize: 13,
		marginTop: 16,
		textDecorationLine: 'underline',
	},
});
