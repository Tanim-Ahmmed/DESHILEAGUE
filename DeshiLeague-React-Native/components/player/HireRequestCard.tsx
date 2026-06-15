import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DollarIcon from "@/assets/icons/DollarIcon";

interface HireRequestCardProps {
  image: string;
  title: string;
  location: string;
  date: string;
  manager: string;
  offer: number;
  onAccept?: () => void;
  onReject?: () => void;
  onChat?: () => void;
}

const HireRequestCard: React.FC<HireRequestCardProps> = ({
  image,
  title,
  location,
  date,
  manager,
  offer,
  onAccept,
  onReject,
  onChat,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topRow}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subText}>{location}</Text>
          <Text style={styles.subText}>{date}</Text>
          <Text style={styles.manager}>Manager - {manager}</Text>
        </View>
      </View>

      {/* Offer Row */}
      <View style={styles.offerRow}>
        <View style={styles.coinsContainer}>
                <DollarIcon />
              </View>
        <Text style={styles.offerText}>Offer - {offer} coins</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.accept]} onPress={onAccept}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.reject]} onPress={onReject}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.chat]} onPress={onChat}>
          <Text style={styles.chatText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HireRequestCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2B2D34",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#434952",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 6,
  },
    coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    borderRadius: 12,
    gap: 4,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 2,
  },
  manager: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 4,
  },
  offerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  offerText: {
    color: "#EAB50F",
    fontWeight: "600",
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 18,
  },

  accept: {
    backgroundColor: "#EAB50F",
    shadowColor: "#EAB50F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },

  reject: {
    backgroundColor: "#1C1F22",
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },

  chat: {
    backgroundColor: "#1C1F22",
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  acceptText: { color: "#000", fontWeight: "bold" },
  rejectText: { color: "#fff" },
  chatText: { color: "#fff" },
});
