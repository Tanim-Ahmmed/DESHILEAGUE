// app/edit-team/[id]/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import theme from "@/constants/theme";
import TeamEdit from "@/components/manager/TeamEdit";
import PlayerListCard from "@/components/manager/PlayerListCard";

const EditTeamScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [team, setTeam] = useState({
    teamName: "Team D",
    totalCost: 210,
    win: 10,
    teamLogo:
      "https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg",
    players: [
      {
        role: "All-rounder",
        rank: 12,
        name: "Ashraful",
        stats: "R-1400 | SR-146.2 | W-15",
        image: "https://i.pravatar.cc/100?img=11",
      },
      {
        role: "Bowler",
        rank: 10,
        name: "Rahim",
        stats: "R-800 | SR-120.5 | W-25",
        image: "https://i.pravatar.cc/100?img=12",
      },
      {
        role: "Batsman",
        rank: 18,
        name: "Sakib",
        stats: "R-1600 | SR-150.1 | W-5",
        image: "https://i.pravatar.cc/100?img=13",
      },
    ],
  });

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Team Header */}
        <TeamEdit
          teamName={team.teamName}
          totalCost={team.totalCost}
          win={team.win}
          teamLogo={team.teamLogo}
          players={team.players.map((p) => p.image)} // avatar row
          onSelectCaptain={() => console.log("Select Captain", team.teamName)}
        />

        {/* Player List */}
        <Text style={styles.listTitle}>Player List Management</Text>
        {team.players.map((player, index) => (
          <PlayerListCard
            key={index}
            role={player.role}
            rank={player.rank}
            name={player.name}
            stats={player.stats}
            image={player.image}
            onSelect={() => {
              // Remove selected player
              setTeam((prev) => ({
                ...prev,
                players: prev.players.filter((_, i) => i !== index),
              }));
            }}
          />
        ))}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
          <Text style={styles.saveText}>Save Team</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  listTitle: {
    color: theme.primaryTextColor,
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: theme.goldenTextDark,
    width: "40%",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    marginVertical: 20,
    shadowColor: theme.goldenTextDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  saveText: { color: "#000", fontWeight: "700", fontSize: 16 },
});

export default EditTeamScreen;
