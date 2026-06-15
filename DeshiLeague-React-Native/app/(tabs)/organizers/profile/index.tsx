import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/common/Header';
import LogoutModal from '@/components/specific/profile/LogOutModal';
import { useRouter } from 'expo-router';
import theme from '@/constants/theme';
import DollarIcon from '@/assets/icons/DollarIcon';
import CricketIcon from '@/assets/icons/CricketIcon';

const ProfileSettingsPage: React.FC = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleLogout = () => {
    // Implement logout logic here
    setShowLogoutModal(false);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };
  
  return (
    <View style={styles.container}>
    
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.rankText}>Rank- 12</Text>

        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ashraful</Text>
            <Text style={styles.profileRole}>Organizer</Text>
          </View>
          <View style={styles.coinContainer}>
            <View style={styles.coinIcon}>
              <DollarIcon/>
            </View>
            <Text style={styles.coinAmount}>250</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Matches Organized</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>15</Text>
              <View >
                <CricketIcon/>
              </View>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Collaborated Team</Text>
            <Text style={styles.statValue}>18</Text>
          </View>
        </View>

        <View style={styles.creditCard}>
          <View style={styles.creditLabelContainer}>
          <Text style={styles.creditLabel}>Credit Score</Text>
          <Text style={styles.creditScore}>85/100</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '85%' }]} />
          </View>
        </View>

        <View style={styles.ratingsCard}>
          <Text style={styles.ratingsLabel}>Ratings</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons 
                key={star} 
                name="star" 
                size={24} 
                color={theme.goldenTextColor} 
              />
            ))}
          </View>
          <Text style={styles.reviewsText}>24 Reviews</Text>
          <TouchableOpacity style={styles.viewReviewsButton}>
            <Text style={styles.viewReviewsText}>View Reviews and Ratings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtonContainer}>
          <TouchableOpacity onPress={() => router.push(`/(tabs)/organizers/profile/[id]` as any)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Manage Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Withdraw History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <LogoutModal
        visible={showLogoutModal}
        onClose={handleCloseModal}
        onLogout={handleLogout}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  rankText: {
    color: theme.goldenTextColor,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: theme.primaryCardColor,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#444',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: theme.secondaryTextColor,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileRole: {
    color: theme.primaryTextColor,
    fontSize: 16,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primaryCardColor,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },
  coinIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  coinSymbol: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  coinAmount: {
    color: theme.goldenTextDark,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: theme.goldenTextDark,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primaryCardColor,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  statLabel: {
    color: theme.primaryTextColor,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '600',
  },
  iconContainer: {
    padding: 4,
  },
  creditCard: {
    width: '50%',
    backgroundColor: theme.primaryCardColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  creditLabelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  creditLabel: {
    color: theme.primaryTextColor,
    fontSize: 16,
    fontWeight: '600',
  },
  creditScore: {
    color: theme.goldenTextDark,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderColor: theme.primaryTextColor, 
    borderWidth: 0.5,
    borderRadius: 3,
    overflow: 'hidden',
    padding:1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  ratingsCard: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: theme.primaryCardColor,
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  ratingsLabel: {
    color: theme.primaryTextColor,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 4,
  },
  reviewsText: {
    color: theme.primaryTextColor,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  viewReviewsButton: {
    backgroundColor: theme.goldenTextColor,
    height: 38,
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewReviewsText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
actionButtonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    height: 44,
    width: "90%",
    backgroundColor: theme.primaryCardColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: theme.secondPrimaryTextColor,
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    height: 44,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.goldenTextColor,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 8,
  },
  logoutButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileSettingsPage;