import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.button}>
        <Ionicons name="chevron-back" size={20} color="#A0A0A0" />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 22,
    backgroundColor: '#1E1E1E', 
    justifyContent: 'center',
    alignItems: 'center',
    
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    
    elevation: 0, 
    ...Platform.select({
      android: {
        shadowColor: '#FFFFFF',
      },
    }),
  },
});