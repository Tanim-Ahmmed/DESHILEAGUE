import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const TournamentDetailsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Tournament Title */}
        <Text style={styles.tournamentTitle}>Cricket Championship B</Text>

        {/* Tournament Card */}
        <ImageBackground
          source={{
            uri: "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg",
          }}
          style={styles.tournamentCard}
          resizeMode="cover"
        >
          <View style={styles.upcomingBadge}>
            <Text style={styles.badgeText}>Upcoming</Text>
          </View>
        </ImageBackground>

        {/* Tournament Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cricketLabel}>Cricket</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Entry Fee :</Text>
            <Text style={styles.entryFee}>80</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Teams :</Text>
            <Text style={styles.totalTeams}>8</Text>
          </View>
          <Text style={styles.dateTime}>Jun 24, 2025 at 10:00 AM</Text>
        </View>

        {/* Teams Section */}
        <View style={styles.teamsSection}>
          <View style={styles.teamsContainer}>
            <Text style={styles.teamsTitle}>Teams</Text>
            {["Team A", "Team B", "Team C"].map((team, index) => (
              <View key={index} style={styles.teamRow}>
                {/* Team Name (50%) */}
                <Text style={styles.teamName}>{team}</Text>

                {/* Buttons Container (50%) */}
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Share message */}
            <View style={styles.shareRow}>
              <Text style={styles.shareText}>
                No teams joined yet! Share your tournament to invite managers!
              </Text>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareIcon}>
                  <Ionicons name="share" size={24} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Auto Fixture */}
        <TouchableOpacity
          style={styles.autoFixtureButton}
          onPress={() => router.push("/organizers/my-tournament/fixture" as any)}
        >
          <View style={styles.autoFixtureTextContainer}>
            <Text style={styles.autoFixtureText}>Fixture</Text>
          </View>
          <Ionicons
            name="arrow-forward"
            size={24}
            color="white"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/organizers/my-tournament/[id]" as any)}
          >
            <Text style={styles.editButtonText}>Edit Tournament</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Tournament</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1E1E1E",
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "300",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  scrollView: {
    flex: 1,
    marginTop: 16,
  },

  // Tournament Title
  tournamentTitle: {
    color: "#A1A4A8",
    fontSize: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontWeight: "400",
  },
  tournamentCard: {
    width: "90%",
    alignSelf: "center",
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
    borderWidth: 2,
    paddingVertical: 4,
    borderRadius: 10,
    margin: 10,
  },
  badgeText: { color: theme.primaryTextColor },

  // Info Card
  infoCard: {
    backgroundColor: theme.primaryCardColor,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    borderWidth: 2,
    borderColor: "#00000033",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  cricketLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    color: theme.primaryTextColor,
    fontSize: 16,
    fontWeight: "500",
  },
  entryFee: {
    color: "#E8B923",
    fontSize: 14,
    fontWeight: "600",
  },
  totalTeams: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  dateTime: {
    color: theme.primaryTextColor,
    fontSize: 15,
    marginTop: 4,
  },

  // Teams Section
  teamsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  teamsTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  teamsContainer: {
    backgroundColor: theme.primaryCardColor,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    borderWidth: 2,
    borderColor: "#00000033",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  teamName: {
    color: theme.primaryTextColor,
    fontSize: 15,
    fontWeight: "500",
    width: "50%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%", 
    gap: 10,
  },
  acceptButton: {
    backgroundColor: "#E8B923",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  acceptButtonText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "600",
  },
  rejectButton: {
    backgroundColor: "#1C1F22",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1C1F22",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 6,
  },
  rejectButtonText: {
    color: theme.secondPrimaryTextColor,
    fontSize: 12,
    fontWeight: "600",
  },

  shareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: "#444444",
  },
  shareText: {
    width: "70%",
    color: "#9E9E9E",
    fontSize: 14,
    alignItems: "center",
    flex: 1,
    lineHeight: 16,
  },
  shareButton: {
    padding: 8,
    marginLeft: 8,
  },
  shareIcon: {
    color: "#9E9E9E",
    fontSize: 18,
    fontWeight: "600",
  },

  autoFixtureButton: {
    backgroundColor: "#2A2A2A",
    width: "80%",
    alignSelf: "center",
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: theme.secondaryTextColor,
    shadowOpacity: 0.1,
    shadowOffset: { width: -2, height: -1 },
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  autoFixtureTextContainer: {
    width: "100%", 
    alignItems: "center", 
  },
  autoFixtureText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  arrowIcon: {
    position: "absolute",
    right: 16, 
    top: "50%",
    transform: [{ translateY: -12 }],
  },

  // Action Buttons
  actionButtons: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  editButton: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#E8B923",
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 24,

    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,

    elevation: 6,
  },
  editButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

export default TournamentDetailsScreen;
