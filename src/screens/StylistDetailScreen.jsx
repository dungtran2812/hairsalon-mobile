import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useAddFavoriteStylistMutation } from "../services/hairsalon.service";

const StylistDetailScreen = ({ route }) => {
	const navigation = useNavigation();
	const { stylist } = route.params;
	const [addFavoriteStylist] = useAddFavoriteStylistMutation();
	const [isFavorited, setIsFavorited] = useState(false);

	const handleBooking = () => {
		navigation.navigate("Booking");
	};

	const toggleFavorite = async () => {
		try {
			if (!isFavorited) {
				await addFavoriteStylist({
					stylistEmail: stylist.email,
				}).unwrap();
				setIsFavorited(true);
				console.log(`${stylist.name} added to favorites.`);
			} else {
				console.log(`${stylist.name} is already in favorites.`);
			}
		} catch (error) {
			console.error("Failed to add favorite stylist:", error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-left" size={24} color="#fff" />
				</TouchableOpacity>
				<Image source={{ uri: stylist.avatar }} style={styles.avatar} />
			</View>
			<Text style={styles.name}>{stylist.name}</Text>
			<Text style={styles.email}>Email: {stylist.email}</Text>

			{/* Add to favorites button */}
			<TouchableOpacity
				style={styles.favoriteButton}
				onPress={toggleFavorite}
			>
				<Icon
					name="heart"
					size={20}
					color={isFavorited ? "red" : "#ccc"}
				/>
				<Text style={styles.favoriteButtonText}>
					{isFavorited ? "Hủy yêu thích" : "Thêm vào yêu thích"}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.bookingButton}
				onPress={handleBooking}
			>
				<Text style={styles.bookingButtonText}>Đặt Ngay</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#FAF3E0",
	},
	imageContainer: {
		position: "relative",
	},
	avatar: {
		width: "100%",
		height: 400,
		borderRadius: 15,
		marginBottom: 10,
	},
	backButton: {
		position: "absolute",
		top: 16,
		left: 16,
		zIndex: 1,
		padding: 8,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		borderRadius: 25,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	email: {
		fontSize: 16,
		color: "#666",
		marginBottom: 10,
	},
	favoriteButton: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	favoriteButtonText: {
		marginLeft: 8,
		fontSize: 16,
		color: "#444",
	},
	bookingButton: {
		backgroundColor: "rgb(97, 70, 59)",
		padding: 16,
		borderRadius: 25,
		alignItems: "center",
		marginTop: 20,
	},
	bookingButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default StylistDetailScreen;
