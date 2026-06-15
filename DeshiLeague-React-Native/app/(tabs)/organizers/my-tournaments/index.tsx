import { View, Text, StyleSheet } from "react-native";

const MyTournamentScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Tournament is comming soon     </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#EAB50F',
        fontWeight: 'bold',
    },
})
export default MyTournamentScreen
