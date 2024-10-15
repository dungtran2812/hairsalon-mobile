// auth/SignupScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, CheckBox } from "react-native";

const SignupScreen = ({ navigation }) => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [policyConfirmed, setPolicyConfirmed] = useState(false);

	const handleSignup = () => {
		console.log("Navigating to Signup");
		navigation.navigate("Home");
	};

	const isPasswordValid = (password) => {
		// Kiểm tra mật khẩu có chữ viết hoa, chữ thường, số, ký tự đặc biệt
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 20,
			}}
		>
			<Text>Đăng Ký</Text>
			<TextInput
				placeholder="Họ và tên"
				value={fullName}
				onChangeText={setFullName}
				style={{ borderWidth: 1, width: "100%", marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={{ borderWidth: 1, width: "100%", marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Giới tính"
				value={gender}
				onChangeText={setGender}
				style={{ borderWidth: 1, width: "100%", marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Mật khẩu"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={{ borderWidth: 1, width: "100%", marginBottom: 10 }}
			/>
			<TextInput
				placeholder="Xác nhận mật khẩu"
				secureTextEntry
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				style={{ borderWidth: 1, width: "100%", marginBottom: 10 }}
			/>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginBottom: 10,
				}}
			>
				<CheckBox
					value={policyConfirmed}
					onValueChange={() => setPolicyConfirmed(!policyConfirmed)}
				/>
				<Text>Tôi đồng ý với chính sách</Text>
			</View>

			<Button
				title="Đăng Ký"
				onPress={handleSignup}
				disabled={
					!policyConfirmed ||
					password !== confirmPassword ||
					!isPasswordValid(password)
				}
			/>

			<Text
				onPress={() => navigation.navigate("Login")}
				style={{ marginTop: 10, color: "blue" }}
			>
				Nếu bạn đã có tài khoản, hãy đăng nhập
			</Text>
		</View>
	);
};

export default SignupScreen;
