import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import TournamentSlider from '@/components/specific/tournament/TournamentSlider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '@/components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';
import DollarIcon from '@/assets/icons/DollarIcon';
import NotificationIcon from '@/assets/icons/NotificationIcon';
import FilterIcon from '@/assets/icons/FilterIcon';
import CreatePlusIcon from '@/assets/icons/CreatePlusIcon';
import TournamentSliderOrg from '@/components/specific/tournament/TournamentSliderOrg';


const HomeScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Runs'); 
  
  const sliderData = [
    {
      id: '1',
      status: 'Live',
      title: 'Tournament 1',
      image: "https://i.ibb.co.com/mVgxLsMH/e0b0aa123b197156d5b296b9568ead7ac644a6a5.png",
    },
    {
      id: '2',
      title: 'Tournament 2',
      status: 'Starting Soon',
      image: "https://i.ibb.co.com/W93mcDz/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335.jpg",
    },
    {
      id: '3',
      title: 'Tournament 3',
      status: 'Tomorrow',
      image: "https://i.ibb.co.com/mVgxLsMH/e0b0aa123b197156d5b296b9568ead7ac644a6a5.png",
    },
  ];

  const playersDataByFilter = {
    Runs: [
      {
        id: '1',
        name: 'Asharful',
        title: 'All-Rounder',
        stats: 'R- 1056 | W- 20',
        image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '2',
        name: 'Rahul',
        title: 'Total Runs',
        stats: '1058',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '3',
        name: 'Shakib',
        title: 'Batsman',
        stats: '945',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
    Wickets: [
      {
        id: '1',
        name: 'Taskin',
        title: 'Fast Bowler',
        stats: '25 Wickets',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '2',
        name: 'Mustafiz',
        title: 'Left Arm Fast',
        stats: '22 Wickets',
        image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '3',
        name: 'Shakib',
        title: 'Spin Bowler',
        stats: '18 Wickets',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
    Matches: [
      {
        id: '1',
        name: 'Tamim',
        title: 'Opening Batsman',
        stats: '45 Matches',
        image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '2',
        name: 'Mushfiq',
        title: 'Wicket Keeper',
        stats: '42 Matches',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '3',
        name: 'Mahmudullah',
        title: 'All Rounder',
        stats: '40 Matches',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
    Ratings: [
      {
        id: '1',
        name: 'Shakib',
        title: 'All Rounder',
        stats: '★ 9.2/10',
        image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '2',
        name: 'Tamim',
        title: 'Batsman',
        stats: '★ 8.9/10',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: '3',
        name: 'Mustafiz',
        title: 'Bowler',
        stats: '★ 8.7/10',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
  };

  const topTeamsData = [
    {
      id: '1',
      name: 'Team A',
      title: 'Total Wins',
      stats: '10',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '2',
      name: 'Team B',
      title: 'Total Wins',
      stats: '8',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '3',
      name: 'Team C',
      title: 'Total Wins',
      stats: '7',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const topOrganizersData = [
    {
      id: '1',
      name: 'Monir',
      title: 'Arranged',
      stats: '15 Tournaments',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '2',
      name: 'Iqbal',
      title: 'Arranged',
      stats: '10 Tournaments',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '3',
      name: 'Rahul',
      title: 'Arranged',
      stats: '9 Tournaments',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const handleNavigateToCreateTournament = () => {
    router.push('/organizers/create' as any);
  };

  const handleNavigateToProfile = () => {
    router.push('/organizers/profile' as any);
  };

  const handleFilterChange = (filter : string) => {
    setActiveFilter(filter);
  };

  const renderFilterButtons = () => {
    const filters = ['Runs', 'Wickets', 'Matches', 'Ratings'];
    
    return (
      <View  style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter}
            style={[
              styles.filterButton, 
              activeFilter === filter && styles.activeFilter
            ]}
            onPress={() => handleFilterChange(filter)}
          >
            <Text style={[
              styles.filterText, 
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderPlayerCard = (player : any, index: number) => (
    <View key={player.id} style={styles.organizerCard}>
      <Image source={{ uri: player.image }} style={styles.organizerImage} />
      <Text style={styles.organizerName}>{player.name}</Text>
      <Text style={styles.organizerTitle}>{player.title}</Text>
      <Text style={styles.organizerStats}>{player.stats}</Text>
    </View>
  );

  const renderTeamCard = (team : any, index: number) => (
    <View key={team.id} style={styles.organizerCard}>
      <Image source={{ uri: team.image }} style={styles.organizerImage} />
      <Text style={styles.organizerName}>{team.name}</Text>
      <Text style={styles.teamTitle}>{team.title}</Text>
      <Text style={styles.organizerStats}>{team.stats}</Text>
    </View>
  );

  const renderOrganizerCard = (organizer : any, index: number) => (
    <View key={organizer.id} style={styles.organizerCard}>
      <Image source={{ uri: organizer.image }} style={styles.organizerImage} />
      <Text style={styles.organizerName}>{organizer.name}</Text>
      <Text style={styles.organizerTitle}>{organizer.title}</Text>
      <Text style={styles.organizerStats}>{organizer.stats}</Text>
    </View>
  );

  const getCurrentPlayersData = () => {
    return playersDataByFilter[activeFilter as keyof typeof playersDataByFilter]  || playersDataByFilter.Runs;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header 
          title="Home" 
          leftComponent={<Ionicons name="chevron-back" size={24} color="white" />} 
          rightComponent={
            <View style={styles.rightContainer}>
              <NotificationIcon/>
              <View style={styles.coinsContainer}>
                <DollarIcon/>
                <Text style={styles.coinsText}>250</Text>
              </View>
              <TouchableOpacity onPress={handleNavigateToProfile}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          } 
        />
      </SafeAreaView>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,{color: theme.primaryTextColor}]}>Tournaments</Text>
          <TournamentSliderOrg
            data={sliderData}
            autoScroll={true}
            autoScrollInterval={5000}
          />
        </View>

        <View style={styles.createButtonContainer}>
            <TouchableOpacity style={styles.createButton} onPress={handleNavigateToCreateTournament}>
              <Text style={styles.createText}>Create Tournament</Text>
              <CreatePlusIcon/>
            </TouchableOpacity>
          </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: theme.primaryTextColor}]}>Top Players</Text>
            <TouchableOpacity style={styles.filterIcon}>
              <FilterIcon/>
              <Text style={styles.filterByText}>Filter by</Text>
            </TouchableOpacity>
          </View>
          
          {renderFilterButtons()}
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.cardsContainer}>
              {getCurrentPlayersData().map((player, index) => renderPlayerCard(player, index))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle,{color: theme.primaryTextColor}]}>Top Teams</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.cardsContainer}>
              {topTeamsData.map((team, index) => renderTeamCard(team, index))}
            </View>
          </ScrollView>
        </View>
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle,{color: theme.primaryTextColor}]}>Top Organizers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.cardsContainer}>
              {topOrganizersData.map((organizer, index) => renderOrganizerCard(organizer, index))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  coinsText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#EAB50F',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  section: {
    padding: 12,
  },
createButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 23,
},
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    gap: 15,
    backgroundColor: theme.primaryCardColor,
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.borderPrimary,
  },
  createText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FDFDFD',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  filterIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 6,
  },
  filterByText: {
    color: '#A1A4A8',
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 6,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1C1F22',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1C1F22',
  },
  activeFilter: {
    backgroundColor: '#363B3F',
    borderColor: '#1C1F22',
  },
  filterText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  horizontalScroll: {
   
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  organizerCard: {
    backgroundColor: '#2B2D34',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    width: 110,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#434952',
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 3,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
    color:"#FFFFFF"
  },
 teamTitle: {
    fontSize: 14,
    marginBottom: 5,
    color:"#FFFFFF"
  },
  organizerTitle: {
    fontSize: 14,
    marginBottom: 5,
    color:"#FFFFFF"
  },
  organizerStats: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color:"#FFFFFF"
  },
});

export default HomeScreen;