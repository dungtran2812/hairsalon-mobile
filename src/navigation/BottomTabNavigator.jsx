import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ServiceScreen from "../screens/ServiceScreen";
import BookingScreen from "../screens/BookingScreen";
import VoucherScreen from "../screens/VoucherScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons"; // Dùng Ionicons từ react-native-vector-icons
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<SafeAreaProvider >
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === "Home") {
								iconName = focused ? "home" : "home-outline";
							} else if (route.name === "Service") {
								iconName = focused ? "construct" : "construct-outline";
							} else if (route.name === "Booking") {
								iconName = focused ? "calendar" : "calendar-outline";
							} else if (route.name === "Voucher") {
								iconName = focused ? "pricetag" : "pricetag-outline";
							} else if (route.name === "Profile") {
								iconName = focused ? "person" : "person-outline";
							}

							// Return the icon component
							return <Icon name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: "rgb(97, 70, 59)", // Màu icon khi được chọn
						tabBarInactiveTintColor: "gray", // Màu icon khi không được chọn
					})}
				>
					<Tab.Screen name="Home" component={HomeScreen} />
					<Tab.Screen name="Service" component={ServiceScreen} />
					<Tab.Screen name="Booking" component={BookingScreen} />
					<Tab.Screen name="Voucher" component={VoucherScreen} />
					<Tab.Screen name="Profile" component={ProfileScreen} />
				</Tab.Navigator>
		</SafeAreaProvider>
	);
}
