import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function IntroScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to Hair Salon App</Text>
			<Button
				title="Đăng nhập"
				onPress={() => navigation.navigate("LoginScreen")}
			/>
			<Button
				title="Đăng ký"
				onPress={() => navigation.navigate("SignupScreen")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	title: { fontSize: 24, marginBottom: 20 },
});
