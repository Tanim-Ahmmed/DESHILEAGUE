// components/common/HeaderAddPlayer.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HeaderAddPlayer = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/managers/my-teams/create-team")}
    >
      <Text style={styles.text}>Add Player</Text>
      <View style={styles.iconWrapper}>
        <Ionicons name="person-add" size={18} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    color: "#f5c518", // yellow text
    marginRight: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  iconWrapper: {
    backgroundColor: "#f5c518", 
    borderRadius: 20,
    padding: 6,
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default HeaderAddPlayer;
