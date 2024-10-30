import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/ServiceScreen/ServiceScreen";
import StylistScreen from "../screens/StylistScreen"; // Thêm màn hình Stylist
import BookingScreen from "../screens/BookingScreen";
import VoucherScreen from "../screens/VoucherScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfileStack from "./stack/ProfileStack";
import BookingStack from "./stack/BookingStack";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<SafeAreaProvider>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Service") {
							iconName = focused ? "cut" : "cut-outline";
						} else if (route.name === "Stylist") {
							iconName = focused ? "people" : "people-outline";
						} else if (route.name === "Booking") {
							iconName = focused
								? "calendar"
								: "calendar-outline";
						} else if (route.name === "Voucher") {
							iconName = focused
								? "pricetag"
								: "pricetag-outline";
						} else if (route.name === "Profile") {
							iconName = focused
								? "person-circle"
								: "person-circle-outline";
						}

						return (
							<Icon name={iconName} size={size} color={color} />
						);
					},
					tabBarActiveTintColor: "rgb(97, 70, 59)",
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen
					name="Service"
					component={ServiceScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name="Stylist"
					component={StylistScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen name="Booking" component={BookingStack} />
				<Tab.Screen
					name="Voucher"
					component={VoucherScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfileStack}
					options={{ headerShown: false }}
				/>
			</Tab.Navigator>
		</SafeAreaProvider>
	);
}
