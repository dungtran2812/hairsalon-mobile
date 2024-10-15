// screens/RegisterScreen.jsx
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	CheckBox,
	StyleSheet,
} from "react-native";

export default function RegisterScreen({ navigation }) {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Đăng ký</Text>
			<TextInput
				style={styles.input}
				placeholder="Fullname"
				value={fullname}
				onChangeText={setFullname}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			<View style={styles.checkboxContainer}>
				<CheckBox value={isChecked} onValueChange={setIsChecked} />
				<Text>Tôi đồng ý với điều khoản sử dụng</Text>
			</View>
			<Button
				title="Đăng ký"
				onPress={() => navigation.replace("HomeScreen")}
				disabled={!isChecked || password !== confirmPassword}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", padding: 20 },
	title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
	input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
});
