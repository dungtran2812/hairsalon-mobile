import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	FlatList,
	Pressable,
} from "react-native";
import { useGetAppointmentUserQuery } from "../../services/hairsalon.service";

const ServiceHistoryScreen = ({ navigation }) => {
	const { data: appointments, isLoading, error } = useGetAppointmentUserQuery();

	if (isLoading) return <Text>Loading...</Text>;
	if (error) return <Text>Error loading appointments.</Text>;

	const getStatusStyle = (status) => {
		switch (status) {
			case "Completed":
				return { color: "#4CAF50" }; // Green
			case "Pending":
				return { color: "#FFC107" }; // Yellow
			case "Rejected":
				return { color: "#FF6347" }; // Red
			default:
				return { color: "#888" };
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={appointments.data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<View style={styles.dateTimeStatusContainer}>
							<Text style={styles.dateTime}>
								{new Date(item.appointmentDate).toLocaleDateString()} - {item.appointmentTime}
							</Text>
							<Text style={[styles.status, getStatusStyle(item.status)]}>
								{item.status.toUpperCase()}
							</Text>
						</View>
						<View style={styles.serviceDetails}>
							<View style={styles.info}>
								<Text style={styles.serviceName}>{item.services[0].name}</Text>
								<Text style={styles.stylist}>Stylist: {item.stylistId.name}</Text>
								<Text style={styles.price}>{item.totalPrice.toLocaleString()} VND</Text>
							</View>
						</View>
						<View style={styles.actions}>
							<Pressable
								style={styles.button}
								onPress={() => navigation.navigate("Booking", { serviceId: item._id })}
							>
								<Text style={styles.buttonText}>Book Again</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => navigation.navigate("FeedbackScreen", { serviceId: item._id })}
							>
								<Text style={styles.buttonText}>Feedback</Text>
							</Pressable>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FAF3E0",
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	card: {
		backgroundColor: "#FFF",
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
	},
	dateTimeStatusContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	dateTime: {
		fontSize: 12,
		color: "#888",
	},
	serviceDetails: {
		flexDirection: "row",
		marginTop: 10,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 5,
		marginRight: 10,
	},
	info: {
		flex: 1,
	},
	serviceName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	stylist: {
		fontSize: 14,
		color: "#666",
	},
	price: {
		fontSize: 14,
		color: "#333",
		marginTop: 5,
	},
	status: {
		fontSize: 12,
		fontWeight: "bold",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	button: {
		paddingVertical: 6,
		paddingHorizontal: 15,
		backgroundColor: "#FF6B6B",
		borderRadius: 5,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 14,
	},
});

export default ServiceHistoryScreen;
