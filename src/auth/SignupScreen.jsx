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
	const [secureTextEntry, setSecureTextEntry] = useState(true); // Để kiểm soát việc hiển thị mật khẩu
	const [agreeToPolicy, setAgreeToPolicy] = useState(false); // Kiểm soát trạng thái checkbox
	const isSignupDisabled =
		!fullName ||
		!username ||
		!email ||
		!password ||
		!confirmPassword ||
		!agreeToPolicy; // Kiểm tra xem nút đăng ký có bị vô hiệu hóa không

	const handleSignup = () => {
		if (!fullName || !username || !email || !password || !confirmPassword) {
			alert("Please fill in all fields.");
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		if (!agreeToPolicy) {
			alert("Please agree to the Privacy Policy and Terms of Use.");
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
					}} // Logo tạm thời
					style={styles.logo}
				/>
			</View>
			<Text style={styles.welcomeText}>Create Account</Text>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/user.png",
					}} // Biểu tượng tên
					style={styles.icon}
				/>
				<TextInput
					placeholder="Full Name"
					value={fullName}
					onChangeText={setFullName}
					style={styles.input}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/user.png",
					}} // Biểu tượng tên người dùng
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
					}} // Biểu tượng email
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

			<View style={styles.inputContainer}>
				<Image
					source={{
						uri: "https://img.icons8.com/material-outlined/24/000000/lock-2.png",
					}} // Biểu tượng mật khẩu
					style={styles.icon}
				/>
				<TextInput
					placeholder="Confirm Password"
					secureTextEntry={secureTextEntry}
					value={confirmPassword}
					onChangeText={setConfirmPassword}
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
					onPress={toggleAgreeToPolicy}
					style={styles.checkbox}
				>
					{agreeToPolicy && <View style={styles.checkedCheckbox} />}
				</TouchableOpacity>
				<Text style={styles.checkboxText}>
					I agree to Privacy Policy and Terms of Use
				</Text>
			</View>

			<Pressable
				style={({ pressed }) => [
					styles.button,
					{
						backgroundColor: pressed
							? "rgb(97, 70, 59)" // Background color when pressed
							: isSignupDisabled
							? "#ccc" // Background color when disabled
							: "rgb(245, 243, 227)", // Normal background color
					},
				]}
				onPress={handleSignup}
				disabled={isSignupDisabled} // Disable the button when the form is incomplete
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
						Create Account
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
		marginVertical: 10,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	checkedCheckbox: {
		width: 16,
		height: 16,
		backgroundColor: "rgb(97, 70, 59)",
	},
	checkboxText: {
		fontSize: 14,
		color: "#333",
	},
	button: {
		width: "100%",
		padding: 15,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	loginPrompt: {
		fontSize: 14,
		color: "#333",
		marginVertical: 10,
	},
	loginText: {
		color: "rgb(97, 70, 59)",
		fontWeight: "bold",
	},
	orText: {
		marginVertical: 10,
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
