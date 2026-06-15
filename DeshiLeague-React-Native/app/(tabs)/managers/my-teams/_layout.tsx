import { Stack } from "expo-router";
import HeaderWithBack from "@/components/common/HeaderWithBack";
import HeaderAddPlayer from "@/components/manager/HeaderAddPlayer";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2c2f36",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerTitleAlign: "left",
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="My Teams" />,
        }}
      />
      <Stack.Screen
        name="edit-team/[id]/index"
        options={{
          headerTitle: "",
          headerTitleAlign: "left",
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="Edit Team" />, 
          headerRight: () => <HeaderAddPlayer />,
        }}
      />
      <Stack.Screen
        name="create-team"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;