import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface TeamCardProps {
  image: any; 
  name: string;
  onPress?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ image, name, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.logo} />
      <Text style={styles.teamName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default TeamCard;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 30,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  teamName: {
    marginTop: 4,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
