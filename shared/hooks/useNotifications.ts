// ─────────────────────────────────────────────────────────────
// Call useNotifications() once in the root layout (inside
// ClerkProvider + AppProvider) to:
//   1. Request permission and register the Expo push token
//   2. Handle foreground notification display
//   3. Navigate on notification tap (deep link)
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import type { DeepLinkData } from '../services/notification.service';

// Show notification banners while the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface Options {
  /** Called with the Expo push token once permissions are granted */
  onTokenReady: (token: string) => void;
}

export function useNotifications({ onTokenReady }: Options) {
  const listenerRef = useRef<Notifications.EventSubscription | null>(null);
  const responseRef = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotifications().then((token) => {
      if (token) onTokenReady(token);
    });

    // Foreground notification received — already shown by handler above
    listenerRef.current = Notifications.addNotificationReceivedListener(() => {});

    // User tapped a notification → navigate to the deep-linked screen
    responseRef.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as DeepLinkData;
        navigateToDeepLink(data);
      }
    );

    return () => {
      listenerRef.current?.remove();
      responseRef.current?.remove();
    };
  }, []);
}

// Navigate using the pathname + params that were packed into
// the notification payload by buildPushPayload().
function navigateToDeepLink(data: DeepLinkData) {
  if (!data?.pathname) return;

  if (data.params && Object.keys(data.params).length > 0) {
    router.push({ pathname: data.pathname as never, params: data.params });
  } else {
    router.push(data.pathname as never);
  }
}

async function registerForPushNotifications(): Promise<string | null> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  const { data } = await Notifications.getExpoPushTokenAsync();
  return data;
}
