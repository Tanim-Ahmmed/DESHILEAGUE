import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { FormInput } from '@/components/forms/FormInput'; // Adjust import path as needed
import { useRouter } from 'expo-router';

interface ProfileFormData {
  organizerName: string;
  fieldAddress: string;
  fieldName: string;
  umpireContact: string;
}

const ProfileDetailScreen = () => {
    const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      organizerName: '',
      fieldAddress: '',
      fieldName: '',
      umpireContact: '',
    }
  });

  const [availableItems, setAvailableItems] = useState({
    bat: false,
    gloves: false,
    ball: false,
    stamp: false,
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fieldImage, setFieldImage] = useState<string | null>(null);

  const toggleItem = (item: keyof typeof availableItems) => {
    setAvailableItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleProfileImagePicker = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFieldImagePicker = () => {
    Alert.alert(
      'Select Field Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleGoogleMap = () => {
    console.log('Open Google Maps');
    Alert.alert('Google Maps', 'Opening Google Maps...');
  };

  const handleBack = () => {
    console.log('Back pressed');
  };

  const onSubmit = (data: ProfileFormData) => {
    const formData = {
      ...data,
      availableItems,
      profileImage,
      fieldImage,
    };
    
    console.log('Form Submitted:', formData);
    Alert.alert('Success', 'Profile completed successfully!');
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Profile Setup',
      'Are you sure you want to skip profile setup?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: () => console.log('Skipped') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2a2a2a" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity onPress={handleProfileImagePicker} style={styles.profilePictureWrapper}>
            <View style={styles.profilePicture}>
              <Ionicons name="person" size={40} color="#FFC107" />
            </View>
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#2a2a2a" />
            </View>
          </TouchableOpacity>
          <Text style={styles.addProfileText}>Add Profile Picture +</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Organizer Name */}
          <View style={styles.inputWrapper}>
            <FormInput
              control={control}
              name="organizerName"
              label="Organizer Name"
              placeholder="Enter your full name"
              placeholderTextColor="#888888"
              rules={{
                required: 'Organizer name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              }}
              error={errors.organizerName}
              containerStyle={styles.inputContainer}
            />
          </View>

          {/* Field Address */}
          <View style={styles.inputWrapper}>
            <View style={styles.addressContainer}>
              <FormInput
                control={control}
                name="fieldAddress"
                label="Field Address"
                placeholder="Enter the field's detailed address"
                placeholderTextColor="#888888"
                leftIcon={<Ionicons name="location" size={20} color="#888888" />}
                rules={{
                  required: 'Field address is required',
                  minLength: {
                    value: 10,
                    message: 'Please enter a detailed address'
                  }
                }}
                error={errors.fieldAddress}
                containerStyle={styles.inputContainer}
              />
            </View>
            <TouchableOpacity style={styles.mapLink} onPress={handleGoogleMap}>
              <Text style={styles.mapLinkText}>Use Google map</Text>
            </TouchableOpacity>
          </View>

          {/* Field Name */}
          <View style={styles.inputWrapper}>
            <FormInput
              control={control}
              name="fieldName"
              label="Field Name"
              placeholder="Enter filed name"
              placeholderTextColor="#888888"
              rules={{
                required: 'Field name is required',
                minLength: {
                  value: 2,
                  message: 'Field name must be at least 2 characters'
                }
              }}
              error={errors.fieldName}
              containerStyle={styles.inputContainer}
            />
          </View>

          {/* Field Image */}
          <View style={styles.inputWrapper}>
            <Text style={styles.fieldLabel}>Field Image</Text>
            <TouchableOpacity style={styles.imageUploadContainer} onPress={handleFieldImagePicker}>
              <Ionicons name="camera" size={24} color="#888888" />
              <Text style={styles.imageUploadText}>Upload field image</Text>
            </TouchableOpacity>
          </View>

          {/* Available Items */}
                    <View style={styles.inputWrapper}>
            <Text style={styles.fieldLabel}>Available Items</Text>
            <View style={styles.itemsGrid}>
              {[
                { key: "bat", label: "Bat" },
                { key: "gloves", label: "Gloves" },
                { key: "ball", label: "Ball" },
                { key: "stamp", label: "Stamp" },
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
                    {availableItems[
                      item.key as keyof typeof availableItems
                    ] && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <Text style={styles.checkboxLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Umpire's Contact */}
          <View style={styles.inputWrapper}>
            <FormInput
              control={control}
              name="umpireContact"
              label="Umpire's Contact"
              placeholder="Enter umpire's phone no"
              placeholderTextColor="#888888"
              keyboardType="phone-pad"
              rules={{
                required: 'Umpire contact is required',
                pattern: {
                  value: /^[0-9+\-\s()]+$/,
                  message: 'Please enter a valid phone number'
                }
              }}
              error={errors.umpireContact}
              containerStyle={styles.inputContainer}
            />
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => router.push("/organizers/profile")}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profilePictureWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3a3a3a',
    borderWidth: 3,
    borderColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a2a2a',
  },
  addProfileText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '400',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 0,
  },
  fieldLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 8,
  },
  addressContainer: {
    marginBottom: 0,
  },
  mapLink: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 8,
  },
  mapLinkText: {
    color: '#ffffffff',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: "underline",
  },
  imageUploadContainer: {
    backgroundColor: '#434952',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434952',
  },
  imageUploadText: {
    color: '#888888',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '400',
  },
  itemsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  },

  checkboxRow: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '48%',
  marginBottom: 12,
},
checkbox: {
  width: 22,
  height: 22,
  borderRadius: 6,
  borderWidth: 1.5,
  borderColor: '#555',
  backgroundColor: '#2a2a2a',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8,
},
checkboxChecked: {
  backgroundColor: '#FFC107',
  borderColor: '#FFC107',
},
checkboxLabel: {
  color: '#cccccc',
  fontSize: 14,
},
  itemButton: {
    backgroundColor: '#434952',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434952',
  },
  itemButtonSelected: {
    backgroundColor: '#FFC107',
    borderColor: '#FFC107',
  },
  itemText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '400',
  },
  itemTextSelected: {
    color: '#2a2a2a',
    fontWeight: '600',
  },
  bottomButtons: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
  },
  submitButton: {
    backgroundColor: '#FFC107',
    width:"40%",
    alignSelf: 'center',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FFC107',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#2a2a2a',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: "underline",
  },
});

export default ProfileDetailScreen;