import { Stack } from "expo-router";
import HeaderWithBack from "@/components/common/HeaderWithBack";

export default function MyTournamentLayout() {
  return <Stack screenOptions={{ 
    headerStyle: {
      backgroundColor: '#2c2f36',
    },

  }} >
    <Stack.Screen name="organizers" options={{ 
      headerShown: false,
     }} />
     <Stack.Screen name="managers" options={{ 
      headerShown: false,
     }} />
     <Stack.Screen name="players" options={{ 
      headerShown: false,
     }} />
  </Stack>;
}
