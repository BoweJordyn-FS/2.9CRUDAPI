import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();

function RootNavigator() {
	const { currentUser } = useAuth();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{currentUser ? (
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
