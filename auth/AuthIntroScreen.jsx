import React from "react";
import { View, Text, Button } from "react-native";

const AuthIntroScreen = ({ navigation }) => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Chào mừng đến với Hair Salon Booking!</Text>
			<Button
				title="Đăng Nhập"
				onPress={() => navigation.navigate("Login")}
			/>
			<Button
				title="Đăng Ký"
				onPress={() => navigation.navigate("Signup")}
			/>
		</View>
	);
};

export default AuthIntroScreen;
