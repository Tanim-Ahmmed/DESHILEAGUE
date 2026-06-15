import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { FormInput } from "@/components/forms/FormInput"; // Keep for other inputs
import { Picker } from "@react-native-picker/picker"; // Dropdown select

interface ProfileFormData {
  organizerName: string;
  fieldAddress: string;
  fieldName: string;
  umpireContact: string;
  bowlingType?: string;
  bowlingArm?: string;
  battingPosition?: string;
}
const handleProfileImagePicker = () => {
  Alert.alert("Select Profile Picture", "Choose an option", [
    { text: "Camera", onPress: () => console.log("Camera selected") },
    { text: "Gallery", onPress: () => console.log("Gallery selected") },
    { text: "Cancel", style: "cancel" },
  ]);
};

const ProfileDetailScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      organizerName: "",
      fieldAddress: "",
      fieldName: "",
      umpireContact: "",
      bowlingType: "",
      bowlingArm: "",
      battingPosition: "",
    },
  });
  const [isWicketKeeper, setIsWicketKeeper] = useState(false);

  const [availableItems, setAvailableItems] = useState({
    "Left Handed": false,
    "Right Handed": false,
  });

  const toggleItem = (item: keyof typeof availableItems) => {
    setAvailableItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleGoogleMap = () => {
    Alert.alert("Google Maps", "Opening Google Maps...");
  };

  const onSubmit = (data: ProfileFormData) => {
    const formData = {
      ...data,
      availableItems,
    };
    console.log("Form Submitted:", formData);
    Alert.alert("Success", "Profile completed successfully!");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2a2a2a" />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity
            onPress={handleProfileImagePicker}
            style={styles.profilePictureWrapper}
          >
            <View style={styles.profilePicture}>
              <Ionicons name="person" size={40} color="#FFC107" />
            </View>
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#2a2a2a" />
            </View>
          </TouchableOpacity>
          <Text style={styles.addProfileText}>Add Profile Picture +</Text>
        </View>

        {/* Name */}
        <View style={styles.inputWrapper}>
          <FormInput
            control={control}
            name="organizerName"
            label="Name"
            placeholder="Enter your full name"
            placeholderTextColor="#888888"
            rules={{
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            }}
            error={errors.organizerName}
            containerStyle={styles.inputContainer}
          />
        </View>

        {/* Home Town */}
        <View style={styles.inputWrapper}>
          <FormInput
            control={control}
            name="fieldAddress"
            label="Home Town"
            placeholder="Enter your home town details"
            placeholderTextColor="#888888"
            rules={{
              minLength: {
                value: 2,
                message: "Please enter a valid home town",
              },
            }}
            error={errors.fieldAddress}
            containerStyle={styles.inputContainer}
          />
        </View>

        {/* Present Address */}
        <View style={styles.inputWrapper}>
          <FormInput
            control={control}
            name="fieldName"
            label="Present Address"
            placeholder="Enter detailed address"
            placeholderTextColor="#888888"
            rules={{
              minLength: {
                value: 5,
                message: "Please enter a detailed address",
              },
            }}
            error={errors.fieldName}
            containerStyle={styles.inputContainer}
          />
          <TouchableOpacity style={styles.mapLink} onPress={handleGoogleMap}>
            <Text style={styles.mapLinkText}>Use Google map</Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.inputWrapper}>
          <Text style={styles.fieldLabel}>Profile</Text>
          <View style={styles.itemsGrid}>
            {[
              { key: "Left Handed", label: "Left Handed" },
              { key: "Right Handed", label: "Right Handed" },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.checkboxRow}
                onPress={() =>
                  toggleItem(item.key as keyof typeof availableItems)
                }
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.checkbox,
                    availableItems[item.key as keyof typeof availableItems] &&
                      styles.checkboxChecked,
                  ]}
                >
                  {availableItems[item.key as keyof typeof availableItems] && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bowling Type & Arm */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.fieldLabel}>Bowling Type</Text>
            <Controller
              control={control}
              name="bowlingType"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  dropdownIconColor="#fff"
                  style={styles.picker}
                  onValueChange={onChange}
                >
                  <Picker.Item label="Select bowling type" value="" />
                  <Picker.Item label="Fast" value="Fast" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Spin" value="Spin" />
                </Picker>
              )}
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.fieldLabel}>Bowling Arm</Text>
            <Controller
              control={control}
              name="bowlingArm"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  dropdownIconColor="#fff"
                  style={styles.picker}
                  onValueChange={onChange}
                >
                  <Picker.Item label="Select bowling arm" value="" />
                  <Picker.Item label="Left Arm" value="Left Arm" />
                  <Picker.Item label="Right Arm" value="Right Arm" />
                </Picker>
              )}
            />
          </View>
        </View>

        {/* Wicket Keeper */}

        <View style={styles.checkboxTextRow}>
          <Text style={styles.checkboxLabel}>Wicket Keeper?</Text>
          <TouchableOpacity
            style={[styles.checkbox, isWicketKeeper && styles.checkboxChecked]}
            onPress={() => setIsWicketKeeper((prev) => !prev)}
            activeOpacity={0.8}
          >
            {isWicketKeeper && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Batting Position */}
        <View style={styles.inputWrapper}>
          <Text style={styles.fieldLabel}>Batting Position (optional)</Text>
          <Controller
            control={control}
            name="battingPosition"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                dropdownIconColor="#fff"
                style={styles.picker}
                onValueChange={onChange}
              >
                <Picker.Item label="Select batting position" value="" />
                <Picker.Item label="Opener" value="Opener" />
                <Picker.Item label="Top Order" value="Top Order" />
                <Picker.Item label="Middle Order" value="Middle Order" />
                <Picker.Item label="Lower Order" value="Lower Order" />
              </Picker>
            )}
          />
        </View>

        {/* Submit */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2B2D34" },
  scrollContainer: { flex: 1 },
  mapLink: { alignSelf: "flex-end" },
  mapLinkText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "300",
    textDecorationLine: "underline",
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inputWrapper: { marginBottom: 8, paddingHorizontal: 20 },
  inputContainer: { marginBottom: 0 },
  fieldLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 8,
  },

  profilePictureContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profilePictureWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2B2D34",
    borderWidth: 3,
    borderColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2a2a2a",
  },
  addProfileText: {
    color: "#cccccc",
    fontSize: 14,
    fontWeight: "400",
  },

  checkboxRow: {
    flexDirection: "row",
  },
  checkboxTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.2,
    borderColor: "#444",
    backgroundColor: "#434952",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  checkboxChecked: { backgroundColor: "#FFC107", borderColor: "#FFC107" },
  checkboxLabel: { color: "#ccc", fontSize: 15 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  halfInput: { width: "48%" },

  picker: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#434952",
    color: "#FFFFFF80",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },

  bottomButtons: { paddingHorizontal: 20, paddingVertical: 20 },
  submitButton: {
    backgroundColor: "#EAB50F",
    minWidth: 200,
    alignSelf: "center",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#EAB50F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: { color: "#2a2a2a", fontSize: 18, fontWeight: "600" },
});

export default ProfileDetailScreen;
