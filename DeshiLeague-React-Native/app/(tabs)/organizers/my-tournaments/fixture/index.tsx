import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg'; // Add Circle import

import { useRouter } from 'expo-router';
import UpcomingMatchesSlider from '@/components/specific/tournament/UpcomingMatchesSlider';
import theme from '@/constants/theme';

const router = useRouter();
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FixtureTree = () => {
  const matches = [
    {
      id: 1,
      title: 'Match#1',
      date: 'Jun 21, 10:00 AM',
      teams: 'Team A vs Com',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Match#2',
      date: 'Jun 21, 10:00 AM',
      teams: 'Team B vs Dom',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Match#3',
      date: 'Jun 21, 10:00 AM',
      teams: 'Team C vs Team D',
      status: 'Start Match',
    },
    {
      id: 4,
      title: 'Match#4',
      date: 'Jun 21, 10:00 AM',
      teams: 'Team E vs Team F',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Match#5',
      date: 'Jun 21, 10:00 AM',
      teams: 'Team G vs Team H',
      status: 'Completed',
    },
    {
      id: 6,
      title: 'Match#6',
      date: 'Jun 21, 10:00 AM',
      teams: 'Team I vs Team J',
      status: 'Start Match',
    }
  ];

  const handleStartMatch = (id: string) => {
    router.push(`/organizers/my-tournament/fixture/${id}`);
  };

  const isSmallDevice = screenWidth < 380;
  const isMediumDevice = screenWidth >= 380 && screenWidth < 500;
  const cardHeight = isSmallDevice ? 120 : isMediumDevice ? 130 : 140;
  const cardGap = isSmallDevice ? 15 : 20;
  const lineContainerWidth = isSmallDevice ? 50 : isMediumDevice ? 60 : 80;

  const MatchCard = ({ match } : { match: any }) => (
    <View style={[styles.matchCard, { height: cardHeight }]}>
      <Text style={styles.matchTitle}>{match.title}</Text>
      <Text style={styles.matchDate}>{match.date}</Text>
      <Text style={styles.matchTeams}>{match.teams}</Text>
      
      <View style={styles.statusContainer}>
        {match.status === 'Completed' && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
        {match.status === 'Start Match' && (
          <TouchableOpacity style={styles.startButton} onPress={() => {handleStartMatch(match.id.toString())}}>
            <Text style={styles.startButtonText}>Start Match</Text>
          </TouchableOpacity>
        )}
        {match.status === 'Upcoming' && (
          <View style={styles.upcomingBadge}>
            <Text style={styles.upcomingText}>Upcoming</Text>
          </View>
        )}
      </View>
    </View>
  );

  const ConnectingLines = () => {
    const totalHeight = cardHeight * 2 + cardGap;
    const midPoint = totalHeight / 2;
    const cardMidPoint = cardHeight / 2;
    const strokeWidth = isSmallDevice ? 2 : 2.5;
    const cornerRadius = 8;
    
    return (
      <View style={[styles.linesContainer, { width: lineContainerWidth }]}>
        <Svg 
          width={lineContainerWidth}
          height={totalHeight}
          viewBox={`0 0 ${lineContainerWidth} ${totalHeight}`}
          style={styles.svgContainer}
        >
          {/* Top connecting line */}
          <Path
            d={`M 5 ${cardMidPoint}
               L ${lineContainerWidth * 0.5} ${cardMidPoint}
               Q ${lineContainerWidth * 0.6} ${cardMidPoint} ${lineContainerWidth * 0.6} ${cardMidPoint + cornerRadius}
               L ${lineContainerWidth * 0.6} ${midPoint - cornerRadius}
               Q ${lineContainerWidth * 0.6} ${midPoint} ${lineContainerWidth * 0.7} ${midPoint}
               L ${lineContainerWidth - 5} ${midPoint}`}
            stroke="#777777"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Bottom connecting line */}
          <Path
            d={`M 5 ${cardHeight + cardGap + cardMidPoint}
               L ${lineContainerWidth * 0.5} ${cardHeight + cardGap + cardMidPoint}
               Q ${lineContainerWidth * 0.6} ${cardHeight + cardGap + cardMidPoint} ${lineContainerWidth * 0.6} ${cardHeight + cardGap + cardMidPoint - cornerRadius}
               L ${lineContainerWidth * 0.6} ${midPoint + cornerRadius}
               Q ${lineContainerWidth * 0.6} ${midPoint} ${lineContainerWidth * 0.7} ${midPoint}
               L ${lineContainerWidth - 5} ${midPoint}`}
            stroke="#777777"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Connection points (small circles) - Now using Circle component */}
          <Circle 
            cx="5" 
            cy={cardMidPoint} 
            r="3" 
            fill="#777777"
          />
          <Circle 
            cx="5" 
            cy={cardHeight + cardGap + cardMidPoint} 
            r="3" 
            fill="#777777"
          />
          <Circle 
            cx={lineContainerWidth - 5} 
            cy={midPoint} 
            r="3" 
            fill="#777777"
          />
        </Svg>
      </View>
    );
  };

  const renderTournamentRound = (roundMatches: any, roundNumber: any) => {
    if (roundMatches.length < 3) return null;
    
    const leftMatches = roundMatches.slice(0, 2);
    const rightMatch = roundMatches[2];

    return (
      <View key={roundNumber} style={[styles.tournamentLayout, { minHeight: cardHeight * 2 + cardGap + 40 }]}>
        {/* Left Column */}
        <View style={[styles.leftColumn, { gap: cardGap }]}>
          {leftMatches.map((match: any) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </View>

        {/* Connecting Lines */}
        <ConnectingLines />

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <MatchCard match={rightMatch} />
        </View>
      </View>
    );
  };

  // Group matches into rounds of 3
  const groupMatchesIntoRounds = () => {
    const rounds = [];
    for (let i = 0; i < matches.length; i += 3) {
      const roundMatches = matches.slice(i, i + 3);
      if (roundMatches.length === 3) {
        rounds.push(roundMatches);
      }
    }
    return rounds;
  };

  const rounds = groupMatchesIntoRounds();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Render all tournament rounds */}
        {rounds.map((roundMatches: any, index: any) => 
          renderTournamentRound(roundMatches, index)
        )}

        <UpcomingMatchesSlider />
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={[styles.goLiveButton, styles.primaryButton]}>
            <Ionicons name="play-circle" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.goLiveText}>Go Live</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.viewResultsButton, styles.secondaryButton]}>
            <Ionicons name="trophy-outline" size={20} color="#EAB50F" style={styles.buttonIcon} />
            <Text style={styles.viewResultsText}>View Results</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerRight: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 30,
  },
  tournamentHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  tournamentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  tournamentSubtitle: {
    fontSize: 14,
    color: '#4a90e2',
    fontWeight: '500',
  },
  tournamentLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 10,
  },
  leftColumn: {
    flex: 2.5,
  },
  linesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  svgContainer: {
    overflow: 'visible',
  },
  rightColumn: {
    flex: 2.5,
    justifyContent: 'center',
  },
  matchCard: {
    backgroundColor: '#2B2D34',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1.5,
    borderColor: theme.primaryTextColor,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 5,
  },
  matchTitle: {
    fontSize: screenWidth < 380 ? 14 : 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  matchDate: {
    fontSize: screenWidth < 380 ? 10 : 12,
    color: '#888',
    marginBottom: 8,
    fontWeight: '500',
  },
  matchTeams: {
    fontSize: screenWidth < 380 ? 12 : 14,
    color: '#e0e0e0',
    marginBottom: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  statusContainer: {
    alignSelf: 'center',
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4caf50',
    marginBottom: 8,
  },
  completedText: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  startButton: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  upcomingBadge: {
    backgroundColor: 'rgba(74, 144, 226, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  upcomingText: {
    color: '#4a90e2',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#EAB50F',
    shadowColor: '#EAB50F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1.5,
    borderColor: '#EAB50F',
  },
  goLiveButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goLiveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  viewResultsButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewResultsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default FixtureTree;