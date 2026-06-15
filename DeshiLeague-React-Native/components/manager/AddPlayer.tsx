import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import theme from "@/constants/theme";
import DollarIcon from "@/assets/icons/DollarIcon";

interface AddPlayerProps {
  id: string;
  name: string;
  role: string;
  rank: number;
  location: string;
  runs: number;
  sr: number;
  wickets: number;
  coins: number;
  image: string;
  onAdd?: () => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({
  id,
  name,
  role,
  rank,
  location,
  runs,
  sr,
  wickets,
  coins,
  image,
  onAdd,
}) => {
  return (
    <View style={styles.card}>
      {/* Role & ID Row */}
      <View style={styles.roleIdRow}>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{role}</Text>
        </View>
        <Text style={styles.playerId}>ID {id}</Text>
      </View>

      <View style={styles.container}>
        {/* Player Image */}
        <Image source={{ uri: image }} style={styles.playerImage} />

        {/* Player Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.playerName}>{name}</Text>
          <Text style={styles.rankText}>Rank - {rank}</Text>
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Stats */}
<View style={styles.statsContainer}>
  <View style={styles.statRow}>
    <View style={styles.dot} />
    <Text style={styles.statText}>Runs - {runs}</Text>
  </View>

  <View style={styles.statRow}>
    <View style={styles.dot} />
    <Text style={styles.statText}>SR - {sr}</Text>
  </View>

  <View style={styles.statRow}>
    <View style={styles.dot} />
    <Text style={styles.statText}>Wickets - {wickets}</Text>
  </View>
</View>


        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Coins */}
          <View style={styles.coinRow}>
            <DollarIcon
            />
            <Text style={styles.coinText}>{coins}</Text>
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={onAdd}
          >
            <Text style={styles.addButtonText}>Add +</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: theme.primaryCardColor,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  roleIdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 6,
  },
  roleBadge: {
    backgroundColor: theme.primaryCardColor,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    marginRight: 10,
  },
  roleText: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  playerId: {
    color: theme.goldenTextDark,
    fontWeight: "600",
    fontSize: 12,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 4,
},
dot: {
  width: 5,
  height: 5,
  borderRadius: 5,
  backgroundColor: theme.primaryTextColor, 
  marginRight: 6,
},
  playerImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 12,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#333",
  },
  infoContainer: {
    flex: 1.3,
    marginTop: 5,
  },
  playerName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 1,
  },
  rankText: {
    color: theme.goldenTextDark,
    fontSize: 13,
    marginBottom: 1,
  },
  locationText: {
    color: "#ccc",
    fontSize: 12,
  },
  statsContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: "flex-start",
  },
  statText: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 2,
  },
  rightSection: {
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-between",
  },
  coinRow: {
    flexDirection: "row",
    alignItems: "center",
    color: theme.goldenTextDark,
    textDecorationLine:"underline",
    marginBottom: 8,
  },
  coinText: {
    color: theme.goldenTextDark,
    marginLeft: 4,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: theme.goldenTextDark,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginHorizontal: 2,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addButtonText: {
    color: "#1F1F1F",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default AddPlayer;
