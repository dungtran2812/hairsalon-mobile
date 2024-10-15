// auth/LoginScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		console.log("Navigating to Login");
		navigation.navigate("Home");
	};

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Đăng Nhập</Text>
			<TextInput
				placeholder="Tên người dùng"
				value={username}
				onChangeText={setUsername}
				style={{ borderWidth: 1, width: "80%", marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Mật khẩu"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={{ borderWidth: 1, width: "80%", marginBottom: 10 }}
			/>
			<Button title="Đăng Nhập" onPress={handleLogin} />
			<Button title="Đăng Nhập bằng Gmail" onPress={() => {}} />
			<Button title="Đăng Nhập bằng Facebook" onPress={() => {}} />
			<Text
				onPress={() => navigation.navigate("Signup")}
				style={{ marginTop: 10, color: "blue" }}
			>
				Chưa có tài khoản? Đăng ký
			</Text>
		</View>
	);
};

export default LoginScreen;
