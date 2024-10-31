import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ChangePasswordScreen = () => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const validatePassword = () => {
		if (!newPassword || !confirmPassword) {
			setError("Không được bỏ trống");
			return false;
		}
		if (newPassword.includes(" ") || confirmPassword.includes(" ")) {
			setError("Mật khẩu không được chứa khoảng trắng");
			return false;
		}
		if (newPassword !== confirmPassword) {
			setError("Mật khẩu không khớp");
			return false;
		}
		setError("");
		return true;
	};

	const handleChangePassword = () => {
		if (validatePassword()) {
			Alert.alert("Thành công", "Mật khẩu đã được thay đổi");
			// Thêm logic cập nhật mật khẩu vào đây
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Mật khẩu mới</Text>
			<View style={styles.inputContainer}>
				<Icon
					name="lock-closed-outline"
					size={20}
					color="#5D3A29"
					style={styles.icon}
				/>
				<TextInput
					style={styles.input}
					secureTextEntry={!showNewPassword}
					placeholder="Nhập mật khẩu mới"
					value={newPassword}
					onChangeText={setNewPassword}
				/>
				<TouchableOpacity
					onPress={() => setShowNewPassword(!showNewPassword)}
				>
					<Icon
						name={
							showNewPassword ? "eye-off-outline" : "eye-outline"
						}
						size={20}
						color="#5D3A29"
					/>
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>Xác nhận mật khẩu</Text>
			<View style={styles.inputContainer}>
				<Icon
					name="lock-closed-outline"
					size={20}
					color="#5D3A29"
					style={styles.icon}
				/>
				<TextInput
					style={styles.input}
					secureTextEntry={!showConfirmPassword}
					placeholder="Xác nhận mật khẩu mới"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
				/>
				<TouchableOpacity
					onPress={() => setShowConfirmPassword(!showConfirmPassword)}
				>
					<Icon
						name={
							showConfirmPassword
								? "eye-off-outline"
								: "eye-outline"
						}
						size={20}
						color="#5D3A29"
					/>
				</TouchableOpacity>
			</View>

			{error ? <Text style={styles.errorText}>{error}</Text> : null}
			<TouchableOpacity
				style={styles.button}
				onPress={handleChangePassword}
			>
				<Text style={styles.buttonText}>Đổi mật khẩu</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#FAF3E0",
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: "#5D3A29",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#D3D3D3",
		borderRadius: 20,
		paddingHorizontal: 10,
		marginBottom: 15,
		backgroundColor: "#FFFFFF",
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		paddingVertical: 10,
		color: "#5D3A29",
	},
	errorText: {
		color: "#FF6B6B",
		marginBottom: 15,
	},
	button: {
		backgroundColor: "#5D3A29",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default ChangePasswordScreen;
