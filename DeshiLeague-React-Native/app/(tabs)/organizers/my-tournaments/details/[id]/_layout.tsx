import { Stack } from "expo-router";
import HeaderWithBack from "@/components/common/HeaderWithBack";

export default function MyTournamentLayout() {
  return <Stack screenOptions={{ 
    headerStyle: {
      backgroundColor: '#2c2f36',
    },

  }} >
    <Stack.Screen name="index" options={{ 
      headerShown: true,
      headerTitle: '',
      headerTitleAlign: 'left',
      gestureEnabled: false,
      headerLeft: () => <HeaderWithBack title="Tournament Details" />,
     }} />
  </Stack>;
}
