import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface Match {
  id: number;
  matchNumber: string;
  teamA: string;
  teamB: string;
  date: string;
  place: string;
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    matchNumber: 'Match#6',
    teamA: 'TeamC',
    teamB: 'A',
    date: 'July 03, 10:00 AM',
    place: 'Kolabagan',
  },
  {
    id: 2,
    matchNumber: 'Match#7',
    teamA: 'TeamD',
    teamB: 'B',
    date: 'July 05, 2:30 PM',
    place: 'Stadium',
  },
  {
    id: 3,
    matchNumber: 'Match#8',
    teamA: 'TeamE',
    teamB: 'C',
    date: 'July 08, 4:00 PM',
    place: 'Ground',
  },
];

const UpcomingMatchesSlider = ({ data = upcomingMatches }: { data?: Match[] }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {data.map((value) => (
          <View key={value.id} style={styles.matchRow}>
            <View style={styles.column}>
              <Text style={styles.columnHeader}>{value.matchNumber}</Text>
              <Text style={styles.teamText}>
                {value.teamA} vs {value.teamB}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnHeader}>Scheduled</Text>
              <Text style={styles.dateText}>{value.date}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnHeader}>Place</Text>
              <Text style={styles.placeText}>{value.place}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cccccc',
  },
  scrollContainer: {
    paddingRight: 12,
  },
  matchRow: {
    flexDirection: 'row',
    backgroundColor: '#2B2D34',
    marginBottom: 8,
    marginRight: 12,
    height: 80,
    minWidth: 340,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#434952',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: .5,
    shadowRadius: 4,
    elevation: 5,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  columnHeader: {
    color: '#cccccc',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  teamText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  dateText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },
  placeText: {
    color: '#cccccc',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default UpcomingMatchesSlider;
