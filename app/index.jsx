import * as React from 'react';
import { View } from 'react-native';
import HairSalonHeader from '../components/Header';
import HairSalonFooter from '../components/Footer';
import MenuItems from '../assets/menuItem';
export default function App() {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#eeecfe',
        }}>
        <HairSalonHeader />
        <MenuItems/>
      </View>
      <View style={{ backgroundColor: '#eeecfe' }}>
        <HairSalonFooter />
      </View>
    </>
  );
}
