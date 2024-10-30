import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ConfirmationChoosing = ({ formBooking }) => {
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
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#FF5722', // Contrasting color for the header
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 20, // Increased font size for labels
    color: '#333', // Darker color for labels
  },
  infoText: {
    fontSize: 18, // Increased font size for info text
    color: '#555', // Slightly darker color for info text
    marginVertical: 4, // Added vertical margin for spacing
  },
});

export default ConfirmationChoosing;
