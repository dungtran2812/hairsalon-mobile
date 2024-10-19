import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); // To track selected items

  // Function to load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites', error);
    }
  };

  // Function to remove selected favorites from both UI and AsyncStorage
  const deleteSelectedFavorites = async () => {
    try {
      const updatedFavorites = favorites.filter(item => !selectedItems.has(item.id));
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSelectedItems(new Set()); // Clear selected items
    } catch (error) {
      console.error('Error deleting favorites', error);
    }
  };

  // Function to delete all favorites
  const deleteAllFavorites = async () => {
    try {
      setFavorites([]); // Clear UI
      await AsyncStorage.removeItem('favorites'); // Clear AsyncStorage
      setSelectedItems(new Set()); // Clear selected items
    } catch (error) {
      console.error('Error deleting all favorites', error);
    }
  };

  // Load favorites when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Toggle selection of an item
  const toggleSelectItem = (id) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id); // Remove if already selected
      } else {
        newSelected.add(id); // Add if not selected
      }
      return newSelected;
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.has(item.id);
    return (
      <Pressable
        style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
        onPress={() => navigation.navigate('ArtDetails', { art: item })} // Toggle selection on press
        onLongPress={() => toggleSelectItem(item.id)} // Toggle selection on long press
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.artName}>{item.artName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          {item.limitedTimeDeal > 0 && (
            <Text style={styles.deal}>Limited Time Deal: {item.limitedTimeDeal * 100}% Off!</Text>
          )}
          <Text style={styles.brand}>Brand: {item.brand}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="heart-broken-outline" size={80} color="#7f8c8d" />

      </View>
      )}

      {selectedItems.size > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Delete Selected Items',
              'Are you sure you want to delete the selected items?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: deleteSelectedFavorites },
              ]
            );
          }}
        >
          {selectedItems.size > 1 ? <Text style={styles.deleteButtonText}>Delete All Selected Items</Text> : <Text style={styles.deleteButtonText}>Delete Selected Item</Text>}
        </TouchableOpacity>
      )}

      {favorites.length > 0 && selectedItems.size == 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Delete All Items',
              'Are you sure you want to delete all favorite items?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: deleteAllFavorites },
              ]
            );
          }}
        >
          <Text style={styles.deleteButtonText}>Delete All Items</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noFavoritesText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Styles remain the same
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fdfdfd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#3498db',
    borderWidth: 2,
  },
  selectedItemContainer: {
    backgroundColor: '#d1e7dd', // Change color for selected items
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  artName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#2c3e50',
  },
  deal: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 5,
  },
  brand: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  noFavoritesText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#7f8c8d',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoriteScreen;
