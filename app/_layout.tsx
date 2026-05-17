import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider } from '../shared/context/AppContext';
import { authService } from '../shared/services/auth.service';
import { useNotifications } from '../shared/hooks/useNotifications';
import { useServices } from '../shared/hooks/useServices';

SplashScreen.preventAutoHideAsync();

function NotificationBootstrap() {
  const { user: userService } = useServices();

  useNotifications({
    onTokenReady: async (token) => {
      const uid = authService.getCurrentUser()?.uid;
      if (uid) await userService.savePushToken(uid, token);
    },
  });

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <AppProvider>
          <NotificationBootstrap />
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style="dark" />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
