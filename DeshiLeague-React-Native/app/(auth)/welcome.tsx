import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/shared/AppButton"; // adjust path if needed
import theme from "@/constants/theme";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/trophy.png")} style={styles.trophy} resizeMode="contain" />
      <Text style={styles.title}>Welcome</Text>

      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => router.push("/login")} />
        <AppButton title="Sign Up" onPress={() => router.push("/register")} />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  trophy: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: theme.secondaryTextColor,
    marginBottom: 60,
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
    paddingVertical: 30,      
    gap: 20,
  },
});
