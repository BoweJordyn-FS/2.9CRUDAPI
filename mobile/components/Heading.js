import { StyleSheet, Text, View } from 'react-native';

export default function Heading({ children, variant = 'title' }) {
	return (
		<Text style={variant === 'title' ? styles.title : styles.subtitle}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 26,
		fontWeight: '600',
		color: '#480902',
		letterSpacing: -0.3,
	},
	subtitle: {
		fontSize: 17,
		fontWeight: '600',
		color: '#480902',
		letterSpacing: -0.3,
	},
});
