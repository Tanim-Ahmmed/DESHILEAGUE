import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface Team {
    name: string;
    logo: string;
}

interface WalkoverModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (winnerTeam: string) => void;
    teams: Team[];
    missingTeam: string;
}

const WalkoverModal: React.FC<WalkoverModalProps> = ({ 
    visible, 
    onClose, 
    onSelect, 
    teams, 
    missingTeam 
}) => {
    // Filter out the missing team to get the opponent
    const availableTeams = teams.filter(team => team.name !== missingTeam);
    const winnerTeam = availableTeams[0]; // The opponent team

    const handleYes = () => {
        onSelect(winnerTeam.name);
    };

    const handleNo = () => {
        onClose();
    };

    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.confirmationHeader}>
                        <Text style={styles.confirmationTitle}>Give Walkover</Text>
                        <Text style={styles.confirmationMessage}>
                            Do you really want to give walkover?
                            {'\n\n'}{missingTeam} is missing, {winnerTeam?.name} will be the winner.
                        </Text>
                        
                        {winnerTeam && (
                            <View style={styles.winnerTeamCard}>
                                <Image source={{ uri: winnerTeam.logo }} style={styles.winnerLogo} />
                                <View style={styles.winnerInfo}>
                                    <Text style={styles.winnerText}>Winner</Text>
                                    <Text style={styles.winnerTeamName}>{winnerTeam.name}</Text>
                                </View>
                                <Text style={styles.trophy}>🏆</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.confirmationActions}>
                        <TouchableOpacity style={styles.noButton} onPress={handleNo}>
                            <Text style={styles.noButtonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
                            <Text style={styles.yesButtonText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 24,
        width: '85%',
        maxHeight: '60%',
    },
    confirmationHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    confirmationTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
    },
    confirmationMessage: {
        fontSize: 16,
        color: '#cccccc',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    winnerTeamCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#404040',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    winnerLogo: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    winnerInfo: {
        flex: 1,
    },
    winnerText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
        marginBottom: 4,
    },
    winnerTeamName: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
    },
    trophy: {
        fontSize: 24,
    },
    confirmationActions: {
        flexDirection: 'row',
        gap: 16,
    },
    noButton: {
        backgroundColor: '#666666',
        borderRadius: 8,
        paddingVertical: 14,
        flex: 1,
        alignItems: 'center',
    },
    noButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    yesButton: {
        backgroundColor: '#F44336',
        borderRadius: 8,
        paddingVertical: 14,
        flex: 1,
        alignItems: 'center',
    },
    yesButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default WalkoverModal;