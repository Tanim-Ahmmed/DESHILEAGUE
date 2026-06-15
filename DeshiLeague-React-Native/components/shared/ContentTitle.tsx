// components/shared/PageTitle.tsx
import React from "react";
import { Text, StyleSheet } from "react-native";

interface PageTitleProps {
  title: string;
}

const ContentTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default ContentTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#666",
    marginBottom: 16,
  },
});
