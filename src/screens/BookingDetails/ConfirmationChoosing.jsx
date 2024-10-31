import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

const ConfirmationChoosing = ({ formBooking, handleBooking }) => {
  const { selectedStylist, selectedSlot, selectedDay, customerName, customerPhone, selectedServices } = formBooking;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Confirmation</Text>
      
      <Text style={styles.label}>User Information:</Text>
      <Text style={styles.infoText}>Name: {customerName || 'N/A'}</Text>
      <Text style={styles.infoText}>Phone: {customerPhone || 'N/A'}</Text>
      <Text style={styles.label}>Booking Details:</Text>
      <Text style={styles.infoText}>Stylist: {selectedStylist?.name || 'N/A'}</Text>
      <Text style={styles.infoText}>Date: {selectedDay || 'N/A'}</Text>
      <Text style={styles.infoText}>Time Slot: {selectedSlot || 'N/A'}</Text>
      <Text style={styles.label}>Selected Services:</Text>
      {selectedServices && selectedServices.length > 0 ? (
        selectedServices.map((service, index) => (
          <Text key={index} style={styles.infoText}>
            {service.name || 'N/A'}
          </Text>
        ))
      ) : (
        <Text style={styles.infoText}>No services selected.</Text>
      )}

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 32,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#FF5722',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 20,
    color: '#333',
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 4,
  },
  bookingButton: {
    marginTop: 24,
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationChoosing;
