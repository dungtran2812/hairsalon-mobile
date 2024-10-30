import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceScreen from "../../screens/ServiceScreen/ServiceScreen";
import CommitmentScreen from "../../screens/ServiceScreen/CommitmentScreen"; // Đảm bảo import đúng đường dẫn

const Stack = createNativeStackNavigator();

const ServiceStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Service" component={ServiceScreen} />
			<Stack.Screen name="Commitment" component={CommitmentScreen} />
			{/* Thêm các màn hình khác nếu cần */}
		</Stack.Navigator>
	);
};

export default ServiceStack;
