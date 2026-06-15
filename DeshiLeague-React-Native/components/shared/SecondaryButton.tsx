import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const SecondaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.viewBtn} onPress={onPress}>
      <Text style={styles.viewText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  viewBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,

    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,

    elevation: 6,
  },
  viewText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
});
