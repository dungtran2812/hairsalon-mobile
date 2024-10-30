import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/ServiceScreen/ServiceScreen";
import StylistScreen from "../screens/StylistScreen";
import BookingScreen from "../screens/BookingScreen";
import VoucherScreen from "../screens/VoucherScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfileStack from "./stack/ProfileStack";

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

						let iconSize = focused ? 28 : 24; // Tăng kích thước cho biểu tượng khi được chọn
						return (
							<Icon
								name={iconName}
								size={iconSize}
								color={color}
							/>
						);
					},
					tabBarActiveTintColor: "#5D3A29",
					tabBarInactiveTintColor: "gray",
					tabBarStyle: {
						backgroundColor: "#FAF3E0",
						borderTopWidth: 0,
						elevation: 5,
						height: 60,
						borderRadius: 15,
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 0,
					},
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
				<Tab.Screen
					name="Booking"
					component={BookingScreen}
					options={{ headerShown: false }}
				/>
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
