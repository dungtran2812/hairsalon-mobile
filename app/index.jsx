
import FavoriteRoutes from "./FavoriteRoutes";
import HomeRoutes from "./HomeRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaProvider >
      <NavigationContainer independent>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            //màu tab bar
            tabBarActiveTintColor: '#3498db',
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeRoutes}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              headerShown: false,
              unmountOnBlur: true
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteRoutes}
            options={{
              tabBarLabel: 'Favorite',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="map-marker-star-outline" color={color} size={size} />
              ),
              headerShown: false,
              unmountOnBlur: true
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider  >
  );
}
