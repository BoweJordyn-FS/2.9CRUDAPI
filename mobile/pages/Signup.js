import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthScreen from '../components/AuthScreen';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
	const navigation = useNavigation();
	const { signUp } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSignup = async () => {
		setIsSubmitting(true);
		try {
			// On success the auth stack unmounts and the protected app is shown.
			await signUp(email, password);
		} catch (err) {
			Alert.alert('Sign up failed', err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthScreen title="Sign Up">
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
				style={styles.signupButton}
				onPress={handleSignup}
				disabled={isSubmitting}
			>
				<Text style={styles.signupButtonText}>
					{isSubmitting ? 'Creating account...' : 'Sign Up'}
				</Text>
			</Pressable>
			<Pressable onPress={() => navigation.navigate('Login')}>
				<Text style={styles.loginLink}>Already have an account? Log in</Text>
			</Pressable>
		</AuthScreen>
	);
}

const styles = StyleSheet.create({
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
	signupButton: {
		width: '80%',
		alignItems: 'center',
		paddingVertical: 12,
		borderRadius: 8,
		backgroundColor: '#E5D1A3',
		marginTop: 8,
	},
	signupButtonText: {
		color: '#480902',
		fontSize: 14,
		fontWeight: '600',
	},
	loginLink: {
		color: '#E5D1A3',
		fontSize: 13,
		marginTop: 16,
		textDecorationLine: 'underline',
	},
});
