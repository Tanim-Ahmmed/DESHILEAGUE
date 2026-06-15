import { Stack } from 'expo-router'
import HeaderWithBack from '@/components/common/HeaderWithBack'


const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2c2f36',
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="My Profile and Settings" />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="Edit Your Profile" />,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  )
}

export default ProfileLayout
