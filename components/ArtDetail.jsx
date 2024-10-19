import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the rating stars
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ArtDetail = ({ route }) => {
  const [favorite, setFavorite] = useState(false);

  const {
    id,
    artName,
    brand,
    description,
    feedback,
    glassSurface,
    image,
    limitedTimeDeal,
    price,
  } = route.params?.art;

  // Load the current status of the favorite item from AsyncStorage
  useFocusEffect(
    useCallback(() => {
      const checkIfFavorite = async () => {
        try {
          const favoriteItems = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
          const isFavorite = favoriteItems.some((item) => item.id === id);
          setFavorite(isFavorite);
        } catch (error) {
          console.error('Error checking favorites:', error);
        }
      };
      checkIfFavorite();
    }, [id])
  )
  

  const toggleFavorite = async () => {
    try {
      const favoriteItems = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      let updatedFavorites;

      if (favorite) {
        // If it's already a favorite, remove it
        updatedFavorites = favoriteItems.filter((item) => item.id !== id);
      } else {
        // Otherwise, add it to favorites
        updatedFavorites = [...favoriteItems, route.params?.art];
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorite(!favorite); // Toggle the favorite state
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Ionicons
          name={favorite ? 'star' : 'star-outline'}
          size={24}
          color={favorite ? '#ff6347' : '#ddd'}
        />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: image }} resizeMode="contain" style={styles.image} />

      {/* Art Name */}
      <Text style={styles.artName}>{artName}</Text>

      {/* Brand */}
      <Text style={styles.brand}>Brand: {brand}</Text>

      {/* Price and Limited Time Deal */}
      <Text style={styles.price}>Price: ${price.toFixed(2)}</Text>
      {limitedTimeDeal > 0 && (
        <Text style={styles.limitedTimeDeal}>
          Limited Time Deal: {Math.round(limitedTimeDeal * 100)}% OFF!
        </Text>
      )}

      {/* Description */}
      <Text style={styles.description}>Description: {description}</Text>

      {/* Glass Surface */}
      <Text style={styles.glassSurface}>
        Note: {glassSurface ? 'Works on Glass Surfaces' : 'Does not work on Glass Surfaces'}
      </Text>

      {/* Feedback Section */}
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>User Feedback:</Text>

        {/* Map through the feedback array */}
        {feedback.map((item, index) => (
          <View key={index} style={styles.feedbackItem}>
            <Text style={styles.comment}>Comment: {item.comment}</Text>
            <Text style={styles.date}>Date: {item.date}</Text>

            {/* Star Rating */}
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Rating: </Text>
              {[...Array(5)].map((_, starIndex) => (
                <Ionicons
                  key={starIndex}
                  name={starIndex < Math.round(item.rating) ? 'star' : 'star-outline'}
                  size={20}
                  color={starIndex < Math.round(item.rating) ? '#ffd700' : '#ddd'}
                />
              ))}
              <Text style={styles.ratingText}>{item.rating.toFixed(1)} / 5</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    marginTop: 10,
    marginLeft: 320,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  artName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  limitedTimeDeal: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  glassSurface: {
    fontSize: 16,
    marginBottom: 20,
  },
  feedbackContainer: {
    paddingTop: 10,
    marginBottom: 20,
    borderTopWidth: 2,
    borderTopColor: '#2ecc71',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 5,
  },
  feedbackItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  comment: {
    fontSize: 16,
    color: '#555',
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
});

export default ArtDetail;
