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
import setUpInterceptor from "../src/services/api.service";
import VoucherChoosing from "../src/screens/BookingDetails/VoucherChoosing";
import { Pressable, Text } from "react-native";

const Stack = createStackNavigator();

export default function App() {
	setUpInterceptor(store)
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
							name="VoucherChoosing"
							component={VoucherChoosing}
							options={{
								headerShown: true, // Ensure the header is displayed
								headerBackTitle: 'Custom Back',
								headerBackTitleStyle: { fontSize: 30 },
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
