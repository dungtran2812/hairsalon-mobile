import React from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";

const AuthIntroScreen = ({ navigation }) => {
	return (
		<ImageBackground
			source={{
				uri: "https://i.pinimg.com/enabled_hi/564x/f7/3d/4c/f73d4c5c8638212b4f86699b1b026c44.jpg",
			}} // Replace with your image URL or local image
			style={styles.background}
		>
			<View style={styles.overlay}>
				<Text style={styles.title}>Hair Harmony</Text>
				<Button
					title="Đăng Nhập"
					onPress={() => navigation.navigate("Login")}
				/>
				<View style={styles.spacing} />
				<Button
					title="Đăng Ký"
					onPress={() => navigation.navigate("Signup")}
				/>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add a semi-transparent background to improve text readability
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	spacing: {
		height: 10, // Add spacing between buttons
	},
});

export default AuthIntroScreen;
