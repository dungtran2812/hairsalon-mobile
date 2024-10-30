import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/ServiceScreen";
import StylistScreen from "../screens/StylistScreen"; // Thêm màn hình Stylist
import BookingScreen from "../screens/BookingScreen";
import VoucherScreen from "../screens/VoucherScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
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
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Voucher") {
              iconName = focused ? "pricetag" : "pricetag-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "rgb(97, 70, 59)",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Service" component={ServiceScreen} />
        <Tab.Screen name="Stylist" component={StylistScreen} />
        <Tab.Screen name="Booking" component={BookingScreen} />
        <Tab.Screen name="Voucher" component={VoucherScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
