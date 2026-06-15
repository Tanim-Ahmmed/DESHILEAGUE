import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
    const router = useRouter();
    const onPressPlayer = () => {
        router.navigate('/(tabs)/players');
    };
    const onPressManager = () => {
        router.navigate('/(tabs)/managers');
    };
    const onPressOrganizer = () => {
        router.navigate('/(tabs)/organizers');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressPlayer} style={styles.container} >
                <Text style={styles.text}>Home Player</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressManager} style={styles.container} >
                <Text style={styles.text}>Home Manager</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressOrganizer} style={styles.container} >
                <Text style={styles.text}>Home Organizer</Text>
            </TouchableOpacity>
        </View>
    );
};  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default HomeScreen;