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
          headerShown:false
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown:false
        }}
      />

    </Stack>
  )
}

export default ProfileLayout
