import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import CheckBox from "expo-checkbox"; // Sử dụng expo-checkbox

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
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	return (
		<View style={{ padding: 20 }}>
			<Text>Full Name</Text>
			<TextInput value={fullName} onChangeText={setFullName} />
			<Text>Email</Text>
			<TextInput value={email} onChangeText={setEmail} />
			<Text>Gender</Text>
			<TextInput value={gender} onChangeText={setGender} />
			<Text>Password</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Text>Confirm Password</Text>
			<TextInput
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<CheckBox
					value={policyConfirmed}
					onValueChange={setPolicyConfirmed}
				/>
				<Text>I agree to the policy</Text>
			</View>
			<Button title="Sign Up" onPress={handleSignup} />
		</View>
	);
};

export default SignupScreen;
