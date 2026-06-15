import { Stack } from "expo-router";

export default function EditLayout() {
  return <Stack screenOptions={{ 
    headerStyle: {
      backgroundColor: '#2c2f36',
    },
  }} >
  <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
}
