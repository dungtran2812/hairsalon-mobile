import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useGetAllStylistsQuery } from "../services/hairsalon.service";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const StylistScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetAllStylistsQuery();
  const stylists = data ? data.data : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteStylists, setFavoriteStylists] = useState([]);
  const [filteredStylists, setFilteredStylists] = useState(stylists);

  // Load favorite stylists from AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await AsyncStorage.getItem("favorites");
      setFavoriteStylists(favorites ? JSON.parse(favorites) : []);
    };
    loadFavorites();
  }, []);

  // Handle favorite toggle
  const toggleFavorite = async (email) => {
    const updatedFavorites = favoriteStylists.includes(email)
      ? favoriteStylists.filter((fav) => fav !== email)
      : [...favoriteStylists, email];

    setFavoriteStylists(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    filterStylists(); // Reapply filter when favorites change
  };

  // Filter stylists based on search term
  const filterStylists = () => {
    const filtered = stylists.filter((stylist) =>
      stylist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredStylists(filtered);
  };

  // Clear search term
  const clearSearch = () => {
    setSearchTerm("");
    setFilteredStylists(stylists); // Reset to all stylists
  };

  // Effect to filter stylists on search term change
  useEffect(() => {
    filterStylists();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm tên..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={filterStylists}>
          <Icon name="search" size={20} color="#444" />
        </TouchableOpacity>
        {searchTerm.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Icon name="remove" size={20} color="#444" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.listContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={styles.errorText}>
            {error.message || "Something went wrong"}
          </Text>
        ) : (
          <FlatList
            data={filteredStylists}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.stylistCard}
                onPress={
                  () => navigation.navigate("StylistDetail", { stylist: item }) // Chuyển hướng tới StylistDetail
                }
              >
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.stylistName}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.email)}
                >
                  <Icon
                    name={
                      favoriteStylists.includes(item.email)
                        ? "heart"
                        : "heart-o"
                    }
                    size={20}
                    color={
                      favoriteStylists.includes(item.email) ? "red" : "#444"
                    }
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  searchButton: {
    marginLeft: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  stylistCard: {
    width: "45%",
    position: "relative",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatar: {
    width: "100%",
    height: 160,
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
  },
  stylistName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
    marginVertical: 5,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default StylistScreen;
