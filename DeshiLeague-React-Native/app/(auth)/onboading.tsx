import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/shared/AppButton";
import BackButton from "@/components/shared/BackButton"; 
import theme from "@/constants/theme";

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={() => router.back()} />
      </View>
      <View style={styles.avatarWrapper}>
        <Image
          source={require("@/assets/images/user.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up as</Text>
        <AppButton
          title="Tournament Organizer"
          onPress={() => router.push("/(auth)/registerOrganizer" as any)}
          style={styles.button}
        />
        <AppButton
          title="Team Manager"
          onPress={() => router.push("/(auth)/registerManager" as any)}
          style={styles.button}
        />
        <AppButton
          title="Player"
          onPress={() => router.push("/(auth)/registerPlayer" as any)}
          style={styles.button}
        />
      </View>
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: 160,
    margin: 20,
    alignSelf: "center",
  },
  backButtonWrapper: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 40,
  },
  card: {
    flex: 1,
    backgroundColor: theme.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
    padding: 20,
    alignItems: "center",
  },
    title: {
    fontSize: 25,
    fontWeight: "700",
    color: theme.secondaryTextColor,
    marginBottom: 60,
  },
  button: {
     width: "80%",
    marginBottom: 15,
  },
});
