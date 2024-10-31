import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const FavoriteStylistScreen = () => {
	const stylists = [
		{
			name: "Nguyễn Văn A",
			experience: 5,
			specialty: "Cắt tóc nam",
			likes: 150,
			feedbackCount: 45,
			avatar: "https://i.pinimg.com/564x/e3/24/f7/e324f790cfe0a51d76f98356475cc408.jpg", // replace with actual image URL
		},
		{
			name: "Trần Thị B",
			experience: 8,
			specialty: "Nhuộm tóc",
			likes: 200,
			feedbackCount: 120,
			avatar: "https://i.pinimg.com/564x/a6/38/c0/a638c0b8de2d236ec881cc21b81f3c39.jpg", // replace with actual image URL
		},
		{
			name: "Lê C",
			experience: 10,
			specialty: "Duỗi tóc",
			likes: 250,
			feedbackCount: 75,
			avatar: "https://i.pinimg.com/564x/c8/cc/68/c8cc6816a2448d0a03a5e46e932ce7a9.jpg", // replace with actual image URL
		},
	];

	return (
		<View style={styles.container}>
			{stylists.map((stylist, index) => (
				<View key={index} style={styles.card}>
					<Image
						source={{ uri: stylist.avatar }}
						style={styles.avatar}
					/>
					<View style={styles.infoContainer}>
						<Text style={styles.name}>{stylist.name}</Text>
						<Text style={styles.experience}>
							{stylist.experience} năm kinh nghiệm
						</Text>
						<Text style={styles.specialty}>
							Chuyên môn: {stylist.specialty}
						</Text>
						<View style={styles.bottomInfo}>
							<Text style={styles.likes}>
								{stylist.likes} lượt yêu thích
							</Text>
							<Text style={styles.feedback}>
								{stylist.feedbackCount} feedback
							</Text>
						</View>
					</View>
					<Pressable
						style={({ pressed }) => [
							styles.heartIcon,
							{ opacity: pressed ? 0.5 : 1 },
						]}
					>
						<Text style={styles.heart}>❤️</Text>
					</Pressable>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FAF3E0",
		padding: 20,
	},
	card: {
		flexDirection: "row",
		backgroundColor: "#FFF",
		borderColor: "#ccc",
		borderWidth: 1, // Added border width
		borderRadius: 10,
		marginBottom: 15,
		overflow: "hidden",
	},
	avatar: {
		width: 100, // Adjust width as needed
		height: "100%",
	},
	infoContainer: {
		flex: 1,
		padding: 15,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	experience: {
		fontSize: 14,
		color: "#666",
		marginVertical: 3,
	},
	specialty: {
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	bottomInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	likes: {
		fontSize: 14,
		color: "#333",
	},
	feedback: {
		fontSize: 14,
		color: "#333",
	},
	heartIcon: {
		position: "absolute",
		top: 10,
		right: 10,
	},
	heart: {
		fontSize: 20,
		color: "#FF6B6B",
	},
});

export default FavoriteStylistScreen;
