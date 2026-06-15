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
import { FormInput } from '@/components/forms/FormInput'; 
import theme from '@/constants/theme';

interface ProfileFormData {
  Name: string;
  Location: string;
}

const ProfileDetailScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      Name: '',
      Location: '',
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
              <Ionicons name="person" size={110} color="#FFC107" />
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
              name="Name"
              label="Name"
              placeholder="Enter your full name"
              placeholderTextColor="#888888"
              rules={{
                required: 'Organizer name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              }}
              error={errors.Name}
              containerStyle={styles.inputContainer}
            />
          </View>

          {/* Field Address */}
          <View style={styles.inputWrapper}>
            <View style={styles.addressContainer}>
              <FormInput
                control={control}
                name="Location"
                label="Location"
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
                error={errors.Location}
                containerStyle={styles.inputContainer}
              />
            </View>
            <TouchableOpacity style={styles.mapLink} onPress={handleGoogleMap}>
              <Text style={styles.mapLinkText}>Use Google map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Buttons */}
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
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },
  profilePictureContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  profilePictureWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 80,
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
    fontSize: 16,
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
    fontWeight: '500',
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
    paddingVertical: 16,
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

  bottomButtons: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
  },
  submitButton: {
    backgroundColor: theme.goldenTextDark,
    width: 160,
    alignSelf: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
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
  submitButtonText: {
    color: '#2a2a2a',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileDetailScreen;