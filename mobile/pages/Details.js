import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import Screen from '../components/Screen';

export default function Details() {
	const navigation = useNavigation();
	return (
		<Screen>
			{/* <Button onPress={() => navigation.navigate('Home')}>Back</Button> */}
			<Text>Details</Text>
		</Screen>
	);
}
