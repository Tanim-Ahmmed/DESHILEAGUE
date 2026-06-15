import { Modal, View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";

interface Team {
    name: string;
    logo: string;
}

const teams: Team[] = [
    { name: "Team A", logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop&crop=center" },
    { name: "Team B", logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&h=120&fit=crop&crop=center" },
];

const MatchStatusModal = ({ visible, onClose, onSelect, selectedTeam, type }: { visible: boolean, onClose: () => void, onSelect: (team: Team, type: string) => void, selectedTeam: string, type: string }) => (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Select {type === 'toss' ? 'Toss Winner' : 'First Batting Team'}
          </Text>
          <FlatList
            data={teams}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.teamOption,
                  selectedTeam === item.name && styles.selectedTeamOption,
                ]}
                onPress={() => onSelect(item, type)}
              >
                <Image source={{ uri: item.logo }} style={styles.teamOptionLogo} />
                <Text style={styles.teamOptionText}>{item.name}</Text>
                {selectedTeam === item.name && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#333333',
    },
    backButton: {
      marginRight: 12,
      padding: 4,
    },
    backIcon: {
      fontSize: 24,
      color: '#ffffff',
      fontWeight: '300',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#ffffff',
    },
    teamsContainer: {
      paddingHorizontal: 16,
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
    },
    statusContainer: {
      paddingHorizontal: 16,
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
    },
    missingText: {
      color: '#F44336',
      fontWeight: '500',
    },
    
    tossContainer: {
      paddingHorizontal: 16,
      marginBottom: 40,
    },
    tossTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#cccccc',
      marginBottom: 16,
    },
    selectionCard: {
      backgroundColor: '#333333', 
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    selectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    selectionLabel: {
      fontSize: 14,
      color: '#cccccc',
      fontWeight: '400',
    },
    tossIcon: {
      fontSize: 16,
    },
    batIcon: {
      fontSize: 16,
    },
    dropdownContainer: {
      backgroundColor: '#404040', 
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    dropdownContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Changed to space-between to move content to right
    },
    dropdownIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginLeft: 8, // Changed from marginRight to marginLeft
    },
    dropdownText: {
      fontSize: 14,
      color: '#ffffff',
      fontWeight: '400',
      marginRight: 8, // Added marginRight for spacing
    },
    dropdownArrow: {
      fontSize: 16,
      color: '#cccccc',
      fontWeight: 'bold',
    },
    
    buttonContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
      flex: 1,
      justifyContent: 'flex-end',
    },
    startButton: {
      backgroundColor: '#FFC107',
      borderRadius: 25,
      paddingVertical: 16,
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
    
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#2a2a2a',
      borderRadius: 12,
      padding: 20,
      width: '85%',
      maxHeight: '60%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 20,
    },
    teamOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: '#333333',
    },
    selectedTeamOption: {
      backgroundColor: '#EAB50F', 
    },
    teamOptionLogo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    teamOptionText: {
      fontSize: 16,
      color: '#ffffff',
      flex: 1,
      fontWeight: '500',
    },
    checkmark: {
      fontSize: 18,
      color: '#ffffff',
      fontWeight: 'bold',
    },
    modalCloseButton: {
      backgroundColor: '#666666',
      borderRadius: 8,
      paddingVertical: 12,
      marginTop: 16,
      alignItems: 'center',
    },
    modalCloseText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default MatchStatusModal;