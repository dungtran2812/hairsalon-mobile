import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { useGetAllStylistQuery } from '../../services/hairsalon.service';

const StylistChoosing = ({ formBooking, setFormBooking }) => {
  const { data: stylists, isLoading, error } = useGetAllStylistQuery();

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Failed to load stylists.</Text>;

  const handleSelectStylist = (selectedStylist) => {
    setFormBooking({ ...formBooking, selectedStylist });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Choose Your Stylist</Text>
      {stylists.data.map((stylist) => (
        <Pressable
          key={stylist.email}
          onPress={() => handleSelectStylist(stylist)}
          style={[
            styles.card,
            formBooking.selectedStylist?.email === stylist.email && styles.selectedCard,
          ]}
        >
          <Image source={{ uri: stylist.avatar }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{stylist.name}</Text>
            <Text style={styles.email}>{stylist.email}</Text>
            {stylist.phone && <Text style={styles.phone}>Phone: {stylist.phone}</Text>}
            <Text style={styles.appointments}>Appointments: {stylist.numberAppointments}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  selectedCard: {
    borderColor: "blue",
    backgroundColor: "#e6f7ff",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  appointments: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default StylistChoosing;
