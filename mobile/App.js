import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Details from './pages/Details';
import * as Network from 'expo-network';

const Stack = createNativeStackNavigator();

export default function App() {
	Network.getNetworkStateAsync().then((data) => {
		console.log({ data });
	});
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer theme={DarkTheme}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="Home"
						component={Home}
					/>
					<Stack.Screen
						name="Details"
						component={Details}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}
