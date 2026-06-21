import { View, StyleSheet } from 'react-native';

export default function Row({ children }) {
	return <View styles={styles.row}>{children}</View>;
}
const styles = StyleSheet.create({
	row: {
		flex: 4,
		marginHorizontal: 'auto',
		width: 400,
		flexDirection: Row,
	},
});
