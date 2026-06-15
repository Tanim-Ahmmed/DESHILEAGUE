import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';
import { FormInput } from '@/components/forms';
import { StatusBar } from 'expo-status-bar';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';

const TournamentScreen = () => {
    const router = useRouter();
  const { control } = useForm();
  const tournaments = [
    {
      id: 1,
      name: 'Tournament A',
      location: 'Dhaka',
      overs: '10 Overs',
      coins: '1250 Coins',
      entryFee: 70,
      image: 'https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg'
    },
    {
      id: 2,
      name: 'Tournament B',
      location: 'Dhaka',
      overs: '10 Overs',
      coins: '1250 Coins',
      entryFee: 70,
      image: 'https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg'
    },
    {
      id: 3,
      name: 'Tournament C',
      location: 'Dhaka',
      overs: '10 Overs',
      coins: '1250 Coins',
      entryFee: 70,
      image: 'https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg'
    },
    {
      id: 4,
      name: 'Tournament D',
      location: 'Dhaka',
      overs: '10 Overs',
      coins: '1250 Coins',
      entryFee: 70,
      image: 'https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg'
    },
    {
      id: 5,
      name: 'Tournament E',
      location: 'Dhaka',
      overs: '10 Overs',
      coins: '1250 Coins',
      entryFee: 70,
      image: 'https://i.ibb.co.com/4wjnw977/c9203ca87c862a7a5143fc7878d4168828594aa9.jpg'
    }
  ];

  const FilterButton = ({ title }: { title: string }) => (
    <TouchableOpacity style={styles.filterButton}
     
    >
      <Text style={styles.filterButtonText}>{title}</Text>
      <Ionicons name="chevron-down" size={16} color={theme.primaryTextColor} />
    </TouchableOpacity>
  );

  const TournamentCard = ({ tournament }: { tournament: any }) => (
    <TouchableOpacity style={styles.tournamentCard}
     onPress={() => router.push(`/managers/tournament-list/tournament-details/${tournament.id}` as any)}
    >
      <View style={styles.cardContent}>
        <Image 
          source={{ uri: tournament.image }} 
          style={styles.tournamentImage}
          defaultSource={{ uri: 'https://via.placeholder.com/60x60/FF6B35/ffffff?text=Cricket' }}
        />
        
        <View style={styles.tournamentInfo}>
          <Text style={styles.tournamentName}>{tournament.name}</Text>
          <Text style={styles.tournamentLocation}>{tournament.location}</Text>
          <Text style={styles.tournamentOvers}>{tournament.overs}</Text>
          
          <View style={styles.coinsContainer}>
            <Ionicons name="diamond" size={16} color="#FFD700" />
            <Text style={styles.coinsText}>{tournament.coins}</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <View style={styles.entryFeeContainer}>
            <View style={styles.entryFeeCircle}>
              <Text style={styles.dollarSign}>$</Text>
            </View>
            <Text style={styles.entryFeeText}>{tournament.entryFee}</Text>
          </View>
          
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
  
     

      {/* Search Bar */}
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <FormInput
         control={control}
          name="search"
          label=""
          placeholder="Search tournaments"
          placeholderTextColor={theme.secondaryTextColor}
          leftIcon={<Ionicons name="search" size={20} color={theme.secondaryTextColor} />}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <FilterButton title="Area" />
          <FilterButton title="Overs" />
          <FilterButton title="Entry Fee" />
        </View>
        
        <View style={styles.filtersRow}>
          <FilterButton title="Match Type" />
          <FilterButton title="Prize Pool" />
        </View>
      </View>

      {/* Tournament List */}
      <ScrollView style={styles.tournamentsList} showsVerticalScrollIndicator={false}>
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  chatButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatDots: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 20,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.darkest,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
    shadowColor: theme.secondaryTextColor,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: -1 },
    shadowRadius: 8,
    elevation: 5,
  },
  filterButtonText: {
    color: theme.primaryTextColor,
    fontSize: 16,
    marginRight: 5,
  },
  tournamentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tournamentCard: {
    backgroundColor: theme.primaryCardColor,
    borderColor:'#434952',
    borderWidth:1,
    borderRadius: 15,
    marginBottom: 5,
    overflow: 'hidden',
    shadowColor: theme.black,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  tournamentImage: {
    width: 74,
    height: "100%",
    borderRadius: 10,
    marginRight: 15,
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tournamentLocation: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 4,
  },
  tournamentOvers: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 8,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinsText: {
    color: theme.goldenTextDark,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  rightSection: {
    alignItems: 'center',
  },
  entryFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryFeeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.goldenTextDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  dollarSign: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  entryFeeText: {
    color: theme.goldenTextDark,
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  joinButton: {
    backgroundColor: theme.goldenTextDark,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  joinButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#3A3A3A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    padding: 5,
  },
});

export default TournamentScreen;