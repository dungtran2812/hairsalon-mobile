import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import star icon from Ionicons (you need to install `expo-vector-icons` if you haven't)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ArtList = ({ navigation }) => {
  const [text, onChangeText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Load products when the component mounts
  useEffect(() => {
    axios.get('https://65a68cd574cf4207b4f05588.mockapi.io/api/mma/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Load favorites from AsyncStorage when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem('favorites');
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }

        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      };
      loadFavorites();
    }, [])
  );

  // Save favorites to AsyncStorage when the favorites state changes
  useEffect(() => {
    const storeFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };
    storeFavorites();
  }, [favorites]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.brand === filter));
    }
  };

  const handleSearch = (value) => {
    const searchText = value.nativeEvent.text.toLowerCase()
    if (text) {
      setFilteredProducts(filteredProducts.filter(product => product.artName.toLowerCase().includes(searchText)))
    } else {
      setFilteredProducts(filteredProducts)
    }

  }

  const toggleFavorite = (item) => {
    setFavorites(prevFavorites =>
      prevFavorites.some(fav => fav.id === item.id)
        ? prevFavorites.filter(fav => fav.id !== item.id) // Remove from favorites
        : [...prevFavorites, item] // Add to favorites
    );
  };
  const isFavorite = (item) => {
    return favorites.some(fav => fav.id === item.id);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ArtDetails', {art: item})}>
    <View >
      {/* Favorite Button with Star Icon */}
      <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
        <Ionicons
          name={isFavorite(item) ? 'star' : 'star-outline'}
          size={24}
          color={isFavorite(item) ? '#ff6347' : '#ddd'}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.artName}>{item.artName}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <Text style={styles.brand}>Brand: {item.brand}</Text>
    </View>
    </TouchableOpacity>
  );

  const filterOptions = ['All', 'Arteza', 'Color Splash', 'Edding'];

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='Search Art'
        onSubmitEditing={handleSearch}
      />
      <View style={styles.filterContainer}>
        {filterOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.filterButton, selectedFilter === option && styles.selectedFilterButton]}
            onPress={() => handleFilterChange(option)}
          >
            <Text style={[styles.filterText, selectedFilter === option && styles.selectedFilterText]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatList}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  flatList: {
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  selectedFilterButton: {
    backgroundColor: '#4caf50',
    marginRight: 10
  },
  filterText: {
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    margin: 6,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  artName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginVertical: 5,
  },
  detailButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginVertical: 5,
    borderColor:'#3498db',
    borderWidth: 2,
    textAlign: 'center'
  },
  brand: {
    fontSize: 14,
  },
  favoriteButton: {
    marginTop: 10,
    marginLeft: 120
  },
});

export default ArtList;
