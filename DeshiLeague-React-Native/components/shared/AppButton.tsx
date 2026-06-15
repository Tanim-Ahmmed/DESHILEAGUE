// components/shared/AppButton.tsx
import React from "react";
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/constants/theme";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
        colors={["#2F353A", "#1C1F22"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    borderRadius: 30,
    shadowColor: theme.secondaryTextColor,
    shadowOpacity: 0.1,
    shadowOffset: { width: -2, height: -1 },
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: theme.secondPrimaryTextColor,
    fontSize: 18,
    fontWeight: "500",
  },
});
