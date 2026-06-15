import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

interface PlayerListCardProps {
  role: string;
  rank: number;
  name: string;
  stats: string;
  image: string;
  onSelect?: () => void;
}

const PlayerListCard: React.FC<PlayerListCardProps> = ({
  role,
  rank,
  name,
  stats,
  image,
  onSelect,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.roleRow}>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{role}</Text>
          </View>
          <Text style={styles.rankText}>Rank - {rank}</Text>
        </View>
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        {/* Avatar */}
        <Image source={{ uri: image }} style={styles.avatar} />

        {/* Player Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>   {name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.dot} />
            <Text style={styles.stats}>{stats}</Text>
          </View>
        </View>

        {/* Person Circle Outline on Right */}
        <TouchableOpacity style={styles.iconBtn} onPress={onSelect}>
          <Ionicons
            name="person-circle-outline"
            size={22}
            color={theme.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.primaryCardColor,
    borderRadius: 12,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  roleBadge: {
    backgroundColor: theme.primaryCardColor,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: theme.black,
    marginRight: 10,
  },
  roleText: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "500",
  },
  rankText: {
    color: theme.goldenTextDark,
    fontWeight: "500",
    fontSize: 15,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  infoContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#aaa",
    marginRight: 6,
  },

  iconBtn: {
    backgroundColor: theme.goldenTextDark,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginBottom: 20,
     marginRight: 20,
  },
  name: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  stats: { color: "#aaa", fontSize: 12 },
});

export default PlayerListCard;
