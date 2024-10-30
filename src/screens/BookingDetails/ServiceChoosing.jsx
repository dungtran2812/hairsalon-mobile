import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useViewServiceQuery } from "../../services/hairsalon.service";

const ServiceChoosing = ({ navigation, formBooking, setFormBooking }) => {
  const { data: services, error, isLoading } = useViewServiceQuery();

  const handleSelectService = (service) => {
    setFormBooking((prev) => {
      const selectedServices = prev.selectedServices || [];
      const isSelected = selectedServices.some((item) => item.name === service.name);
      if (isSelected) {
        return {
          ...prev,
          selectedServices: selectedServices.filter((item) => item.name !== service.name),
        };
      } else {
        return {
          ...prev,
          selectedServices: [...selectedServices, { name: service.name, price: service.price }],
        };
      }
    });
  };

  // Check if services are available
  const renderServices = () => {
    if (!services || !services.services) return null;

    return services.services.map((item) => (
      <Pressable
        key={item._id}
        style={[
          styles.serviceItem,
          formBooking.selectedServices && formBooking.selectedServices.some((service) => service.name === item.name) && styles.selectedService,
        ]}
        onPress={() => handleSelectService(item)}
      >
        <Image source={{ uri: item.image }} style={styles.serviceImage} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>${item.price}</Text>
          <Text style={styles.loyaltyPoints}>Loyalty Points: {item.loyaltyPoints}</Text>
        </View>
      </Pressable>
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading services...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching services. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Service</Text>
      <View style={styles.servicesContainer}>
        {renderServices()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    width: "46%", // Adjust width to fit two items per row
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  selectedService: {
    borderColor: "blue",
    backgroundColor: "#e6f7ff",
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  servicePrice: {
    fontSize: 16,
    color: "green",
    marginVertical: 5,
  },
  loyaltyPoints: {
    fontSize: 14,
    color: "#555",
  },
  voucherButton: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  voucherButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ServiceChoosing;
