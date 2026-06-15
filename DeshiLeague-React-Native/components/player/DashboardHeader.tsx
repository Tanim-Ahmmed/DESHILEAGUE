import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import BackButton from "@/components/shared/BackButton";
import CoinIcon from "../shared/CoinIcon";

interface DashboardHeaderProps {
  coins?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ coins = 0 }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Left: Back Button */}
      <BackButton onPress={() => router.back()} />

      {/* Middle: Title */}
      <Text style={styles.title}>Dashboard</Text>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {/* Friends Icon */}
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => router.push("/(tabs)/dashboard/hire-requests")}
        >
          <Image
            source={require("@/assets/images/friends.png")}
            style={styles.iconImage}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.coinWrapper}>
          <CoinIcon/>
          <View style={styles.coinTextWrapper}>
            <Text style={styles.coinText}>{coins}</Text>
          </View>
        </View>

        {/* Avatar */}
        <TouchableOpacity style={styles.avatarWrapper}
        onPress={() => router.push("/(tabs)/dashboard/profile/")}
        >
          <Image
            source={require("@/assets/images/avater.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginHorizontal: 6,
    position: "relative",
  },
  iconImage: {
    width: 22,
    height: 22,
    tintColor: "#fff",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: -4,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
 coinWrapper: {
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 6,
},

coinTextWrapper: {
  borderBottomWidth: 2,
  borderBottomColor: "#FFD700", 
  paddingBottom: 2, 
  marginLeft: 4,
},

coinText: {
  color: "#FFD700", 
  fontSize: 14,
  fontWeight: "600",
},

  avatarWrapper: {
    marginLeft: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
