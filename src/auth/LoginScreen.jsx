import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Pressable,
} from "react-native";
import { loginUser, setRole } from "../feature/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../services/hairsalon.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store/store";

const LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true); // Để kiểm soát việc hiển thị mật khẩu
	const [rememberMe, setRememberMe] = useState(false); // Kiểm soát trạng thái checkbox
	const isLoginDisabled = !username || !password; // Kiểm tra xem nút đăng nhập có bị vô hiệu hóa không
	const userRole = useSelector((state) => state?.rootReducer?.user?.role);
	const [login, { isLoading, error }] = useLoginMutation()
	const handleLogin = async () => {
		if (!username || !password) {
			alert("Please enter both username and password.");
			return;
		}
	
		try {
			// Call login mutation and unwrap response
			const userData = await login({ username, password }).unwrap();
	
			// Dispatch role to the store
			await dispatch(setRole(userData.user.role[0]));
	
			// Navigate immediately based on role in userData
			if (userData.user.role.includes("stylist")) {
				navigation.navigate("StylistDashboard"); // Example stylist screen
			} else if (userData.user.role.includes("customer")) {
				navigation.navigate("HomeScreen");
			} else {
				alert("This role cannot log in on Mobile App");
				navigation.navigate("Login");
			}
		} catch (loginError) {
			console.error("Login error:", loginError);
			alert(loginError.data?.message || "Login failed. Please try again.");
		}
	};
	

	const toggleSecureTextEntry = () => {
		setSecureTextEntry((prev) => !prev);
	};

	const toggleRememberMe = () => {
		setRememberMe((prev) => !prev);
	};

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/ios-filled/50/000000/hair-care.png",
					}} // Logo tạm thời
					style={styles.logo}
				/>
			</View>
			<Text style={styles.welcomeText}>Welcome</Text>
			<Text style={styles.subtitleText}>
				Access your account and start to take care your hair
			</Text>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/user.png",
					}} // Biểu tượng người dùng
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
						uri: "https://img.icons8.com/material-outlined/24/000000/lock-2.png",
					}} // Biểu tượng mật khẩu
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
								? "https://img.icons8.com/material-outlined/24/000000/invisible.png" // Biểu tượng mắt đóng
								: "https://img.icons8.com/material-outlined/24/000000/visible.png", // Biểu tượng mắt mở
						}}
						style={styles.eyeIcon}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.checkboxContainer}>
			<TouchableOpacity
				onPress={toggleRememberMe}
				style={styles.checkboxContainer}
			>
				<View style={styles.checkbox}>
					{rememberMe && <View style={styles.checkedCheckbox} />}
				</View>
				<Text style={styles.checkboxText}>Remember Me</Text>
			</TouchableOpacity>
				{/* <TouchableOpacity
					onPress={() => navigation.navigate("ForgetPassword")}
					style={styles.checkboxContainer}
				>
					<Text style={styles.forgotPasswordText}>
						Forgot Password?
					</Text>
				</TouchableOpacity> */}
			</View>

			<Pressable
				style={({ pressed }) => [
					styles.button,
					{
						backgroundColor: pressed
							? "rgb(97, 70, 59)" // Background color when pressed
							: isLoginDisabled
							? "#ccc" // Background color when disabled
							: "rgb(245, 243, 227)", // Normal background color
					},
				]}
				onPress={handleLogin}
				disabled={isLoginDisabled} // Disable the button when the form is incomplete
			>
				{({ pressed }) => (
					<Text
						style={[
							styles.buttonText,
							{
								color: pressed ? "white" : "black", // Text color when pressed
							},
						]}
					>
						Đăng Nhập
					</Text>
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
						}} // Biểu tượng Google
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Image
						source={{
							uri: "https://img.icons8.com/color/48/000000/facebook.png",
						}} // Biểu tượng Facebook
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
		alignItems: "center", // Căn trái
		padding: 20,
		backgroundColor: "#fff",
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
		textAlign: "left", // Căn trái
		marginBottom: 20,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 29,
		width: "100%",
		marginBottom: 10,
		padding: 5,
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 10,
		marginLeft: 10,
	},
	input: {
		flex: 1,
		padding: 10,
	},
	eyeIcon: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20,
		marginLeft: 10,
	},
	checkbox: {
		width: 15,
		height: 15,
		borderWidth: 1,
		borderColor: "#000",
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	checkedCheckbox: {
		width: 16,
		height: 16,
		backgroundColor: "#000", // Màu nền khi checkbox được tick
	},
	checkboxText: {
		flex: 1,
	},
	forgotPasswordText: {
		color: "blue",
		marginRight: 50,
	},
	button: {
		width: "50%",
		backgroundColor: "rgb(245, 243, 227)",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 25,
		alignItems: "center",
		marginBottom: 10, // Add margin to separate buttons
	},
	buttonText: {
		color: "black",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	signupPrompt: {
		marginTop: 20,
	},
	signupText: {
		color: "blue",
	},
	orText: {
		marginTop: 20,
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
	socialIcon: {
		width: 30,
		height: 30,
		marginLeft: 10,
	},
});

export default LoginScreen;
