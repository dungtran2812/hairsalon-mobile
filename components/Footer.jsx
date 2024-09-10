import * as React from 'react';
import { Text } from 'react-native';
import { Surface } from 'react-native-paper';

export default function HairSalonFooter() {
  return (
    <Surface
      style={{
        backgroundColor: '#f2a550', // Changed color for contrast
        paddingVertical: 10,
        elevation: 4, // Adds a subtle shadow to elevate the footer
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: '#040215', // Consistent with header color
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        © 2024 Hair Harmony. All rights reserved.
      </Text>
    </Surface>
  );
}
