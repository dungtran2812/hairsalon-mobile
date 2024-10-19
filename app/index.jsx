import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthIntroScreen from "../auth/AuthIntroScreen";
import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="AuthIntroScreen">
				<Stack.Screen
					name="AuthIntroScreen"
					component={AuthIntroScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Signup"
					component={SignupScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="HomeScreen"
					component={BottomTabNavigator} // Điều hướng tới BottomTabNavigator
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
