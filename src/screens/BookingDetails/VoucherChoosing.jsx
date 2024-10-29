import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const vouchers = [
  { id: "1", name: "10% Off", discount: 10 },
  { id: "2", name: "Free Hair Wash", discount: 0 },
  // Add more voucher data as needed
];

const VoucherChoosing = ({ navigation, route }) => {
  const { formBooking, setFormBooking } = route.params; // Accessing passed props

  const handleSelectVoucher = (voucher) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedVoucher: voucher,
    }));
    navigation.goBack(); // Navigate back to ServiceChoosing after selecting a voucher
  };

  const renderVoucher = ({ item }) => (
    <Pressable
      style={styles.voucherItem}
      onPress={() => handleSelectVoucher(item)}
    >
      <Text style={styles.voucherName}>{item.name}</Text>
      <Text style={styles.voucherDiscount}>Discount: {item.discount}%</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Voucher</Text>
      <FlatList
        data={vouchers}
        renderItem={renderVoucher}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  voucherItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginVertical: 5,
  },
  voucherName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  voucherDiscount: {
    fontSize: 16,
    color: "green",
  },
});

export default VoucherChoosing;
