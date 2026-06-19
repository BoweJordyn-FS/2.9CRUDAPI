import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import Screen from './components/Screen';
import Details from './pages/Details';

function Home() {
	const navigation = useNavigation();
	return (
		<Screen>
			{/* <Button onPress={() => navigation.navigate('Details')}>Details</Button> */}
			<Text style={styles.bodyTitle}>My Watchlist</Text>
		</Screen>
	);
}
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
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
	);
}

const styles = StyleSheet.create({
	bodyTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: '600',
	},
});
