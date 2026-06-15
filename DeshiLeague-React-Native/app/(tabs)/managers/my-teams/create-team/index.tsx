import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms";
import TeamPreview from "@/components/manager/TeamPreview";
import AddPlayer from "@/components/manager/AddPlayer";
import theme from "@/constants/theme";
import { useRouter } from "expo-router";

interface PlayerFormData {
  Name: string;
  Location: string;
}

const AddPlayerScreen = () => {
  const router = useRouter();
  const { control } = useForm();
  const { handleSubmit } = useForm<PlayerFormData>();

  const [teams] = useState([
    {
      teamName: "Team A",
      totalCost: 210,
      teamLogo:
        "https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg",
      players: new Array(8).fill(
        "https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png"
      ),
    },
  ]);

  const players = [
    {
      id: "001",
      name: "Ashraful",
      role: "All-rounder",
      rank: 12,
      location: "Dhanmondi",
      runs: 1200,
      sr: 146.2,
      wickets: 15,
      coins: 0,
      image:
        "https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png",
    },
    {
      id: "041",
      name: "Ashraful",
      role: "Bowler",
      rank: 14,
      location: "Dhanmondi",
      runs: 1200,
      sr: 146.2,
      wickets: 15,
      coins: 0,
      image:
        "https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png",
    },
    {
      id: "145",
      name: "Ashraful",
      role: "Batsman",
      rank: 17,
      location: "Dhanmondi",
      runs: 1200,
      sr: 146.2,
      wickets: 15,
      coins: 0,
      image:
        "https://i.ibb.co.com/FbGkzWYs/583a30e776bb470e00844c1c836d1829cf7ddfa2.png",
    },
  ];

  const onSubmit = (data: PlayerFormData) => {
    console.log("Form Data: ", data);
  };

  return (
    <View style={styles.container}>
          
      {/* Search Input */}
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <FormInput
          control={control}
          name="search"
          label=""
          placeholder="Search Players with ID"
          placeholderTextColor={theme.primaryTextColor}
          leftIcon={
            <Ionicons
              name="search"
              size={20}
              color={theme.secondaryTextColor}
            />
          }
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.rankButton}>
          <Text style={styles.rankText}>Area</Text>
          <Ionicons name="chevron-down" size={16} color={theme.primaryTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rankButton}>
          <Text style={styles.rankText}>Rank</Text>
          <Ionicons name="chevron-down" size={16} color={theme.primaryTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rankButton}>
          <Text style={styles.rankText}>Role</Text>
          <Ionicons name="chevron-down" size={16} color={theme.primaryTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons
            name="swap-vertical"
            size={20}
            color={theme.primaryTextColor}
          />
        </TouchableOpacity>
      </View>
<ScrollView showsVerticalScrollIndicator={false}>
      {/* Add Players */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 12 }}>
        {players.map((player, index) => (
          <AddPlayer
  key={index}
  id={player.id}
  name={player.name}
  role={player.role}
  rank={player.rank}
  location={player.location}
  runs={player.runs}
  sr={player.sr}
  wickets={player.wickets}
  coins={player.coins}
  image={player.image}
  onAdd={() =>
    router.push(
      `managers/my-teams/create-team/player-profile/${player.id}` as any
    )
  }
/>

        ))}
      </ScrollView>

      {/* Team Preview */}
      <Text style={styles.previewText}>Team Preview</Text>
    
        <TeamPreview
          teamName={teams[0].teamName}
          totalCost={teams[0].totalCost}
          teamLogo={teams[0].teamLogo}
          players={teams[0].players}
          onSelectCaptain={() =>
            console.log("Select Captain", teams[0].teamName)
          }
          onEditTeam={() => console.log("Edit Team", teams[0].teamName)}
        />
    

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>Save Team</Text>
      </TouchableOpacity>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    alignSelf: "center",
  },
  rankButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primaryCardColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: theme.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  previewText: {
    color: theme.primaryTextColor,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: theme.goldenTextDark,
    width: 160,
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: theme.goldenTextDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: "#2a2a2a",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AddPlayerScreen;
