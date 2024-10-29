import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const VoucherScreen = ({ navigation }) => {
	const vouchers = [
		{
			id: 1,
			code: "VOUCHER10",
			discount: "10%",
			description: "Giảm giá 10% cho đơn hàng trên 100.000 VNĐ",
			expiryDate: "Hết hạn: 31/12/2024",
			isActive: true,
			type: "discount",
		},
		{
			id: 2,
			code: "VOUCHER50K",
			discount: "50.000",
			description: "Giảm giá 50.000 VNĐ cho đơn hàng từ 200.000 VNĐ",
			expiryDate: "Hết hạn: 15/11/2024",
			isActive: false,
			type: "discount",
		},
		{
			id: 3,
			code: "BIRTHDAYGIFT",
			discount: "100.000",
			description: "Voucher sinh nhật đặc biệt",
			expiryDate: "Hết hạn: 20/10/2024",
			isActive: true,
			type: "birthday",
		},
	];

	const getBackgroundColor = (type) => {
		switch (type) {
			case "discount":
				return "#99FFCC"; // Màu cho voucher giảm giá
			case "birthday":
				return "#FFE0B2"; // Màu cho voucher sinh nhật
			default:
				return "#FFF"; // Mặc định
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={vouchers}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View
						style={[
							styles.card,
							{ backgroundColor: getBackgroundColor(item.type) },
						]}
					>
						<View style={styles.cardContent}>
							<View style={styles.leftSection}>
								<Icon
									name="card-outline"
									size={40}
									color="#FF6B6B"
									style={styles.icon}
								/>
								<View style={styles.info}>
									<Text style={styles.code}>{item.code}</Text>
									<Text style={styles.description}>
										{item.description}
									</Text>
								</View>
							</View>
							<View style={styles.divider} />
							<View style={styles.rightSection}>
								<Text style={styles.discount}>
									{item.discount}
								</Text>
								<Text style={styles.expiryDate}>
									{item.expiryDate}
								</Text>
								{!item.isActive && (
									<Text style={styles.expiredLabel}>
										Hết hạn
									</Text>
								)}
								<TouchableOpacity
									style={[
										styles.applyButton,
										!item.isActive && styles.disabledButton,
									]}
									onPress={() => {
										if (item.isActive) {
											navigation.navigate("Booking", {
												voucher: item,
											});
										}
									}}
									disabled={!item.isActive}
								>
									<Text style={styles.applyButtonText}>
										Áp dụng
									</Text>
								</TouchableOpacity>
							</View>
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
		backgroundColor: "#FFFFFF",
		padding: 20,
	},
	card: {
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
	},
	cardContent: {
		flexDirection: "row",
	},
	leftSection: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginRight: 10,
	},
	info: {
		flex: 1,
	},
	code: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FF6B6B",
	},
	description: {
		fontSize: 14,
		color: "#666",
	},
	divider: {
		width: 2,
		backgroundColor: "#fff", // Đường kẻ thẳng
		marginHorizontal: 10,
	},
	rightSection: {
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	discount: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	expiryDate: {
		fontSize: 12,
		color: "#888",
		marginVertical: 5,
	},
	expiredLabel: {
		fontSize: 12,
		color: "#DC3545", // màu đỏ cho nhãn "Hết hạn"
		fontWeight: "bold",
	},
	applyButton: {
		backgroundColor: "#FF6B6B",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		marginTop: 10,
	},
	disabledButton: {
		backgroundColor: "#D3D3D3", // Màu cho nút khi vô hiệu hóa
	},
	applyButtonText: {
		color: "#FFF",
		fontWeight: "bold",
	},
});

export default VoucherScreen;
