import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import Header from "../components/header";
import { useViewVoucherQuery } from "../services/hairsalon.service";

const VoucherScreen = ({ navigation }) => {
  const { data: VoucherData, error, isLoading } = useViewVoucherQuery();
  const [claimedVoucherId, setClaimedVoucherId] = useState(null); // Track only one claimed voucher

  const handleClaimVoucher = (voucherId) => {
    setClaimedVoucherId(voucherId); // Set the selected voucher ID
    navigation.navigate("MyVoucherScreen", { voucherId });
  };

  const renderVoucher = (voucher) => {
    const isClaimed = claimedVoucherId === voucher.id; // Check if the current voucher is claimed

    return (
      <View
        key={voucher.id}
        style={[styles.card, isClaimed && styles.claimedCard]}
      >
        <View style={styles.leftSection}>
          <Text style={styles.code}>{voucher.name}</Text>
          <Text style={styles.expiryDate}>
            {new Date(voucher.expiryDate).toLocaleDateString("vi-VN")}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.discount}>
            {voucher.discountType === "money"
              ? `${voucher.discountMoney} VNĐ`
              : `${voucher.discountPercent}%`}
          </Text>

          <Pressable
            style={[styles.button, isClaimed && styles.claimedButton]}
            onPress={() => !isClaimed && handleClaimVoucher(voucher.id)}
            disabled={isClaimed} // Disable button if claimed
          >
            <Text style={styles.buttonText}>
              {isClaimed ? "Claimed" : "Get Voucher"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <Text>Loading vouchers...</Text>;
  }

  if (error) {
    return <Text>Error fetching vouchers: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.flat}>
        <Text style={styles.sectionHeader}>Voucher ưu đãi</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <FlatList
            style={styles.flatList}
            data={VoucherData?.vouchers || []}
            renderItem={({ item }) => renderVoucher(item)}
            keyExtractor={(item) => item.id}
            numColumns={1} // Display one column
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D3A29",
  },
  flat: {
    flex: 7,
    backgroundColor: "#FAF3E0",
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
  scrollView: {
    backgroundColor: "#FAF3E0",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 10, // Spacing between cards and screen edges
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
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
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
});

export default VoucherScreen;
