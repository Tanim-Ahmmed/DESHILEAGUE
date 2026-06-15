import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TournamentIcon from '@/assets/icons/TournamentIcon';
import OrganizersProfileIcons from '@/assets/icons/OrganizersProfileIcons';
import TournamentActiveIcons from '@/assets/icons/TournamentActiveIcons';
import MyTournamentIcon from '@/assets/icons/MyTournamentIcon';
import MultipulProfileIcons from '@/assets/icons/MultipulProfileIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#EAB50F', 
        tabBarInactiveTintColor: '#000', 
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#434952',
            borderTopWidth: 0, 
            elevation: 0, 
          },
          default: {
            backgroundColor: '#434952',
            borderTopWidth: 0, 
            elevation: 0, 
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tournament-list"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MyTournamentIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-teams"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MultipulProfileIcons color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-tournament"
        options={{
          title: '',
          tabBarIcon: ({ focused,color }) => focused ? (
            <TournamentActiveIcons color={color} />
           ) : (
            <TournamentIcon color={color} />
           ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <OrganizersProfileIcons color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-teams/create-team/index"
        options={{
          href: null, 
        }}
      />
      <Tabs.Screen
        name="my-tournament/details/[id]/index"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}
