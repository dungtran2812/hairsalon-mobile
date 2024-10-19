import React from "react";
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";

const AuthIntroScreen = ({ navigation }) => {
	return (
		<ImageBackground
			source={{
				uri: "https://i.pinimg.com/enabled_hi/564x/f7/3d/4c/f73d4c5c8638212b4f86699b1b026c44.jpg",
			}}
			style={styles.background}
		>
			<View style={styles.overlay} />
			<View style={styles.content}>
				<Text style={styles.title}>Hair Harmony</Text>
				<Pressable
					style={({ pressed }) => [
						styles.button,
						{
							backgroundColor: pressed
								? "rgb(97, 70, 59)" // Màu nền khi nhấn
								: "rgb(245, 243, 227)",
						},
					]}
					onPress={() => navigation.navigate("Login")}
				>
					{({ pressed }) => (
						<Text
							style={[
								styles.buttonText,
								{
									color: pressed ? "white" : "black", // Màu chữ khi nhấn
								},
							]}
						>
							Đăng Nhập
						</Text>
					)}
				</Pressable>
				<View style={styles.spacing} />
				<Pressable
					style={({ pressed }) => [
						styles.button,
						{
							backgroundColor: pressed
								? "rgb(97, 70, 59)" // Màu nền khi nhấn
								: "rgb(245, 243, 227)",
						},
					]}
					onPress={() => navigation.navigate("Signup")}
				>
					{({ pressed }) => (
						<Text
							style={[
								styles.buttonText,
								{
									color: pressed ? "white" : "black", // Màu chữ khi nhấn
								},
							]}
						>
							Đăng Ký
						</Text>
					)}
				</Pressable>
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
		backgroundColor: "rgba(255, 255, 255, 0.7)", // Màu trắng bán trong suốt
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
		color: "rgb(97, 70, 59)", // Màu chữ tiêu đề
	},
	spacing: {
		height: 10, // Khoảng cách giữa các nút
	},
	button: {
		width: "50%",
		backgroundColor: "rgb(245, 243, 227)",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 25,
		alignItems: "center",
		marginBottom: 10, // Khoảng cách giữa các nút
	},
	buttonText: {
		fontSize: 18, // Kích thước chữ
		fontWeight: "bold", // Độ đậm chữ
		textAlign: "center",
	},
});

export default AuthIntroScreen;
