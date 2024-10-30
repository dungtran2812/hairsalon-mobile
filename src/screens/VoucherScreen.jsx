import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import Header from "../components/header";
import { useGetUserRoleQuery } from "../services/hairsalon.service";

const VoucherScreen = ({ navigation }) => {
  const [claimedVouchers, setClaimedVouchers] = useState([]);
  const { data: vouchers } = useGetUserRoleQuery();

  const handleClaimVoucher = (voucherId) => {
    setClaimedVouchers([...claimedVouchers, voucherId]);
    navigation.navigate("MyVoucherScreen", { voucherId });
  };

  const renderVoucher = ({ item: voucher }) => {
    const isClaimed = claimedVouchers.includes(voucher.id);

    return (
      <View
        key={voucher.id}
        style={[styles.card, isClaimed && styles.claimedCard]}
      >
        <View style={styles.leftSection}>
          <Text style={styles.code}>{voucher.data.voucherName}</Text>
          <Text style={styles.description}>{voucher.description}</Text>
          <Text style={styles.expiryDate}>{voucher.expiryDate}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.discount}>{voucher.discount} VNĐ</Text>
          <Pressable
            style={[styles.button, isClaimed && styles.disabledButton]}
            onPress={() => !isClaimed && handleClaimVoucher(voucher.id)}
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
      <Header />
      <View style={styles.flat}>
        <Text style={styles.sectionHeader}>Voucher ưu đãi</Text>
        <FlatList
          style={styles.flatList}
          data={vouchers}
          renderItem={renderVoucher}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1} // Hiển thị một cột
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D397A",
  },
  flat: {
    flex: 7,
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 10, // Khoảng cách giữa các thẻ và mép màn hình
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    // Đổ bóng cho từng thẻ
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
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
