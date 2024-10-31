import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import {
  useAddFavoriteStylistMutation,
  useRemoveFavoriteStylistMutation,
} from "../services/hairsalon.service";

const StylistDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { stylist } = route.params;
  const [addFavoriteStylist] = useAddFavoriteStylistMutation();
  const [removeFavoriteStylist] = useRemoveFavoriteStylistMutation();
  const [isFavorited, setIsFavorited] = useState(false); // Track if stylist is favorited

  useEffect(() => {
    // Example: Initialize favorited state based on your favorite stylist logic
    if (stylist) {
      // Replace this with actual logic to check if stylist is in favorites
      // setIsFavorited(favoriteStylists.has(stylist.id));
    }
  }, [stylist]);

  const handleBooking = () => {
    navigation.navigate("Booking");
  };

  const toggleFavorite = async () => {
    if (!stylist) return; // Check stylist data exists
    try {
      if (isFavorited) {
        // If already favorited, remove from favorites
        const response = await removeFavoriteStylist({
          stylistId: stylist.id, // Use id here
        }).unwrap();
        if (response.status === 200) {
          // Check response structure
          setIsFavorited(false); // Update local state
          Alert.alert("Thông báo", `${stylist.name} đã được hủy yêu thích.`);
          console.log(`${stylist.name} removed from favorites.`);
        }
      } else {
        // If not favorited, add to favorites
        const response = await addFavoriteStylist({
          stylistId: stylist.id, // Use id here
        }).unwrap();
        if (response.status === 200) {
          // Check response structure
          setIsFavorited(true); // Update local state
          Alert.alert(
            "Thông báo",
            `${stylist.name} đã được thêm vào yêu thích.`
          );
          console.log(`${stylist.name} added to favorites.`);
        }
      }
    } catch (error) {
      console.error("Failed to toggle favorite stylist:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thực hiện hành động này.");
    }
  };

  if (!stylist) {
    return <Text>Loading...</Text>; // Loading state if stylist is not available
  }

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
      </View>
      <Text style={styles.name}>{stylist.name}</Text>
      <Text style={styles.infoLabel}>Email:</Text>
      <Text style={styles.infoValue}>{stylist.email}</Text>
      <Text style={styles.infoLabel}>Chuyên môn:</Text>
      <Text style={styles.infoValue}>{stylist.expertise}</Text>
      <Text style={styles.infoLabel}>Kinh nghiệm:</Text>
      <Text style={styles.infoValue}>{stylist.numberExperiences}</Text>

      {/* Favorite button */}
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon
          name="heart"
          size={20}
          color={isFavorited ? "#E74C3C" : "#ccc"} // Change color based on isFavorited state
        />
        <Text style={styles.favoriteButtonText}>
          {isFavorited ? "Hủy yêu thích" : "Thêm vào yêu thích"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.bookingButtonText}>Đặt Lịch Ngay</Text>
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
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 15,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  favoriteButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#2980B9",
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
