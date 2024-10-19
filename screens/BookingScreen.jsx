import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BookingScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to the Booking Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default BookingScreen;
