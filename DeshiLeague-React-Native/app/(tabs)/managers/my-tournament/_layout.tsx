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
          headerLeft: () => <HeaderWithBack title="My Tournament" />,
        }}
      />
      <Stack.Screen
        name="details/[id]/index"
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title=" Tournament Details" />,
        }}
      />

    </Stack>
  )
}

export default ProfileLayout
