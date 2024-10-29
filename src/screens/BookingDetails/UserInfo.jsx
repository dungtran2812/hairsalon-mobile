import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const UserInfo = ({ formBooking, setFormBooking }) => {
  const { customerName, customerPhone } = formBooking;

  const handleChangeUser = (fieldName, value) => {
    setFormBooking((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.formTitle}>Enter Your Information:</Text>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={customerName}
          onChangeText={(value) => handleChangeUser('customerName', value)}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          value={customerPhone}
          onChangeText={(value) => handleChangeUser('customerPhone', value)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'90vw',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  formTitle: {
    fontWeight: '600',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#555',
  },
});

export default UserInfo;
