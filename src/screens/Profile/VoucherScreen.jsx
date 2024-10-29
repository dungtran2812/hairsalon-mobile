// VoucherScreen.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const VoucherScreen = () => {
	const vouchers = [
		{
			id: 1,
			image: "https://example.com/voucher1.jpg", // Thay thế bằng URL hình ảnh thật
			code: "VOUCHER10",
			discount: "10%",
			description: "Giảm giá 10% cho đơn hàng trên 100.000 VNĐ",
			expiryDate: "Hết hạn: 31/12/2024",
			isActive: true,
			type: "discount", // Loại voucher
		},
		{
			id: 2,
			image: "https://example.com/voucher2.jpg",
			code: "VOUCHER50K",
			discount: "50.000",
			description: "Giảm giá 50.000 VNĐ cho đơn hàng từ 200.000 VNĐ",
			expiryDate: "Hết hạn: 15/11/2024",
			isActive: false,
			type: "discount",
		},
		{
			id: 3,
			image: "https://example.com/voucher3.jpg",
			code: "BIRTHDAYGIFT",
			discount: "100.000 VNĐ",
			description: "Voucher sinh nhật đặc biệt",
			expiryDate: "Hết hạn: 20/10/2024",
			isActive: true,
			type: "birthday", // Loại voucher
		},
	];

	const getBackgroundColor = (type) => {
		switch (type) {
			case "discount":
				return "#E0F7FA"; // Màu cho voucher giảm giá
			case "birthday":
				return "#FFF3E0"; // Màu cho voucher sinh nhật
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
								<Image
									source={{ uri: item.image }}
									style={styles.image}
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
								<Text
									style={[
										styles.status,
										item.isActive
											? styles.active
											: styles.expired,
									]}
								>
									{item.isActive
										? "Còn hiệu lực"
										: "Đã hết hạn"}
								</Text>
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
		backgroundColor: "#F5F5F5",
		padding: 20,
	},
	card: {
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
	},
	cardContent: {
		flexDirection: "row",
	},
	leftSection: {
		flex: 1,
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
		width: 1,
		backgroundColor: "#FFF", // Đường kẻ trắng
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
	status: {
		fontSize: 12,
		fontWeight: "bold",
	},
	active: {
		color: "#28A745", // xanh cho voucher còn hiệu lực
	},
	expired: {
		color: "#DC3545", // đỏ cho voucher đã hết hạn
	},
});

export default VoucherScreen;
