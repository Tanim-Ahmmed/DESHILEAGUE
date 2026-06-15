import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface InfoRow {
  label: string;
  value?: string | number;
}

interface InfoCardProps {
  title: string;
  rightTitle?: string;
  data: InfoRow[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, rightTitle, data }) => {
  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {rightTitle && <Text style={styles.rightTitle}>{rightTitle}</Text>}
      </View>

      {/* Data Rows */}
      <View style={styles.rows}>
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            {item.value !== undefined && (
              <Text 
                style={[
                  styles.value,
                  item.label === "Entry Fee :" && styles.goldenValue
                ]}
              >
                {item.value}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2B2D34", 
    borderRadius: 12,
    padding: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  rightTitle: {
    fontSize: 14,
    color: "#ddd",
    marginRight: 30,
  },
  rows: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#ccc",
    fontSize: 14,
  },
  dot: {
    color: "#ccc",
    fontSize: 22,
    marginRight: 2,
  },
  value: {
    color: "#ccc",
    fontWeight: "600",
    marginLeft: 4,
  },
  goldenValue: {
    color: "#FFD700",
  },
});
