import InfoCard from "@/components/player/InfoCard";
import TeamCard from "@/components/player/TeamCard";
import BackButton from "@/components/shared/BackButton";
import ContentTitle from "@/components/shared/ContentTitle";
import PageTitle from "@/components/shared/PageTitle";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WithdrawModal from "@/components/shared/WithdrawModal";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TournamentDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

    const handleNavigateToMyTeams = () => {
    router.push('/managers/my-teams' as any);
  };


  const [tournament] = useState({
    title: `Tournament #${id}`,
    banner:
      "https://i.ibb.co.com/5hdt8xBW/Screenshot-2025-08-23-131443.png",
  });

  const teams = [
    { id: 1, name: "Team A", image: require("@/assets/images/yourTeam.png") },
    { id: 2, name: "Team B", image: require("@/assets/images/yourTeam.png") },
    { id: 3, name: "Team C", image: require("@/assets/images/yourTeam.png") },
    { id: 4, name: "Team D", image: require("@/assets/images/yourTeam.png") },
    { id: 5, name: "Team E", image: require("@/assets/images/yourTeam.png") },
    { id: 6, name: "Team F", image: require("@/assets/images/yourTeam.png") },
    { id: 7, name: "Team G", image: require("@/assets/images/yourTeam.png") },
    { id: 8, name: "Team H", image: require("@/assets/images/yourTeam.png") },
  ];

  const handleWithdraw = () => {
    console.log("Participant Withdrawn");
    setShowModal(false);
    
  };

  return (
    <View style={styles.container}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
            >
        <ImageBackground
          source={{ uri: tournament.banner }}
          style={styles.tournamentCard}
          resizeMode="cover"
        >
          <View style={styles.upcomingBadge}>
            <Text style={styles.badgeText}>Upcoming</Text>
          </View>
        </ImageBackground>

        <InfoCard
          title="Premier League"
          rightTitle="Organized by - Anik"
          data={[
            { label: "Entry Fee :", value: "80" },
            { label: "Total Teams :", value: "10" },
            { label: "Jun 24, 2025 " },
            { label: "Kolabagan Field" },
          ]}
        />

        <InfoCard
          title="Prize Pool"
          data={[
            { label: "Total -", value: "1300" },
            { label: "Fast Bowler -", value: "100" },
            { label: "Winner -", value: "300" },
            { label: "MOTM -", value: "200" },
            { label: "Runners Up -", value: "200" },
          ]}
        />

        <InfoCard
          title="Tournament Rules"
          data={[
            { label: "Running -", value: "Allowed" },
            { label: "Pitch -", value: "Long" },
            { label: "Fast Bowling -", value: "Allowed" },
            { label: "10 overs" },
            { label: "6 Runs -", value: "Allowed" },
          ]}
        />
        <InfoCard
          title="Teams"
          data={[
            { label: "Team A" },
            { label: "Team B" },
            { label: "Team C" },
            { label: "Team D" },
            { label: "Team E" },
            { label: "Team F" },
          ]}
        />
        <View style={styles.bottomSection}>
          <PrimaryButton title="Join Tournament" onPress={handleNavigateToMyTeams} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#24292D",padding:20, },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#24292D",
  },
  tournamentCard: {
    width: "100%",
    height: 152,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  upcomingBadge: {
    backgroundColor: "rgba(28, 27, 27, 0.89)",
    paddingHorizontal: 12,
    borderWidth:2,
    paddingVertical: 4,
    borderRadius: 10,
    margin: 10,
  },
  badgeText: { color: "#ccc" },
  bottomSection: { alignItems: "center", marginVertical: 20 },
  bottomText: { color: "#aaa", marginBottom: 10, textAlign: "center" },
});