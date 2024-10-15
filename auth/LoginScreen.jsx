import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Đăng nhập</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title="Đăng nhập"
				onPress={() => navigation.replace("HomeScreen")}
			/>

			<View style={styles.socialContainer}>
				<Button
					title="Đăng nhập bằng Google"
					onPress={() => {
						/* Đăng nhập Google */
					}}
				/>
				<Button
					title="Đăng nhập bằng Facebook"
					onPress={() => {
						/* Đăng nhập Facebook */
					}}
				/>
			</View>

			<TouchableOpacity
				onPress={() => navigation.navigate("RegisterScreen")}
			>
				<Text style={styles.registerText}>
					Chưa có tài khoản? Đăng ký ngay
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", padding: 20 },
	title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
	input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
	socialContainer: { marginTop: 20 },
	registerText: { marginTop: 20, textAlign: "center", color: "blue" },
});
