import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthIntroScreen from "../src/auth/AuthIntroScreen";
import LoginScreen from "../src/auth/LoginScreen";
import SignupScreen from "../src/auth/SignupScreen";
import StylistScreen from "../src/screens/StylistScreen";
import BottomTabNavigator from "../src/navigation/BottomTabNavigator";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../src/store/store";
import { Provider } from "react-redux";
import ServiceChoosing from "../src/screens/BookingDetails/ServiceChoosing";

const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
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
							name="ServiceScreen"
							component={BottomTabNavigator} // Điều hướng tới BottomTabNavigator
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ServiceChoosing"
							component={ServiceChoosing} // Điều hướng tới BottomTabNavigator
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
