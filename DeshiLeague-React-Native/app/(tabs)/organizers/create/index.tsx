import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/FormInput";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CustomSwitch } from "@/components/forms/CustomSwitch";
import * as ImagePicker from "expo-image-picker";
import SuccessModal from "@/components/specific/profile/SuccessModal";
import { useRouter } from "expo-router";
import theme from "@/constants/theme";
import SelectInput from "@/components/forms/SelectInput";
import DollarIcon from "@/assets/icons/DollarIcon";

interface TournamentFormData {
  sportType: string;
  tournamentTitle: string;
  entryFee: string;
  noOfTeams: string;
  fieldDetails: string;
  location: string;
  prizePoolDetails: string;
}

const CreateTournamentScreen: React.FC = () => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [selectedMatchOvers, setSelectedMatchOvers] = useState<number>(5);
  const [selectedNoOfPlayers, setSelectedNoOfPlayers] = useState<number>(5);
  const [sixRunsAllowed, setSixRunsAllowed] = useState(true);
  const [runningBetweenWickets, setRunningBetweenWickets] = useState(false);
  const [fastBowlerAllowed, setFastBowlerAllowed] = useState(true);
  const [autoFixture, setAutoFixture] = useState(true);

  const [selectedSport, setSelectedSport] = useState("Select sport");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentFormData>();

  const router = useRouter();

  const matchOvers = [5, 6, 10];
  const numberOfPlayers = [5, 6, 7, 8, 9, 10];
  const sports = ["Cricket", "Football", "Basketball", "Tennis"];

  // Pick image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Need gallery permissions.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleGoogleMap = () => {
    Alert.alert("Google Maps", "Opening Google Maps...");
  };

  // Remove image
  const removeImage = () => {
    setSelectedImage(null);
  };

  // Dummy upload
  const uploadImage = async (imageUri: string): Promise<string | null> => {
    try {
      setIsUploading(true);
      await new Promise((r) => setTimeout(r, 1500)); // mock delay
      return imageUri;
    } catch {
      Alert.alert("Upload failed");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: TournamentFormData) => {
    let imageUrl = null;
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) return;
    }
    console.log("Tournament Data:", {
      ...data,
      selectedMatchOvers,
      selectedNoOfPlayers,
      sixRunsAllowed,
      runningBetweenWickets,
      fastBowlerAllowed,
      autoFixture,
      selectedSport,
      posterImage: imageUrl,
    });
    setIsSuccessModalVisible(true);
  };

  const SelectionButton: React.FC<{
    value: number;
    isSelected: boolean;
    onPress: () => void;
  }> = ({ value, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.selectionButton, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.selectionText, isSelected && styles.selectedText]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2a2a2a" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <SelectInput
            options={sports}
            label="Tournament Type"
            selected={selectedSport}
            onSelect={setSelectedSport}
            placeholder="Select sport"
          />
        </View>
        {/* Tournament Title */}
        <FormInput
          control={control}
          name="tournamentTitle"
          label="Tournament Title"
          placeholder="Tournament name"
          placeholderTextColor="#888"
          containerStyle={styles.inputContainer}
          // rules={{ required: "Tournament title is required" }}
          error={errors.tournamentTitle}
        />
        {/* Entry Fee and Teams */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <FormInput
              control={control}
              name="entryFee"
              label="Entry Fee"
              placeholderTextColor="#888"
              leftIcon={<DollarIcon stroke="#ffffff" width={20} height={20} />}
              containerStyle={styles.inputContainer}
            />
          </View>
          {/* Match Overs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Match Overs</Text>
            <View style={styles.selectionRow}>
              {matchOvers.map((over) => (
                <SelectionButton
                  key={over}
                  value={over}
                  isSelected={selectedMatchOvers === over}
                  onPress={() => setSelectedMatchOvers(over)}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <FormInput
              control={control}
              name="noOfTeams"
              label="No of Teams"
              placeholder="Min 5 teams"
              placeholderTextColor="#888"
              containerStyle={styles.inputContainer}
            />
          </View>
          <View style={styles.halfWidth}>
            <FormInput
              control={control}
              name="date&time"
              label="Date & Time"
              placeholderTextColor="#888"
              leftIcon={
                <MaterialCommunityIcons
                  name="calendar-clock-outline"
                  size={20}
                  color="#ffffff"
                />
              }
              containerStyle={styles.inputContainer}
            />
          </View>
        </View>
        {/* No of Players */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No of Players</Text>
          <View style={styles.playersGrid}>
            {numberOfPlayers.map((player) => (
              <SelectionButton
                key={player}
                value={player}
                isSelected={selectedNoOfPlayers === player}
                onPress={() => setSelectedNoOfPlayers(player)}
              />
            ))}
          </View>
        </View>
        <FormInput
          control={control}
          name="prizePoolDetails"
          label="Prize Pool Details"
          placeholder="e.g, Total , Winner , runner up, MOTM etc amounts"
          placeholderTextColor="#888"
          containerStyle={styles.inputContainer}
        />{" "}
        {/* Field Details */}{" "}
        <FormInput
          control={control}
          name="fieldDetails"
          label="Field Details"
          placeholder="e.g, Field and pitch type , field size etc"
          placeholderTextColor="#888"
          containerStyle={styles.inputContainer}
        />{" "}
        {/* Toggle Options */}{" "}
        <View style={styles.toggleSection}>
          {" "}
          <View style={styles.toggleRow}>
            {" "}
            <Text style={styles.toggleLabel}>6 Runs Allowed?</Text>{" "}
            <CustomSwitch
              value={sixRunsAllowed}
              onValueChange={setSixRunsAllowed}
              trackColor={{ false: "#444", true: theme.goldenTextDark }}
            />{" "}
          </View>{" "}
          <View style={styles.toggleRow}>
            {" "}
            <Text style={styles.toggleLabel}>
              {" "}
              Running Between Wickets Allowed?{" "}
            </Text>{" "}
            <CustomSwitch
              value={runningBetweenWickets}
              onValueChange={setRunningBetweenWickets}
              trackColor={{ false: "#444", true: theme.goldenTextDark }}
            />{" "}
          </View>{" "}
          <View style={styles.toggleRow}>
            {" "}
            <Text style={styles.toggleLabel}>Fast Bowler Allowed?</Text>{" "}
            <CustomSwitch
              value={fastBowlerAllowed}
              onValueChange={setFastBowlerAllowed}
              trackColor={{ false: "#444", true: theme.goldenTextDark }}
            />{" "}
          </View>{" "}
          <View style={styles.toggleRow}>
            {" "}
            <Text style={styles.toggleLabel}>Auto Fixture?</Text>{" "}
            <CustomSwitch
              value={autoFixture}
              onValueChange={setAutoFixture}
              trackColor={{ false: "#444", true: theme.goldenTextDark }}
            />{" "}
          </View>{" "}
        </View>
        {/* Location */}
        <View>
          <FormInput
            control={control}
            name="location"
            label="Location"
            placeholder="Enter detailed address"
            placeholderTextColor="#888"
            containerStyle={styles.inputContainer}
            leftIcon={
              <FontAwesome6 name="location-dot" size={20} color="#ffffff" />
            }
          />
          <TouchableOpacity style={styles.mapLink} onPress={handleGoogleMap}>
            <Text style={styles.mapLinkText}>Use Google map</Text>
          </TouchableOpacity>
        </View>
        {/* Poster */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tournament Poster</Text>
          {selectedImage ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <View style={styles.imageActions}>
                <TouchableOpacity onPress={pickImage}>
                  <Text style={{ color: theme.goldenTextDark }}>Change</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={removeImage}>
                  <Text style={{ color: "red" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={24} color="#888" />
              <Text style={styles.uploadText}>Upload poster image</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Create Button */}
        <TouchableOpacity
          style={[styles.createButton, isUploading && styles.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={isUploading}
        >
          <Text style={styles.createButtonText}>
            {isUploading ? "Uploading..." : "Create"}
          </Text>
          <SuccessModal
            visible={isSuccessModalVisible}
            onClose={() => setIsSuccessModalVisible(false)}
            onConfirm={() => {
              setIsSuccessModalVisible(false);
              router.push("/organizers");
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  section: { marginBottom: 10 },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "300",
  },
  row: { flexDirection: "row", justifyContent: "space-between", gap: "20%" },
  halfWidth: { flex: 1 },
  inputContainer: { marginBottom: 20 },
  selectionRow: { flexDirection: "row", gap: 10 },
  selectionButton: {
    backgroundColor: "#292E32",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 5,
    borderColor: "#434952",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: theme.goldenTextDark,
    shadowColor: theme.goldenTextColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 3,
  },
  selectionText: { color: "#fff", fontSize: 16 },
  selectedText: { color: "#000" },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  uploadButton: {
    backgroundColor: "#434952",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  toggleSection: { marginBottom: 20 },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  toggleLabel: { color: "#fff", fontSize: 16, fontWeight: 300, flex: 1 },
  uploadText: { color: "#888", fontSize: 16 },
  imageContainer: { backgroundColor: "#434952", borderRadius: 10, padding: 10 },
  selectedImage: { width: "100%", height: 200, borderRadius: 8 },
  imageActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  mapLink: { alignSelf: "flex-end" },
  mapLinkText: {
    color: "#ffffff",
    fontSize: 12,
    paddingRight: 10,
    fontWeight: "300",
    textDecorationLine: "underline",
  },
  createButton: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: theme.goldenTextDark,
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: theme.goldenTextColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
  disabledButton: { opacity: 0.6 },
});

export default CreateTournamentScreen;
