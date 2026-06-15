import { Stack } from "expo-router";
import HeaderWithBack from "@/components/common/HeaderWithBack";

export default function CreateLayout() {
  return <Stack screenOptions={{ 
    headerStyle: {
      backgroundColor: '#2c2f36',
    },
    headerTitle: '',
    headerTitleAlign: 'left',
    gestureEnabled: false,
    headerLeft: () => <HeaderWithBack title="Create Tournament" />,
  }} />;
}
