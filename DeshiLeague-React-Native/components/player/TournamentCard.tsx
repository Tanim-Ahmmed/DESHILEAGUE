import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SecondaryButton from "../shared/SecondaryButton";


interface TournamentCardProps {
  image: string; 
  title: string;
  location: string;
  date: string;
  winnerIcon: "trophy" | "medal";
  winnerTeam: string;
  onPress: () => void; 
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  image,
  title,
  location,
  date,
  winnerIcon,
  winnerTeam,
  onPress,
}) => {
  return (
    <View style={styles.card}>

      <Image source={{ uri: image }} style={styles.image} />

 
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.date}>{date}</Text>

        <View style={styles.winnerRow}>
          <Ionicons
            name={winnerIcon}
            size={18}
            color={winnerIcon === "trophy" ? "#FFD700" : "#C0C0C0"}
          />
          <Text style={styles.winnerTeam}> {winnerTeam}</Text>
        </View>
      </View>

      <SecondaryButton title="View" onPress={onPress} />
    </View>
  );
};

export default TournamentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#313030ff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
  location: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 2,
  },
  date: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 6,
  },
  winnerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  winnerTeam: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
});
