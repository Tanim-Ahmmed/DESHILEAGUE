import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InfoCardProps {
  iconName: string;
  iconColor?: string;
  title: string;
  amount?: number | string;
  verified?: boolean;
  backgroundColor?: string;
  statusText?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  iconName,
  iconColor = "#FFD700",
  title,
  amount,
  verified = false,
  backgroundColor = "#2c2f36",
  statusText,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <MaterialCommunityIcons name={iconName as any} size={32} color={iconColor} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.amountRow}>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.statusText}>{statusText}</Text>
          {verified && (
            <MaterialCommunityIcons
              name="check-decagram"
              size={20}
              color="green"
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    color: "#ccc",
    fontSize: 14,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  statusText: {
    fontSize: 14,
    color: "#ccc",
    marginLeft: 8,
  },
});

export default InfoCard;
