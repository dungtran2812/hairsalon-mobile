import * as React from 'react';
import { View } from 'react-native';
import HairSalonHeader from '../components/Header';
import HairSalonFooter from '../components/Footer';

export default function App() {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#495E57',
        }}>
        <HairSalonHeader />
      </View>
      <View style={{ backgroundColor: '#495E57' }}>
        <HairSalonFooter />
      </View>
    </>
  );
}
