// components/shared/PageTitle.tsx
import React from "react";
import { Text, StyleSheet } from "react-native";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default PageTitle;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 10,
  },
});
