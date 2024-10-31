import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';

const PaymentChoosing = ({handleResetBooking, pinCode}) => {
  const bookingCode = pinCode; // replace with actual booking code

  const handlePayment = () => {
    // Navigate to PaymentChoosing screen or perform payment action
    // navigation.navigate('PaymentChoosing');
  };

  const handleNewBooking = () => {
    handleResetBooking()
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png' }}
        style={styles.successIcon}
      />
      <Text style={styles.title}>Bạn đã đặt lịch thành công!</Text>
      <Text style={styles.subTitle}>Có rất nhiều sự lựa chọn nhưng bạn đã chọn chúng tôi. Cảm ơn bạn</Text>

      <Text style={styles.bookingCodeLabel}>Mã đặt lịch:</Text>
      <Text style={styles.bookingCode}>{bookingCode}</Text>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity> */}
        <Pressable style={styles.newBookingButton} onPress={handleNewBooking}>
          <Text style={styles.buttonText}>Đặt lịch mới</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 8,
    paddingHorizontal: 32,
  },
  bookingCodeLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 16,
  },
  bookingCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  newBookingButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentChoosing;
