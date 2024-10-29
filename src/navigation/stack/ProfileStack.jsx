import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/ProfileScreen";
import EditInfoScreen from "../../screens/Profile/EditInfoScreen";
import FavoriteServicesScreen from "../../screens/Profile/FavoriteServicesScreen";
import ServiceHistoryScreen from "../../screens/Profile/ServiceHistoryScreen";
import CustomerSupportScreen from "../../screens/Profile/CustomerSupportScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="EditInfo" component={EditInfoScreen} />
			<Stack.Screen
				name="FavoriteServices"
				component={FavoriteServicesScreen}
			/>
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
