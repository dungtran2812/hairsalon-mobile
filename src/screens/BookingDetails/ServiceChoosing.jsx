// src/screens/BookingDetails/ServiceChoosing.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from "react-native";

const services = [
	{ id: "1", name: "Haircut", price: "$25" },
	{ id: "2", name: "Hair Coloring", price: "$40" },
	{ id: "3", name: "Shave", price: "$15" },
	{ id: "4", name: "Facial", price: "$30" },
];

const ServiceChoosing = ({ navigation }) => {
	const handleSelectService = (service) => {
		// Navigate to booking confirmation or details screen
		navigation.navigate("BookingConfirmation", { service });
	};

	const renderService = ({ item }) => (
		<TouchableOpacity style={styles.serviceItem} onPress={() => handleSelectService(item)}>
			<Text style={styles.serviceName}>{item.name}</Text>
			<Text style={styles.servicePrice}>{item.price}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose a Service</Text>
			<FlatList
				data={services}
				renderItem={renderService}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/>
			<Button
        title="Confirm choose Service:"
        onPress={() => navigation.navigate('Booking')}
      />
		</View>
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
	},
	serviceItem: {
		padding: 15,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	serviceName: {
		fontSize: 18,
	},
	servicePrice: {
		fontSize: 18,
		color: "green",
	},
});

export default ServiceChoosing;
