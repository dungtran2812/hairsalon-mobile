import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useViewServiceQuery } from "../../services/hairsalon.service";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

const CardService = () => {
	const navigation = useNavigation();
	const { data: serviceInfo, error, isLoading } = useViewServiceQuery();

	// Handle loading and error states
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (error) {
		return <Text>Error: {error.message}</Text>;
	}

	return (
		<View style={styles.grid}>
			{serviceInfo?.services?.map((data, index) => (
				<View style={styles.container} key={index}>
					<View style={styles.card}>
						<Text style={styles.title}>{data.name}</Text>
						<View style={styles.imgBox}>
							<Image
								style={styles.img}
								source={{ uri: data.image }}
							/>
						</View>
						<View style={styles.lineTime}>
							<View style={styles.priceContainer}>
								<Text style={styles.priceText}>
									{data.price}
								</Text>
							</View>
							<View style={styles.loyaltyContainer}>
								<Text style={styles.loyalText}>
									{data.loyaltyPoints} Điểm
								</Text>
							</View>
						</View>
						<TouchableOpacity style={styles.button}>
							<Text
								style={styles.buttonText}
								onPress={() => navigation.navigate("Booking")}
							>
								Đặt lịch ngay !
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "50%",
		height: 300,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	card: {
		padding: 8,
		marginHorizontal: "auto",
		marginVertical: "auto",
		width: "94%",
		height: "94%",
		backgroundColor: "white",
		borderRadius: 15,
		shadowColor: "#5D3A29",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10,
	},
	title: {
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "center",
	},
	titlesub: {
		fontSize: 10,
		marginTop: 5,
	},
	imgBox: {
		marginTop: 10,
		width: "100%",
		height: "60%",
		backgroundColor: "#5D3A29",
		borderRadius: 15,
	},
	img: {
		margin: "auto",
		width: "92%",
		height: "90%",
		borderRadius: 10,
	},
	lineTime: {
		width: "100%",
		height: 19,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
		flexDirection: "row", // Đặt các phần tử nằm cùng hàng
		justifyContent: "space-between", // Căn chỉnh khoảng cách giữa giá và điểm
		alignItems: "center", // Căn giữa theo chiều dọc
	},
	priceContainer: {
		flex: 1, // Chiếm 50% chiều rộng
		alignItems: "flex-start", // Đặt giá bên trái
	},
	loyaltyContainer: {
		flex: 1, // Chiếm 50% chiều rộng
		alignItems: "flex-end", // Đặt điểm loyal bên phải
	},
	priceText: {
		fontSize: 15,
		textAlign: "left",
		fontWeight: "bold",
		height: 16,
		width: "98%",
		color: "#FF6B6B",
	},
	loyalText: {
		fontSize: 12,
		textAlign: "right",
		height: 16,
		width: "98%",
	},
	button: {
		width: "100%",
		height: 30,
		marginTop: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
		backgroundColor: "#5D3A29",
	},
	buttonText: {
		color: "#fff",
		fontSize: 13,
		fontWeight: "bold",
	},
});

export default CardService;
