import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();

// Picks the auth stack or the protected app stack based on session state.
// Because the screens are mounted conditionally, the protected views are
// unreachable without a valid token.
function RootNavigator() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return null;
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isAuthenticated ? (
				<>
					<Stack.Screen
						name="Home"
						component={Home}
					/>
					<Stack.Screen
						name="Details"
						component={Details}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="Login"
						component={Login}
					/>
					<Stack.Screen
						name="Sign Up"
						component={Signup}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<NavigationContainer theme={DarkTheme}>
					<RootNavigator />
				</NavigationContainer>
			</AuthProvider>
		</GestureHandlerRootView>
	);
}
