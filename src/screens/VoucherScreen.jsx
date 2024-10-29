import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	ScrollView,
} from "react-native";

const vouchers = [
	{
		id: 1,
		code: "WELCOME50",
		discount: "50.000",
		description: "Voucher cho lần đặt dịch vụ đầu tiên",
		expiryDate: "Hết hạn: 30/12/2024",
		isActive: true,
		type: "main service",
	},
	{
		id: 2,
		code: "TET2024",
		discount: "100.000",
		description: "Khuyến mãi Tết đặc biệt",
		expiryDate: "Hết hạn: 10/02/2024",
		isActive: true,
		type: "holiday",
	},
	{
		id: 3,
		code: "SUMMERFUN",
		discount: "150.000",
		description: "Ưu đãi mùa hè",
		expiryDate: "Hết hạn: 01/07/2024",
		isActive: true,
		type: "event",
	},
	{
		id: 4,
		code: "BIRTHDAYGIFT",
		discount: "200.000",
		description: "Voucher sinh nhật đặc biệt",
		expiryDate: "Hết hạn: 20/10/2024",
		isActive: true,
		type: "birthday",
	},
	{
		id: 5,
		code: "WOMENDAY",
		discount: "120.000",
		description: "Khuyến mãi Ngày Phụ Nữ 8/3",
		expiryDate: "Hết hạn: 08/03/2024",
		isActive: true,
		type: "holiday",
	},
	{
		id: 6,
		code: "BLACKFRIDAY",
		discount: "180.000",
		description: "Ưu đãi đặc biệt Black Friday",
		expiryDate: "Hết hạn: 25/11/2024",
		isActive: true,
		type: "event",
	},
	{
		id: 7,
		code: "LOYALTY20",
		discount: "20.000",
		description: "Voucher khách hàng thân thiết",
		expiryDate: "Hết hạn: 31/12/2024",
		isActive: true,
		type: "main service",
	},
	{
		id: 8,
		code: "NEWYEAR",
		discount: "250.000",
		description: "Ưu đãi Tết Dương Lịch",
		expiryDate: "Hết hạn: 01/01/2025",
		isActive: true,
		type: "holiday",
	},
];

const VoucherScreen = ({ navigation }) => {
	const [claimedVouchers, setClaimedVouchers] = useState([]);

	const groupedVouchers = vouchers.reduce((acc, voucher) => {
		if (!acc[voucher.type]) acc[voucher.type] = [];
		acc[voucher.type].push(voucher);
		return acc;
	}, {});

	const handleClaimVoucher = (voucherId) => {
		setClaimedVouchers([...claimedVouchers, voucherId]);
		navigation.navigate("MyVoucherScreen", { voucherId });
	};

	const renderVoucher = (voucher) => {
		const isClaimed = claimedVouchers.includes(voucher.id);

		return (
			<View
				key={voucher.id}
				style={[styles.card, isClaimed && styles.claimedCard]}
			>
				<View style={styles.leftSection}>
					<Text style={styles.code}>{voucher.code}</Text>
					<Text style={styles.description}>
						{voucher.description}
					</Text>
					<Text style={styles.expiryDate}>{voucher.expiryDate}</Text>
				</View>
				<View style={styles.rightSection}>
					<Text style={styles.discount}>{voucher.discount} VNĐ</Text>
					<Pressable
						style={[
							styles.button,
							isClaimed && styles.disabledButton,
						]}
						onPress={() =>
							!isClaimed && handleClaimVoucher(voucher.id)
						}
					>
						<Text style={styles.buttonText}>
							{isClaimed ? "Claimed" : "Get Voucher"}
						</Text>
					</Pressable>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{Object.entries(groupedVouchers).map(([type, vouchers]) => (
				<View key={type} style={styles.voucherSection}>
					<Text style={styles.sectionHeader}>
						{type === "main service"
							? "Dịch Vụ Chính"
							: type === "holiday"
							? "Sự Kiện Lễ"
							: type === "event"
							? "Khuyến Mãi Sự Kiện"
							: "Sinh Nhật"}
					</Text>
					<FlatList
						data={vouchers}
						renderItem={({ item }) => renderVoucher(item)}
						keyExtractor={(item) => item.id.toString()}
						numColumns={2}
						columnWrapperStyle={styles.row}
					/>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		paddingTop: 20,
		paddingHorizontal: 15,
	},
	voucherSection: {
		marginBottom: 20,
	},
	sectionHeader: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 10,
	},
	row: {
		justifyContent: "space-between",
	},
	card: {
		flex: 1,
		backgroundColor: "#F9F9F9",
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		marginHorizontal: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	claimedCard: {
		backgroundColor: "#E0E0E0",
	},
	leftSection: {
		flex: 1,
	},
	code: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#FF6B6B",
		marginBottom: 5,
	},
	description: {
		fontSize: 13,
		color: "#555",
		marginBottom: 5,
	},
	expiryDate: {
		fontSize: 12,
		color: "#888",
	},
	rightSection: {
		alignItems: "center",
		justifyContent: "space-between",
	},
	discount: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 5,
	},
	button: {
		backgroundColor: "#FF6B6B",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
	},
	disabledButton: {
		backgroundColor: "#A0A0A0",
	},
	buttonText: {
		color: "#FFF",
		fontSize: 14,
	},
});

export default VoucherScreen;
