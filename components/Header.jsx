import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default function HairSalonHeader() {
  return (
    <Appbar.Header style={{ backgroundColor: '#f2a550' }}>
      <Appbar.Content 
        title="Hair Harmony" 
        titleStyle={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}
      />
    </Appbar.Header>
  );
}
