import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Pressable,
} from "react-native";

const SignupScreen = ({ navigation }) => {
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [agreeToPolicy, setAgreeToPolicy] = useState(false);

	const isEmailValid = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const isSignupDisabled =
		!fullName ||
		!username ||
		!email ||
		!password ||
		!confirmPassword ||
		!agreeToPolicy ||
		!isEmailValid(email);

	const handleSignup = () => {
		if (!fullName || !username || !email || !password || !confirmPassword) {
			alert("Vui lòng điền đầy đủ thông tin.");
			return;
		}

		if (password.length < 6) {
			alert("Mật khẩu phải có ít nhất 6 ký tự.");
			return;
		}

		if (password !== confirmPassword) {
			alert("Mật khẩu không khớp.");
			return;
		}

		if (!agreeToPolicy) {
			alert(
				"Vui lòng đồng ý với Chính sách bảo mật và Điều khoản sử dụng."
			);
			return;
		}

		// Xử lý logic tạo tài khoản ở đây (gọi API, v.v.)
		navigation.navigate("ServiceScreen");
	};

	const toggleSecureTextEntry = () => {
		setSecureTextEntry((prev) => !prev);
	};

	const toggleAgreeToPolicy = () => {
		setAgreeToPolicy((prev) => !prev);
	};

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/ios-filled/50/000000/hair-care.png",
					}}
					style={styles.logo}
				/>
			</View>
			<Text style={styles.welcomeText}>Hãy tạo tài khoản mới</Text>
			<Text style={styles.subtitleText}>
				Hãy cùng chúng tôi chăm sóc cho mái tóc của bạn!
			</Text>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/user.png",
					}}
					style={styles.icon}
				/>
				<TextInput
					placeholder="Username"
					value={username}
					onChangeText={setUsername}
					style={styles.input}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/email.png",
					}}
					style={styles.icon}
				/>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					style={styles.input}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/lock-2.png",
					}}
					style={styles.icon}
				/>
				<TextInput
					placeholder="Mật khẩu"
					secureTextEntry={secureTextEntry}
					value={password}
					onChangeText={setPassword}
					style={styles.input}
				/>
				<TouchableOpacity onPress={toggleSecureTextEntry}>
					<Image
						source={{
							uri: secureTextEntry
								? "https://img.icons8.com/material-outlined/24/000000/invisible.png"
								: "https://img.icons8.com/material-outlined/24/000000/visible.png",
						}}
						style={styles.eyeIcon}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/lock-2.png",
					}}
					style={styles.icon}
				/>
				<TextInput
					placeholder="Nhập lại mật khẩu"
					secureTextEntry={secureTextEntry}
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					style={styles.input}
				/>
				<TouchableOpacity onPress={toggleSecureTextEntry}>
					<Image
						source={{
							uri: secureTextEntry
								? "https://img.icons8.com/material-outlined/24/000000/invisible.png"
								: "https://img.icons8.com/material-outlined/24/000000/visible.png",
						}}
						style={styles.eyeIcon}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.checkboxContainer}>
				<TouchableOpacity
					onPress={toggleAgreeToPolicy}
					style={styles.checkbox}
					disabled={isSignupDisabled} // Disable checkbox if not all fields are filled
				>
					{agreeToPolicy && <View style={styles.checkedCheckbox} />}
				</TouchableOpacity>
				<Text style={styles.checkboxText}>
					Tôi đồng ý với Chính sách bảo mật và Điều khoản sử dụng
				</Text>
			</View>

			<Pressable
				style={({ pressed }) => [
					styles.button,
					{
						backgroundColor: isSignupDisabled ? "#ccc" : "#5D3A29",
					},
				]}
				onPress={handleSignup}
				disabled={isSignupDisabled}
			>
				{({ pressed }) => (
					<Text
						style={[
							styles.buttonText,
							{
								color: pressed ? "white" : "black",
							},
						]}
					>
						Tạo tài khoản
					</Text>
				)}
			</Pressable>

			<Text style={styles.loginPrompt}>
				Đã có tài khoản?{" "}
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.loginText}>Đăng nhập</Text>
				</TouchableOpacity>
			</Text>

			<Text style={styles.orText}>Hoặc đăng ký qua</Text>

			<View style={styles.socialContainer}>
				<TouchableOpacity>
					<Image
						source={{
							uri: "https://img.icons8.com/color/48/000000/google-logo.png",
						}}
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Image
						source={{
							uri: "https://img.icons8.com/color/48/000000/facebook.png",
						}}
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#FFF3E0",
	},
	logoContainer: {
		marginBottom: 20,
	},
	logo: {
		width: 50,
		height: 50,
	},
	welcomeText: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 5,
		color: "rgb(97, 70, 59)",
	},
	subtitleText: {
		textAlign: "center",
		fontSize: 14,
		color: "#333",
		marginBottom: 30,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#D1C6B6", // Màu viền sáng hơn
		borderRadius: 25,
		width: "100%",
		marginBottom: 15,
		paddingVertical: 3, // Tăng chiều cao để các input nhìn thoải mái hơn
		paddingHorizontal: 15, // Thêm khoảng cách bên trong
		backgroundColor: "#FFFFFF", // Màu nền input
		shadowColor: "#000", // Thêm bóng đổ
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2, // Để hỗ trợ Android
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
		padding: 10,
	},
	eyeIcon: {
		width: 20,
		height: 20,
		marginLeft: 10,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#D1C6B6",
		borderRadius: 4,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	checkedCheckbox: {
		width: 14,
		height: 14,
		backgroundColor: "#5D3A29",
	},
	checkboxText: {
		fontSize: 14,
		color: "#333",
		flex: 1,
	},
	button: {
		width: "100%",
		padding: 15,
		borderRadius: 25,
		alignItems: "center",
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	loginPrompt: {
		marginTop: 15,
		fontSize: 14,
	},
	loginText: {
		color: "#5D3A29",
		fontWeight: "bold",
	},
	orText: {
		marginVertical: 20,
		fontSize: 14,
		color: "#333",
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	socialIcon: {
		width: 40,
		height: 40,
	},
});

export default SignupScreen;
