import { View, Pressable, Modal } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBar } from '../../shared/components/TabBar';
import { useAppContext } from '../../shared/context/AppContext';
import { C } from '../../shared/constants/colors';
import { Icon } from '../../shared/components/Icon';
import { LoveLevelSheet } from '../../modules/lovelvl/screens/LoveLevelSheet';
import { AppreciationOverlay } from '../../modules/appreciation/screens/AppreciationOverlay';
import { MeetingsScreen } from '../../modules/meetings/screens/MeetingsScreen';
import { WishListScreen } from '../../modules/wishlist/screens/WishListScreen';
import { BadgesScreen } from '../../modules/badges/screens/BadgesScreen';
import { ResultsScreen } from '../../modules/onboarding/screens/ResultsScreen';

function FullScreenOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <View className="flex-1 bg-cream">
        <View className="absolute left-3.5 z-[5]" style={{ top: insets.top + 10 }}>
          <Pressable
            onPress={onClose}
            className="w-10 h-10 rounded-lg items-center justify-center bg-jungle-deep/[0.07]"
          >
            <Icon name="back" size={20} color={C.jungleDeep} />
          </Pressable>
        </View>
        <View className="absolute left-0 right-0 bottom-0" style={{ top: insets.top + 56 }}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

export default function TabsLayout() {
  const { data, setData, overlay, setOverlay } = useAppContext();

  return (
    <>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="codes" />
        <Tabs.Screen name="dates" />
        <Tabs.Screen name="play" />
        <Tabs.Screen name="me" />
      </Tabs>

      <LoveLevelSheet
        open={overlay === 'levelMe'}
        who="me"
        data={data}
        setData={setData}
        onClose={() => setOverlay(null)}
      />
      <LoveLevelSheet
        open={overlay === 'levelPartner'}
        who="partner"
        data={data}
        setData={setData}
        onClose={() => setOverlay(null)}
      />
      <AppreciationOverlay
        open={overlay === 'appreciation'}
        data={data}
        onClose={() => setOverlay(null)}
      />

      {overlay === 'results' && (
        <FullScreenOverlay onClose={() => setOverlay(null)}>
          <ResultsScreen onBack={() => setOverlay(null)} onNext={() => setOverlay(null)} ranking={data.me.ranking} />
        </FullScreenOverlay>
      )}
      {overlay === 'meeting' && (
        <FullScreenOverlay onClose={() => setOverlay(null)}>
          <MeetingsScreen data={data} />
        </FullScreenOverlay>
      )}
      {overlay === 'wish' && (
        <FullScreenOverlay onClose={() => setOverlay(null)}>
          <WishListScreen data={data} />
        </FullScreenOverlay>
      )}
      {overlay === 'badges' && (
        <FullScreenOverlay onClose={() => setOverlay(null)}>
          <BadgesScreen data={data} />
        </FullScreenOverlay>
      )}
    </>
  );
}
