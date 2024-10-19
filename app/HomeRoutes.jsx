import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ArtDetail from '../components/ArtDetail';
import ArtList from '../components/ArtList';

const Stack = createStackNavigator();
const HomeRoutes = () => {
  return (
      <Stack.Navigator
        initialRouteName="ArtList"
        screenOptions={{
        headerStyle: {
          height: 40, // Set your desired height
        },
      }}
      >
        <Stack.Screen
          name="ArtList"
          component={ArtList}
        />
        <Stack.Screen
          name="ArtDetails"
          component={ArtDetail}
        />

      </Stack.Navigator>
  );
}

export default HomeRoutes