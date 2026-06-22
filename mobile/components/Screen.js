import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CinemaOld } from 'iconoir-react-native';
import Heading from './Heading';

export default function Screen({ children }) {
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		paddingVertical: 10,
	},
	body: {
		flex: 1,
		margin: 30,
	},
});
