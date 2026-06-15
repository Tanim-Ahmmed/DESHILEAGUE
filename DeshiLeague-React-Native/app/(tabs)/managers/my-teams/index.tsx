// app/my-teams/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyTeamCard from "@/components/manager/MyTeamCard";
import theme from "@/constants/theme";
import { useRouter } from "expo-router";

const MyTeamsScreen = () => {
    const router = useRouter();
  const [teams] = useState([
    {
        id: 1,
      teamName: "Team A",
      totalCost: 210,
      teamLogo: "https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg", // demo
      players: new Array(8).fill("https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png"),
    },
    {
        id: 2,
      teamName: "Team B",
      totalCost: 220,
      teamLogo: "https://i.ibb.co.com/gL2fFy4k/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335-1.jpg",
      players: new Array(8).fill("https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png"),
    },
    {
        id: 3,
      teamName: "Team C",
      totalCost: 210,
      teamLogo: "https://i.ibb.co.com/gL2fFy4k/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335-1.jpg",
      players: new Array(8).fill("https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png"),
    },
  ]);

  return (
    <View style={styles.container}>

      {/* Rank Filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.rankButton}>
          <Text style={styles.rankText}>Rank</Text>
          <Ionicons name="chevron-down" size={16} color={theme.primaryTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={20} color={theme.primaryTextColor} />
        </TouchableOpacity>
      </View>

      {/* Create New Team Button */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create New Team +</Text>
      </TouchableOpacity>

      {/* Teams List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {teams.map((team) => (
          <MyTeamCard
            key={team.id}
            teamName={team.teamName}
            totalCost={team.totalCost}
            teamLogo={team.teamLogo}
            players={team.players}
            onSelectCaptain={() => console.log("Select Captain", team.teamName)}
            onEditTeam={() => router.push(`/managers/my-teams/edit-team/${team.id}`)}  
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },

  // Filter row
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
    marginBottom: 16,
    gap:10,
  },
  rankButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primaryCardColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: theme.secondaryTextColor,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: -1 },
    shadowRadius: 8,
    elevation: 5,
  },
    rankText: { color: theme.primaryTextColor, marginRight: 6, fontSize: 16 },
   sortButton: {
    borderRadius: 10,
    backgroundColor: theme.primaryCardColor,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: theme.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },

  // Create new team
  createButton: {
    backgroundColor: theme.goldenTextDark,
    width: "65%",
    alignSelf: "center",  
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    margin: 16,
    shadowColor: theme.goldenTextDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  createButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MyTeamsScreen;
