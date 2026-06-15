import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const ACTIVE_TAB_COLOR = "#0A407C"; 
const INACTIVE_TAB_COLOR = "#849FBD"; 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true); 
  const segments = useSegments();
  const router = useRouter();
  
  console.log("isAuthenticated", isAuthenticated);
  console.log("isLoading", isLoading);
  console.log("isFirstTime", isFirstTime);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const hasSeenWelcome = false; 
      
      const userLoggedIn = false; 
      
      setIsFirstTime(!hasSeenWelcome);
      setIsAuthenticated(userLoggedIn);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // useEffect(() => {
  //   if (isLoading) return;

  //   const inAuthGroup = segments[0] === "(auth)";
  //   const inWelcomeScreen = segments[1] === "welcome";

  //   if (isFirstTime && !inWelcomeScreen) {
  //     router.replace("/(auth)/welcome");
  //   } else if (!isAuthenticated && !inAuthGroup && !isFirstTime) {
  //     router.replace("/(auth)/login");
  //   } else if (isAuthenticated && (inAuthGroup || inWelcomeScreen)) {
  //     router.replace("/(tabs)");
  //   }
  // }, [isAuthenticated, segments, isLoading, router, isFirstTime]);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded ) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'
      }}>
        <ActivityIndicator size="large" color={ACTIVE_TAB_COLOR} />
      </View>
    );
  }

  const GlobalTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0A407C",
      background: "#2D2F33",
      // card: "#0A407C",
      // text: "#ffffff",
      // border: "#0A407C",
      // notification: "#0A407C",
    },
  };

  return (  
    <ThemeProvider value={GlobalTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}