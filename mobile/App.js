import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Details from './pages/Details';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer theme={DarkTheme}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="Watchlist"
						component={Home}
					/>
					<Stack.Screen
						name="Movie Details"
						component={Details}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}
