import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/ProfileScreen";
import EditInfoScreen from "../../screens/Profile/EditInfoScreen";
import ChangePasswordScreen from "../../screens/Profile/ChangePasswordScreen";
import FavoriteStylistScreen from "../../screens/Profile/FavoriteStylistScreen";
import ServiceHistoryScreen from "../../screens/Profile/ServiceHistoryScreen";
import CustomerSupportScreen from "../../screens/Profile/CustomerSupportScreen";
import MyVoucherScreen from "../../screens/Profile/MyVoucherScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#5D3A29", // màu nâu cho header
				},
				headerTintColor: "#FAF3E0", // màu kem nhạt cho chữ header
				headerTitleStyle: {
					fontWeight: "bold",
				},
				contentStyle: {
					backgroundColor: "#FAF3E0", // màu nền kem nhạt cho các trang
				},
			}}
		>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="EditInfo" component={EditInfoScreen} />
			<Stack.Screen
				name="ChangePassword"
				component={ChangePasswordScreen}
			/>
			<Stack.Screen
				name="FavoriteStylist"
				component={FavoriteStylistScreen}
			/>
			<Stack.Screen name="Voucher" component={MyVoucherScreen} />
			<Stack.Screen
				name="ServiceHistory"
				component={ServiceHistoryScreen}
			/>
			<Stack.Screen
				name="CustomerSupport"
				component={CustomerSupportScreen}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStack;
