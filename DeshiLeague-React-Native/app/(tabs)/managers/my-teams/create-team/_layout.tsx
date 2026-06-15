import { Stack } from 'expo-router'
import HeaderWithBack from '@/components/common/HeaderWithBack'


const CreateTeamLayout = () => {
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
            headerShown: true,
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="Add Player" />,
        }}
      />
      <Stack.Screen
        name="player-profile/[id]/index"
        options={{
          headerTitle: '',
            headerShown: true,
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="Player Profile" />,
        }}
      />

    </Stack>
  )
}

export default CreateTeamLayout
