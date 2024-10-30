import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	FlatList,
	Pressable,
} from "react-native";

const ServiceHistoryScreen = ({ navigation }) => {
	const appointments = [
		{
			id: 1,
			month: "October 2024",
			date: "2024-10-15",
			time: "14:30",
			name: "Cắt tóc",
			stylist: "Nguyễn Văn A",
			price: "200.000 VNĐ",
			loyaltyPoints: 20,
			image: "https://i.pinimg.com/564x/2e/8f/b7/2e8fb73b998bd3a099fcecc012b493b0.jpg",
			status: "Completed",
		},
		{
			id: 2,
			month: "October 2024",
			date: "2024-10-08",
			time: "10:00",
			name: "Nhuộm tóc",
			stylist: "Trần Thị B",
			price: "300.000 VNĐ",
			loyaltyPoints: 30,
			image: "https://i.pinimg.com/564x/c3/e9/69/c3e9698616b9146df2663f9caecf6362.jpg",
			status: "Pending",
		},
		{
			id: 3,
			month: "August 2024",
			date: "2024-08-20",
			time: "09:15",
			name: "Duỗi tóc",
			stylist: "Lê C",
			price: "250.000 VNĐ",
			loyaltyPoints: 25,
			image: "https://i.pinimg.com/564x/7a/55/89/7a5589c3232c01bb132ad57d39cc5a5b.jpg",
			status: "Canceled",
		},
	];

	const groupedAppointments = appointments.reduce((acc, appointment) => {
		if (!acc[appointment.month]) acc[appointment.month] = [];
		acc[appointment.month].push(appointment);
		return acc;
	}, {});

	const getStatusStyle = (status) => {
		switch (status) {
			case "Completed":
				return { color: "#4CAF50" }; // xanh
			case "Pending":
				return { color: "#FFC107" }; // vàng
			case "Canceled":
				return { color: "#FF6347" }; // đỏ
			default:
				return { color: "#888" };
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.timelineLine} />
			<FlatList
				data={Object.entries(groupedAppointments)}
				keyExtractor={([month]) => month}
				renderItem={({ item: [month, monthAppointments] }) => (
					<View style={styles.monthSection}>
						<View style={styles.monthHeaderContainer}>
							<Text style={styles.monthHeader}>{month}</Text>
						</View>
						{monthAppointments.map((appointment) => (
							<View key={appointment.id} style={styles.card}>
								<View style={styles.dateTimeStatusContainer}>
									<Text style={styles.dateTime}>
										{appointment.date} - {appointment.time}
									</Text>
									<Text
										style={[
											styles.status,
											getStatusStyle(appointment.status),
										]}
									>
										{appointment.status.toUpperCase()}
									</Text>
								</View>
								<View style={styles.serviceDetails}>
									<Image
										source={{ uri: appointment.image }}
										style={styles.image}
									/>
									<View style={styles.info}>
										<Text style={styles.serviceName}>
											{appointment.name}
										</Text>
										<Text style={styles.stylist}>
											Stylist: {appointment.stylist}
										</Text>
										<Text style={styles.price}>
											{appointment.price}
										</Text>
										<Text style={styles.loyaltyPoints}>
											+{appointment.loyaltyPoints} điểm
										</Text>
									</View>
								</View>
								<View style={styles.actions}>
									<Pressable
										style={styles.button}
										onPress={() =>
											navigation.navigate(
												"BookingScreen",
												{
													serviceId: appointment.id,
												}
											)
										}
									>
										<Text style={styles.buttonText}>
											Book Again
										</Text>
									</Pressable>
									<Pressable
										style={styles.button}
										onPress={() =>
											navigation.navigate(
												"FeedbackScreen",
												{ serviceId: appointment.id }
											)
										}
									>
										<Text style={styles.buttonText}>
											Feedback
										</Text>
									</Pressable>
								</View>
							</View>
						))}
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	timelineLine: {
		position: "absolute",
		top: 0,
		left: 25,
		width: 2,
		height: "100%",
		backgroundColor: "#ccc",
	},
	monthSection: {
		marginBottom: 20,
	},
	monthHeaderContainer: {
		marginLeft: 40,
		marginBottom: 10,
	},
	monthHeader: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
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
		marginLeft: 40,
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
	loyaltyPoints: {
		fontSize: 14,
		color: "#FFD700",
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
