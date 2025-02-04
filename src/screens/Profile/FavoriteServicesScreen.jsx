import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const FavoriteServicesScreen = () => {
	const services = [
		{
			name: "Cắt",
			price: "200.000 VNĐ",
			loyaltyPoints: 20,
			image: "https://i.pinimg.com/564x/2e/8f/b7/2e8fb73b998bd3a099fcecc012b493b0.jpg", // replace with actual image URL
		},
		{
			name: "Duỗi",
			price: "300.000 VNĐ",
			loyaltyPoints: 30,
			image: "https://i.pinimg.com/564x/7a/55/89/7a5589c3232c01bb132ad57d39cc5a5b.jpg", // replace with actual image URL
		},
		{
			name: "Nhuộm",
			price: "250.000 VNĐ",
			loyaltyPoints: 25,
			image: "https://i.pinimg.com/564x/c3/e9/69/c3e9698616b9146df2663f9caecf6362.jpg", // replace with actual image URL
		},
	];

	return (
		<View style={styles.container}>
			{services.map((service, index) => (
				<View key={index} style={styles.serviceCard}>
					{/* Image with overlay */}
					<View style={styles.imageContainer}>
						<Image
							source={{ uri: service.image }}
							style={styles.image}
						/>
						<View style={styles.overlay} />
						<Text style={styles.serviceName}>{service.name}</Text>
						<Text style={styles.servicePrice}>{service.price}</Text>
						<Text style={styles.loyaltyPoints}>
							{service.loyaltyPoints} Loyalty Points
						</Text>
						<Pressable
							style={({ pressed }) => [
								styles.favoriteIcon,
								{ opacity: pressed ? 0.5 : 1 },
							]}
						>
							<Text style={styles.heart}>❤️</Text>
						</Pressable>
					</View>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		padding: 20,
	},
	serviceCard: {
		marginBottom: 20,
	},
	imageContainer: {
		position: "relative",
		borderRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 10,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay
		justifyContent: "center",
		alignItems: "center",
	},
	serviceName: {
		color: "#FFF",
		fontSize: 18,
		fontWeight: "bold",
		position: "absolute",
		top: 10,
		left: 10,
	},
	servicePrice: {
		color: "#FFF",
		fontSize: 16,
		position: "absolute",
		bottom: 30,
		left: 10,
	},
	loyaltyPoints: {
		color: "#FFF",
		fontSize: 14,
		position: "absolute",
		bottom: 10,
		left: 10,
	},
	favoriteIcon: {
		position: "absolute",
		top: 10,
		right: 10,
	},
	heart: {
		fontSize: 20,
	},
});

export default FavoriteServicesScreen;
