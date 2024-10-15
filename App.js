import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthIntroScreen from "../auth/AuthIntroScreen";
import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="AuthIntroScreen">
				<Stack.Screen
					name="AuthIntroScreen"
					component={AuthIntroScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
