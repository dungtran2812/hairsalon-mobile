import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Pressable,
	ActivityIndicator, // Import ActivityIndicator for loading UI
} from "react-native";
import {
	setAccessToken,
	setName,
	setPhoneNumber,
	setRole,
	setUsername,
} from "../feature/authentication";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/hairsalon.service";

const LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [username, changeUsername] = useState("");
	const [password, setPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [rememberMe, setRememberMe] = useState(false);
	const isLoginDisabled = !username || !password;
	const [login, { isLoading }] = useLoginMutation();

	const handleLogin = async () => {
		if (!username || !password) {
			alert("Please enter both username and password.");
			return;
		}

		try {
			const userData = await login({ username, password }).unwrap();
			dispatch(setAccessToken(userData?.access_token));
			dispatch(setRole(userData?.user?.role[0]));
			dispatch(setUsername(userData?.user?.username));
			dispatch(setName(userData?.user?.username));
			dispatch(setPhoneNumber(userData?.user?.phone));

			if (userData.user.role.includes("stylist")) {
				navigation.navigate("StylistDashboard");
			} else if (userData.user.role.includes("customer")) {
				navigation.navigate("ServiceScreen");
			} else {
				alert("This role cannot log in on Mobile App");
				navigation.navigate("Login");
			}
		} catch (loginError) {
			console.error("Login error:", loginError);
			alert(
				loginError.data?.message || "Login failed. Please try again."
			);
		}
	};

	const toggleSecureTextEntry = () => {
		setSecureTextEntry((prev) => !prev);
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
			<Text style={styles.welcomeText}>Xin chào</Text>
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
					onChangeText={changeUsername}
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
					placeholder="Password"
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

			<Pressable
				style={[
					styles.button,
					{
						backgroundColor: isLoginDisabled ? "#ccc" : "#5D3A29",
					},
				]}
				onPress={handleLogin}
				disabled={isLoginDisabled || isLoading} // Disable button if loading
			>
				{isLoading ? (
					<ActivityIndicator color="black" />
				) : (
					<Text style={styles.buttonText}>Đăng Nhập</Text>
				)}
			</Pressable>

			<Text style={styles.signupPrompt}>
				Bạn chưa có tài khoản?{" "}
				<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
					<Text style={styles.signupText}>Đăng ký</Text>
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
		backgroundColor: "#FFF3E0", // Màu nền nhẹ
	},
	logoContainer: {
		marginBottom: 30, // Tăng khoảng cách dưới logo
	},
	logo: {
		width: 70,
		height: 70,
		marginBottom: 15, // Khoảng cách giữa logo và văn bản chào mừng
	},
	welcomeText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#5D3A29", // Màu nâu
		marginBottom: 5,
	},
	subtitleText: {
		textAlign: "center", // Căn giữa
		fontSize: 14,
		color: "#333", // Màu chữ tối
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
		width: 24,
		height: 24,
		marginRight: 10,
	},
	input: {
		flex: 1,
		padding: 10,
		fontSize: 16,
		color: "#333", // Màu chữ tối
	},
	eyeIcon: {
		width: 24,
		height: 24,
		marginLeft: 10,
	},
	button: {
		width: "60%", // Tăng kích thước nút
		backgroundColor: "#5D3A29", // Màu nâu
		paddingVertical: 12,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 3,
	},
	buttonText: {
		color: "#FAF3E0", // Màu kem cho chữ
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	signupPrompt: {
		marginTop: 10,
	},
	signupText: {
		color: "#5D3A29", // Màu nâu
		fontWeight: "bold",
	},
	orText: {
		marginTop: 20,
		color: "#5D3A29", // Màu nâu
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
	socialIcon: {
		width: 40,
		height: 40,
		marginLeft: 15, // Tăng khoảng cách giữa các icon
	},
});

export default LoginScreen;
