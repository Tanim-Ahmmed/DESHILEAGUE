import TeamSelectionModal from '@/components/specific/tournament/MatchStatusModal';
import WalkoverModal from '@/components/specific/tournament/WalkoverModal';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

type Team = {
  name: string;
  logo: string;
}

const MatchSetupScreen = () => {
  // Hard Coded Match Data with team logos
  const matchData = {
    id: "1",
    teamA: { 
      name: "Team A", 
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop&crop=center",
      status: "Attended" 
    },
    teamB: { 
      name: "Team B", 
      logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&h=120&fit=crop&crop=center",
      status: "Missing" 
    },
  };

  const [tossWinner, setTossWinner] = useState(matchData.teamA.name);
  const [firstBatting, setFirstBatting] = useState(matchData.teamB.name);
  const [showTossModal, setShowTossModal] = useState(false);
  const [showBattingModal, setShowBattingModal] = useState(false);
  const [showWalkoverModal, setShowWalkoverModal] = useState(false);
  const [teamAStatus, setTeamAStatus] = useState(matchData.teamA.status);
  const [teamBStatus, setTeamBStatus] = useState(matchData.teamB.status);
  const teams = [matchData.teamA, matchData.teamB];

  const handleTeamSelection = (team: Team, type: string ) => {
    if (type === 'toss') {
      setTossWinner(team.name);
      setShowTossModal(false);
    } else {
      setFirstBatting(team.name);
      setShowBattingModal(false);
    }
  };

  // Get selected logo
  const getSelectedTeamLogo = (teamName: string) => {
    const team = teams.find((t) => t.name === teamName);
    return team ? team.logo : teams[0].logo;
  };

  // Toggle team status
  const toggleTeamStatus = (teamType: string) => {
    if (teamType === 'A') {
      setTeamAStatus(teamAStatus === 'Attended' ? 'Missing' : 'Attended');
    } else {
      setTeamBStatus(teamBStatus === 'Attended' ? 'Missing' : 'Attended');
    }
  };

  const handleWalkoverSelection = (winnerTeam: string) => {
    // Handle walkover logic here
    console.log(`Walkover given to: ${winnerTeam}`);
    setShowWalkoverModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* Teams Section */}
        <View style={styles.teamsContainer}>
          <View style={styles.teamCard}>
            <View style={styles.teamInfo}>
              <Image source={{ uri: matchData.teamA.logo }} style={styles.teamLogo} />
              <Text style={styles.teamName}>{matchData.teamA.name}</Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.teamInfo}>
              <Image source={{ uri: matchData.teamB.logo }} style={styles.teamLogo} />
              <Text style={styles.teamName}>{matchData.teamB.name}</Text>
            </View>
          </View>
        </View>

        {/* Team Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Teams-</Text>
          <TouchableOpacity style={styles.statusItem} onPress={() => toggleTeamStatus('A')}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.statusText}>
              {matchData.teamA.name} -{' '}
              <Text style={teamAStatus === 'Attended' ? styles.attendedText : styles.missingText}>
                {teamAStatus}
              </Text>
            </Text>
          </TouchableOpacity>
          
          <View style={styles.statusItemWithButton}>
            <TouchableOpacity style={styles.statusItem} onPress={() => toggleTeamStatus('B')}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.statusText}>
                {matchData.teamB.name} -{' '}
                <Text style={teamBStatus === 'Attended' ? styles.attendedText : styles.missingText}>
                  {teamBStatus}
                </Text>
              </Text>
            </TouchableOpacity>
            
            {teamBStatus === 'Missing' && (
              <TouchableOpacity 
                style={styles.walkoverButton}
                onPress={() => setShowWalkoverModal(true)}
              >
                <Text style={styles.walkoverButtonText}>Give Walkover to Opponent</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Main Content Container with Single Background */}
        <View style={styles.mainContentContainer}>
          {/* Toss and First Innings - EXACT IMAGE DESIGN */}
          <View style={styles.tossContainer}>
            <Text style={styles.tossTitle}>Toss and First Innings</Text>

            {/* Toss Winner Card */}
            <TouchableOpacity 
              style={styles.selectionCard}
              onPress={() => setShowTossModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.selectionHeader}>
                <Text style={styles.selectionLabel}>Toss Winner</Text>
                <Text style={styles.tossIcon}>👍</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{tossWinner}</Text>
                  <View style={styles.iconContainer}>
                    <Image 
                      source={{ uri: getSelectedTeamLogo(tossWinner) }} 
                      style={styles.dropdownIcon} 
                    />
                  </View>
                  <Text style={styles.dropdownArrow}>⌄</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* First Batting Card */}
            <TouchableOpacity 
              style={styles.selectionCard}
              onPress={() => setShowBattingModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.selectionHeader}>
                <Text style={styles.selectionLabel}>First Batting</Text>
                <Text style={styles.batIcon}>🏏</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{firstBatting}</Text>
                  <View style={styles.iconContainer}>
                    <Image 
                      source={{ uri: getSelectedTeamLogo(firstBatting) }} 
                      style={styles.dropdownIcon} 
                    />
                  </View>
                  <Text style={styles.dropdownArrow}>⌄</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Start Match Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.startButton} 
              onPress={() => alert("Match Started 🚀")}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Start Match</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modals */}
        <TeamSelectionModal
          visible={showTossModal}
          onClose={() => setShowTossModal(false)}
          onSelect={handleTeamSelection}
          selectedTeam={tossWinner}
          type="toss"
        />
        <TeamSelectionModal
          visible={showBattingModal}
          onClose={() => setShowBattingModal(false)}
          onSelect={handleTeamSelection}
          selectedTeam={firstBatting}
          type="batting"
        />
        <WalkoverModal
          visible={showWalkoverModal}
          onClose={() => setShowWalkoverModal(false)}
          onSelect={handleWalkoverSelection}
          teams={teams}
          missingTeam={matchData.teamB.name}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teamsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  teamCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamInfo: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  vsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cccccc',
    marginHorizontal: 20,
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    minHeight:'75%'
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingVertical: 2,
  },
  statusItemWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#ffffff',
  },
  attendedText: {
    color: '#4CAF50',
    fontWeight: '500',
    fontSize:16,
  },
  missingText: {
    color: '#F44336',
    fontWeight: '500',
    fontSize:16,
  },
  walkoverButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 10,
  },
  walkoverButtonText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // EXACT IMAGE DESIGN FOR TOSS AND FIRST INNINGS
  tossContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 12,
    gap: 12,
  },
  tossTitle: {
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 16,
    color: '#cccccc',
  },
  selectionCard: {
    backgroundColor: '#404040',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionLabel: {
    fontSize: 16,
    color: '#cccccc',
    fontWeight: '400',
    marginRight: 8,
  },
  tossIcon: {
    fontSize: 18,
  },
  batIcon: {
    fontSize: 18,
  },
  dropdownContainer: {
    backgroundColor: '#404040',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end', // Move content to the right
  },
  dropdownIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignSelf: 'center', // Center align the icon vertically
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginRight: 8, 
  },
  dropdownArrow: {
    fontSize: 20,
    color: '#cccccc',
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8, 
  },
  
  buttonContainer: {
    paddingBottom: 32,
    paddingHorizontal: 60,
    alignSelf: 'center',
  },
  startButton: {
    backgroundColor: '#FFC107',
    borderRadius: 25,
    paddingVertical: 12,
    marginVertical: 40,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#FFC107',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

export default MatchSetupScreen;