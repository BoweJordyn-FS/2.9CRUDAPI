import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CinemaOld } from 'iconoir-react-native';

import Heading from './Heading';

export default function AuthScreen({ title, children }) {
	return (
		<SafeAreaProvider style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.titleContainer}>
					<View style={styles.screenTitle}>
						<CinemaOld
							color="#480902"
							width={40}
							height={40}
						/>
						<Text style={styles.title}>Watchlist</Text>
					</View>
					<Heading variant="subtitle">Your Movies, Your List.</Heading>
				</View>
				{title && (
					<View style={styles.pageTitle}>
						<Heading variant="title">{title}</Heading>
					</View>
				)}
			</SafeAreaView>
			<View style={styles.formContainer}>{children}</View>
		</SafeAreaProvider>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FAF9F5',
	},
	safeArea: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleContainer: {
		alignItems: 'center',
	},
	screenTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	title: {
		fontSize: 45,
		overflow: 'visible',
	},
	pageTitle: {
		marginTop: 28,
	},
	formContainer: {
		width: '100%',
		height: '55%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#480902',
		borderTopLeftRadius: 45,
		borderTopRightRadius: 45,
	},
});
