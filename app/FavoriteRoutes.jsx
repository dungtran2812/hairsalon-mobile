import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import FavoriteScreen from '../components/FavoriteScreen';
import ArtDetail from '../components/ArtDetail';

const Stack = createStackNavigator();
const FavoriteRoutes = () => {
  return (
      <Stack.Navigator
        initialRouteName="Favorite"
        screenOptions={{
          headerShown:true
        }}
      >
        <Stack.Screen
          name="Favorite List"
          component={FavoriteScreen}
        />
        <Stack.Screen
          name="ArtDetails"
          component={ArtDetail}
        />
      </Stack.Navigator>
  );
}

export default FavoriteRoutes