import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "../../screens/BookingScreen";
import VoucherChoosing from "../../screens/BookingDetails/VoucherChoosing";

const Stack = createNativeStackNavigator();

const BookingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingStack"
        component={BookingScreen}
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
  );
};

export default BookingStack;
