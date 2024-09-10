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
          backgroundColor: '#eeecfe',
        }}>
        <HairSalonHeader />
      </View>
      <View style={{ backgroundColor: '#eeecfe' }}>
        <HairSalonFooter />
      </View>
    </>
  );
}
