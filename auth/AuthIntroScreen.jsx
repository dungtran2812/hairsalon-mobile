import React from "react";
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from "react-native";

const AuthIntroScreen = ({ navigation }) => {
	return (
		<ImageBackground
			source={{
				uri: "https://i.pinimg.com/enabled_hi/564x/f7/3d/4c/f73d4c5c8638212b4f86699b1b026c44.jpg",
			}} // Replace with your image URL or local image
			style={styles.background}
		>
			<View style={styles.overlay} />
			<View style={styles.content}>
				<Text style={styles.title}>Hair Harmony</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Login")}
				>
					<Text style={styles.buttonText}>Đăng Nhập</Text>
				</TouchableOpacity>
				<View style={styles.spacing} />
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Signup")}
				>
					<Text style={styles.buttonText}>Đăng Ký</Text>
				</TouchableOpacity>
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
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.65)", // Semi-transparent white
	},
	content: {
		position: "absolute",
		bottom: "33%",
		width: "80%",
		alignItems: "center",
		paddingBottom: 20,
	},
	title: {
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: 20,
		color: "rgb(97, 70,59)", // Ensure the text is visible on the white overlay
	},
	spacing: {
		height: 10, // Add spacing between buttons
	},
	button: {
		width: "50%",
		backgroundColor: "rgb(245, 243,227)",
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 25,
		alignItems: "center",
		marginBottom: 5, // Add margin to separate buttons
	},
	buttonText: {
		color: "black",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default AuthIntroScreen;
