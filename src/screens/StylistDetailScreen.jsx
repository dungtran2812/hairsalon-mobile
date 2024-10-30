import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const StylistDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { stylist } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from AsyncStorage
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      const favorites = await AsyncStorage.getItem("favorites");
      const favoriteList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoriteList.includes(stylist.email));
    };

    loadFavoriteStatus();
  }, [stylist.email]);

  // Toggle favorite status
  const toggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    const favoriteList = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      const updatedFavorites = favoriteList.filter(
        (email) => email !== stylist.email
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favoriteList.push(stylist.email);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteList));
    }

    setIsFavorite(!isFavorite);
  };

  const handleBooking = () => {
    navigation.navigate("Booking");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: stylist.avatar }} style={styles.avatar} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={30} // Tăng kích thước biểu tượng
            color={isFavorite ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{stylist.name}</Text>
      <Text style={styles.email}>Email: {stylist.email}</Text>
      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.bookingButtonText}>Booking Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f9fc",
  },
  imageContainer: {
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    padding: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  phone: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  bookingButton: {
    backgroundColor: "rgb(97, 70, 59)",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  bookingButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StylistDetailScreen;
