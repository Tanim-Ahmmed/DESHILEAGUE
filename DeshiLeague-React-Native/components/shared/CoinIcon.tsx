import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface GoldenIconProps {
  name: string;
  size?: number;
}

const CoinIcon: React.FC<GoldenIconProps> = ({ name, size = 24 }) => {
  return (
    <View style={styles.outerCircle}>
      <View style={styles.innerCircle}>
        <FontAwesome name="dollar" size={size * 0.6} color="#FFD700" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a', 
  },
});

export default CoinIcon;
