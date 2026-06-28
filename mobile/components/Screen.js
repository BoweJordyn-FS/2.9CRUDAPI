import { StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CinemaOld } from 'iconoir-react-native';
import { useAuth } from '../context/AuthContext';

import Heading from './Heading';

export default function Screen({ children }) {
	const { logOut } = useAuth();

	return (
		<SafeAreaProvider style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.header}>
					<Heading variant="title">
						<CinemaOld
							color="#480902"
							width={20}
							height={20}
						/>
						Watchlist
					</Heading>
					<Heading variant="subtitle">Your Movies, Your List.</Heading>
				</View>
				<Pressable
					style={styles.signOutButton}
					onPress={logOut}
				>
					<Text style={styles.signOutButtonText}>Sign Out</Text>
				</Pressable>
			</SafeAreaView>
			<View style={styles.body}>{children}</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#480902',
	},
	safeArea: {
		backgroundColor: '#E5D1A3',
	},
	header: {
		backgroundColor: '#E5D1A3',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		paddingVertical: 10,
	},
	body: {
		flex: 1,
	},
	signOutButton: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#480902',
		width: '25%',
		alignSelf: 'center',
		marginBottom: 8,
	},
	signOutButtonText: {
		color: '#480902',
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'center',
	},
});
