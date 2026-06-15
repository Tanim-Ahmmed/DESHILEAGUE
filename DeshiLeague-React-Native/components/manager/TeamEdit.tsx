// components/TeamEdit.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

interface TeamEditProps {
  teamName: string;
  totalCost: number;
  win: number;
  teamLogo: string; // logo image url
  players: string[]; // array of player avatar image urls
  onSelectCaptain: () => void;
  onEditTeamName?: () => void;
  onEditLogo?: () => void;
}

const TeamEdit: React.FC<TeamEditProps> = ({
  teamName,
  totalCost,
  teamLogo,
  players,
  win,
  onSelectCaptain,
  onEditTeamName,
  onEditLogo,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.logoRow}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: teamLogo }} style={styles.logo} />
            <TouchableOpacity
              style={styles.editLogoIcon}
              onPress={onEditLogo}
            >
              <Ionicons name="create-outline" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.teamNameRow}>
            <Text style={styles.teamName}>{teamName}</Text>
            <TouchableOpacity
              style={{ marginLeft: 8 }}
              onPress={onEditTeamName}
            >
              <Ionicons name="create-outline" size={18} color={theme.primaryTextColor} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.totalCost}>Team Total Cost</Text>
            <Text style={styles.totalCostValue}>{totalCost}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.totalCost}>Win -</Text>
            <Text style={styles.totalCostValue}>{win}</Text>
          </View>
        </View>
      </View>

      {/* Players Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.playersRow}
      >
        {players.map((player, index) => (
          <Image
            key={index}
            source={{ uri: player }}
            style={styles.playerAvatar}
          />
        ))}
      </ScrollView>

      {/* Buttons Row */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.yellowButton} onPress={onSelectCaptain}>
          <Text style={styles.buttonText}>Select Captain</Text>
          <Ionicons name="chevron-down" size={18} color={theme.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    backgroundColor: theme.primaryCardColor,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    marginBottom: 5,
    overflow: "hidden",
    shadowColor: theme.black,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoContainer: { position: "relative" },
  logo: { width: 50, height: 50, borderRadius: 28 },
  editLogoIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: theme.primaryTextColor,
    borderRadius: 12,
    padding: 2,
  },
  teamNameRow: { flexDirection: "row", marginLeft:10, alignItems: "center" },
  teamName: { color: theme.primaryTextColor, fontSize: 16, fontWeight: "600" },

  totalCost: { color: theme.primaryTextColor, fontSize: 14 },
  totalCostValue: { color: "#FFC107", fontWeight: "700", fontSize: 15 },

  playersRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  playerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.black,
    marginRight: 8,
  },

  buttonsRow: {
    flexDirection: "row",
    width: "70%",
  },
  yellowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.goldenTextDark,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 12,
    shadowColor: theme.goldenTextDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: { color: theme.black, fontWeight: "400", fontSize: 14 },
});

export default TeamEdit;
