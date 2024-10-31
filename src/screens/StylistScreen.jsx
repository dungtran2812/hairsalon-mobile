import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGetAllStylistQuery } from "../services/hairsalon.service"; // Removed favorite hooks
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";

const StylistScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetAllStylistQuery();
  const stylists = data && data.data ? data.data : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStylists, setFilteredStylists] = useState(stylists);

  const filterStylists = () => {
    const filtered = stylists.filter((stylist) =>
      stylist.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStylists(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredStylists(stylists);
  };

  useEffect(() => {
    const filtered = stylists.filter((stylist) =>
      stylist.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (JSON.stringify(filtered) !== JSON.stringify(filteredStylists)) {
      setFilteredStylists(filtered);
    }
  }, [searchTerm, stylists]);

  return (
    <View style={styles.box}>
      <Header />
      <View style={styles.boxContainer}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm tên..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={filterStylists}
            >
              <Icon name="search" size={20} color="#444" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Icon name="remove" size={20} color="#444" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
              <FlatList
                data={filteredStylists}
                keyExtractor={(item) =>
                  item.id ? item.id.toString() : Math.random().toString()
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.stylistCard}
                    onPress={() =>
                      navigation.navigate("StylistDetail", { stylist: item })
                    }
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    />
                    <Text style={styles.stylistName}>{item.name}</Text>
                    <Text style={styles.expertiseText}>Chuyên môn:</Text>
                    <Text style={styles.expertiseValue}>{item.expertise}</Text>
                    {/* Remove favorite button */}
                  </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "#5D3A29",
  },
  boxContainer: {
    flex: 7,
    backgroundColor: "#FAF3E0",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
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
    marginBottom: 55,
    backgroundColor: "#FAF3E0",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
    marginVertical: 5,
  },
  expertiseText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
  },
  expertiseValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
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
