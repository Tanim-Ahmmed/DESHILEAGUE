import { Stack } from 'expo-router'
import HeaderWithBack from '@/components/common/HeaderWithBack'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const ProfileLayout = () => {
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2c2f36',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="Tournament List" />,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => router.push('/')} 
            >
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="details/[id]/index"
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          gestureEnabled: false,
          headerLeft: () => <HeaderWithBack title="Tournament Details" />,
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
