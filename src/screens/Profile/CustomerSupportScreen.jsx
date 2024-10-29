import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomerSupportScreen = () => {
	const [isExpended, setIsExpended] = useState(null);

	const faqs = [
		{
			question: "Cách đặt lịch hẹn?",
			answer: "Bạn có thể đặt lịch hẹn qua ứng dụng hoặc gọi điện trực tiếp.",
		},
		{
			question: "Thời gian làm việc của salon?",
			answer: "Salon mở cửa từ 8:00 đến 20:00 hàng ngày.",
		},
		{
			question: "Có chính sách hoàn tiền không?",
			answer: "Chúng tôi có chính sách hoàn tiền cho các dịch vụ không đạt yêu cầu.",
		},
	];

	const toggleExpand = (index) => {
		setIsExpended(isExpended === index ? null : index);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Câu hỏi thường gặp</Text>
			{faqs.map((item, index) => (
				<View key={index}>
					<Pressable
						onPress={() => toggleExpand(index)}
						style={styles.faq}
					>
						<Text style={styles.question}>{item.question}</Text>
					</Pressable>
					{isExpended === index && (
						<Text style={styles.answer}>{item.answer}</Text>
					)}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	faq: {
		backgroundColor: "#FFF",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	question: {
		fontSize: 16,
		fontWeight: "bold",
	},
	answer: {
		fontSize: 14,
		color: "#666",
		paddingVertical: 10,
	},
});

export default CustomerSupportScreen;
