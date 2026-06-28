import { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Pressable,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AuthScreen from '../components/AuthScreen';
import { useAuth } from '../context/AuthContext';

export default function Login() {
	const navigation = useNavigation();
	const { signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = async () => {
		setIsSubmitting(true);
		try {
			// On success the auth stack unmounts and the protected app is shown.
			await signIn(email, password);
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
			<View style={styles.password}>
				<TextInput
					style={[styles.input, styles.passwordInput]}
					value={password}
					onChangeText={setPassword}
					placeholder="Password"
					placeholderTextColor="#D8C9A0"
					secureTextEntry={!showPassword}
				/>
				<Pressable
					style={styles.eyeButton}
					onPress={toggleShowPassword}
				>
					<MaterialCommunityIcons
						name={showPassword ? 'eye-off' : 'eye'}
						size={22}
						color="#E5D1A3"
					/>
				</Pressable>
			</View>

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
	password: {
		width: '80%',
		justifyContent: 'center',
		marginBottom: 12,
	},
	passwordInput: {
		width: '100%',
		paddingRight: 44,
		marginBottom: 0,
	},
	eyeButton: {
		position: 'absolute',
		right: 12,
		height: '100%',
		justifyContent: 'center',
	},
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
