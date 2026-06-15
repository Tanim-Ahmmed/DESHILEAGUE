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
      headerLeft: () => <HeaderWithBack title="My Tournament" />,
     }} />
    <Stack.Screen name="details/[id]/index" options={{         headerShown:true ,
      headerTitle: '',
      headerTitleAlign: 'left',
      gestureEnabled: false,
      headerLeft: () => <HeaderWithBack title="Tournament Details" />,
     }} />

    <Stack.Screen name="[id]/index" options={{ headerShown:true , headerTitle: '',
    headerTitleAlign: 'left',
    gestureEnabled: false,
    headerLeft: () => <HeaderWithBack title="Edit Tournament" />}} />
    <Stack.Screen name="fixture/index" options={{ headerShown:true , headerTitle: '',
    headerTitleAlign: 'left',
    gestureEnabled: false,
    headerLeft: () => <HeaderWithBack title="Fixture Tree" />}} />

    <Stack.Screen name="hire-requests/index" options={{ headerShown:false}} />


    <Stack.Screen name="fixture/details/index" options={{ headerShown:true , headerTitle: '',
    headerTitleAlign: 'left',
    gestureEnabled: false,
    headerLeft: () => <HeaderWithBack title="Match Setup" />}} />
  </Stack>;
}
