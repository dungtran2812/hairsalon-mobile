import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert, ScrollView } from "react-native";

const services = [
	{ id: "1", name: "Haircut", price: "$25" },
	{ id: "2", name: "Hair Coloring", price: "$40" },
	{ id: "3", name: "Shave", price: "$15" },
	{ id: "4", name: "Facial", price: "$30" },
];

const stylists = [
	{ id: "1", name: "Stylist A" },
	{ id: "2", name: "Stylist B" },
	{ id: "3", name: "Stylist C" },
];

const timeSlots = [
	{ id: "1", time: "10:00 AM" },
	{ id: "2", time: "11:00 AM" },
	{ id: "3", time: "12:00 PM" },
	{ id: "4", time: "1:00 PM" },
];

const paymentOptions = [
	{ id: "1", method: "Credit Card" },
	{ id: "2", method: "Cash" },
	{ id: "3", method: "PayPal" },
];

const BookingScreen = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [selectedStylist, setSelectedStylist] = useState(null);
	const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
	const navigation = useNavigation()

	const handleBooking = () => {
		if (!selectedService || !selectedStylist || !selectedTimeSlot || !selectedPaymentMethod) {
			Alert.alert("Error", "Please fill in all fields to proceed with the booking.");
			return;
		}

		// Proceed with booking logic
		Alert.alert("Booking Confirmed", `You have booked ${selectedService} with ${selectedStylist} at ${selectedTimeSlot} using ${selectedPaymentMethod}.`);
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Welcome to the Booking Screen</Text>

			<Text style={styles.label}>Choose a Service:</Text>
			
			<Button
        title="Choose a Service:"
        onPress={() => navigation.navigate('ServiceChoosing')}
      />

			<Text style={styles.label}>Choose a Stylist:</Text>

			<Text style={styles.label}>Choose a Time Slot:</Text>
			<FlatList
				data={timeSlots}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.timeSlotItem,
							selectedTimeSlot === item.time && styles.selectedTimeSlot,
						]}
						onPress={() => setSelectedTimeSlot(item.time)}
					>
						<Text style={styles.timeSlotText}>{item.time}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>

			<Text style={styles.label}>Choose a Payment Method:</Text>
			{/* <Picker
				selectedValue={selectedPaymentMethod}
				onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
				style={styles.picker}
			>
				<Picker.Item label="Select a payment method" value={null} />
				{paymentOptions.map((option) => (
					<Picker.Item key={option.id} label={option.method} value={option.method} />
				))}
			</Picker> */}

			<Button title="Confirm Booking" onPress={handleBooking} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	label: {
		fontSize: 18,
		marginVertical: 10,
	},
	picker: {
		height: 50,
		width: "100%",
	},
	timeSlotItem: {
		padding: 15,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginVertical: 5,
	},
	selectedTimeSlot: {
		backgroundColor: "#d1e7dd",
	},
	timeSlotText: {
		fontSize: 16,
	},
});

export default BookingScreen;
