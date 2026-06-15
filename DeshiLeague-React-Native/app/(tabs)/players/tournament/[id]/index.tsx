import InfoCard from "@/components/player/InfoCard";
import TeamCard from "@/components/player/TeamCard";
import BackButton from "@/components/shared/BackButton";
import ContentTitle from "@/components/shared/ContentTitle";
import PageTitle from "@/components/shared/PageTitle";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Animated,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TournamentDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0.8));

  const [tournament] = useState({
    title: `Tournament #${id}`,
    banner:
      "https://img.freepik.com/premium-vector/turnament-trophy-esports-logo-design-premium-gaming-vector_607286-140.jpg",
  });

  const teams = [
    { id: 1, name: "Team A", image: require("@/assets/images/friends.png") },
    { id: 2, name: "Team B", image: require("@/assets/images/friends.png") },
    { id: 3, name: "Team C", image: require("@/assets/images/friends.png") },
    { id: 4, name: "Team D", image: require("@/assets/images/friends.png") },
    { id: 5, name: "Team E", image: require("@/assets/images/friends.png") },
  ];

  const handleWithdraw = () => {
    console.log("Participant Withdrawn");
    setShowModal(false);
    // API call can be added here
  };

  const openModal = () => {
    setShowModal(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  return (
    <View style={styles.container}>
        {/* <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <PageTitle title="Tournament Details" />
        </View> */}
      <ScrollView nestedScrollEnabled 
       showsVerticalScrollIndicator={false}
      >
        {/* Header */}
      

        {/* Tournament Banner */}
        <ImageBackground
          source={{ uri: tournament.banner }}
          style={styles.tournamentCard}
          resizeMode="cover"
        >
          <View style={styles.upcomingBadge}>
            <Text style={styles.badgeText}>Upcoming</Text>
          </View>
        </ImageBackground>

        {/* Tournament Info */}
        <InfoCard
          title="Premier League"
          rightTitle="Organized by - Anik"
          data={[
            { label: "Entry Fee", value: "80" },
            { label: "Total Teams", value: "10" },
            { label: "Jun 24, 2025 at 10:00 AM" },
            { label: "Kolabagan Field" },
          ]}
        />

        <InfoCard
          title="Prize Pool"
          data={[
            { label: "Total", value: "1300" },
            { label: "Fast Bowler", value: "100" },
            { label: "Winner", value: "300" },
            { label: "MOTM", value: "200" },
            { label: "Runners Up", value: "200" },
          ]}
        />

        <InfoCard
          title="Tournament Rules"
          data={[
            { label: "Running", value: "Allowed" },
            { label: "Pitch", value: "Long" },
            { label: "Fast Bowling", value: "Allowed" },
            { label: "10 overs" },
            { label: "6 Runs", value: "Allowed" },
          ]}
        />

        {/* Teams */}
        <ContentTitle title="Teams" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {teams.map((team) => (
            <TeamCard key={team.id} image={team.image} name={team.name} />
          ))}
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>
            No cancellation allowed within 12 hours of start
          </Text>
          <PrimaryButton title="Withdraw Participation" onPress={openModal} />
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}
          >
            {/* Close Icon */}
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Text style={{ color: "#aaa", fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            {/* Red Circle with X */}
            <View style={styles.errorCircle}>
              <Text style={styles.errorX}>✕</Text>
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>
              Are you sure you want to {"\n"} withdraw your participation?
            </Text>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.withdrawButton]}
                onPress={handleWithdraw}
              >
                <Text style={styles.withdrawText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1a1a1a",
  },

  tournamentCard: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  upcomingBadge: {
    backgroundColor: "rgba(110, 106, 106, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    margin: 10,
  },

  badgeText: {
    color: "#fff",
  },

  bottomSection: {
    alignItems: "center",
    marginVertical: 20,
  },

  bottomText: {
    color: "#aaa",
    marginBottom: 10,
    textAlign: "center",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#2b2b2b",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 12,
  },
  errorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  errorX: {
    color: "red",
    fontSize: 28,
    fontWeight: "bold",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "#2b2b2b",
     borderRadius:24,
  },
  withdrawButton: {
    backgroundColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius:24,
  },
  cancelText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  withdrawText: {
    color: "#1a1a1a",
    fontWeight: "bold",
  },
});
