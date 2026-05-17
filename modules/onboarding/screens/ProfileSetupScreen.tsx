import { useState } from 'react';
import {
  View, Text, ScrollView, Pressable,
  ActionSheetIOS, Alert, ActivityIndicator, Platform, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { z } from 'zod';
import { AppBar } from '../../../shared/components/AppBar';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';
import { useServices } from '../../../shared/hooks/useServices';
import { authService } from '../../../shared/services/auth.service';
import { C } from '../../../shared/constants/colors';

const schema = z.object({
  firstName: z.string().min(2, 'Name must be at least 2 characters'),
  birthday:  z.string().optional(),
});

type FormErrors = Partial<Record<'firstName' | 'birthday', string>>;

const AVATAR_BUCKET = 'user';

interface ProfileSetupScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ProfileSetupScreen({ onBack, onNext }: ProfileSetupScreenProps) {
  const { form, updateForm }  = useOnboardingContext();
  const { user: userService } = useServices();

  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const initial = form.firstName?.trim().charAt(0).toUpperCase() || '?';

  // ── Avatar picker ─────────────────────────────────────────

  async function pickFromLibrary() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Allow access to your photo library in Settings.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.82,
    });
    if (!result.canceled) updateForm({ avatarUri: result.assets[0].uri });
  }

  async function pickFromCamera() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Allow camera access in Settings.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.82,
    });
    if (!result.canceled) updateForm({ avatarUri: result.assets[0].uri });
  }

  function handleAvatarPress() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Cancel', 'Take Photo', 'Choose from Library'], cancelButtonIndex: 0 },
        (i) => { if (i === 1) pickFromCamera(); if (i === 2) pickFromLibrary(); }
      );
    } else {
      Alert.alert('Profile photo', 'Choose a source', [
        { text: 'Camera',        onPress: pickFromCamera },
        { text: 'Photo library', onPress: pickFromLibrary },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  }

  // ── Upload avatar to Supabase Storage ────────────────────

  async function uploadAvatar(userId: string, uri: string): Promise<string> {
    const ext  = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${userId}/avatar.${ext}`;

    const response = await fetch(uri);
    const blob     = await response.blob();

    const { error } = await userService.uploadAvatar(userId, path, blob, ext);
    if (error) throw error;

    return userService.getAvatarUrl(AVATAR_BUCKET, path);
  }

  // ── Save profile and continue ────────────────────────────

  async function handleContinue() {
    const result = schema.safeParse({
      firstName: form.firstName,
      birthday:  form.birthday || undefined,
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof FormErrors] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Session expired. Please sign in again.');

      let avatarUrl: string | null = null;
      if (form.avatarUri) {
        avatarUrl = await uploadAvatar(user.uid, form.avatarUri);
        updateForm({ avatarUrl });
      }

      await userService.upsertProfile({
        id:         user.uid,
        phone:      user.phoneNumber ?? undefined,
        first_name: result.data.firstName,
        birthday:   result.data.birthday ?? null,
        avatar_url: avatarUrl,
      });

      onNext();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not save profile. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Your profile" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={1} />

        <View className="mt-7 gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            Show up as you.
          </Text>
          <Text className="text-base text-ink-2 mt-2.5" style={{ lineHeight: 22 }}>
            A name and a face. That's all we need.
          </Text>
        </View>

        {/* Avatar */}
        <View className="items-center mt-8">
          <Pressable
            onPress={handleAvatarPress}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            <View
              className="w-[124px] h-[124px] rounded-full overflow-hidden items-center justify-center"
              style={{
                backgroundColor: form.avatarUri ? 'transparent' : C.amber,
                shadowColor: C.brownRed,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              {form.avatarUri ? (
                <Image
                  source={{ uri: form.avatarUri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              ) : (
                <Text className="font-bold text-brown-red" style={{ fontSize: 38 }}>
                  {initial}
                </Text>
              )}
            </View>
            <View
              className="absolute bottom-0 right-0 w-[38px] h-[38px] rounded-full bg-jungle-deep items-center justify-center border-[3px] border-cream"
            >
              <Icon name={form.avatarUri ? 'check' : 'plus'} size={16} color={C.cream} />
            </View>
          </Pressable>
          <Text style={{ color: C.muted, fontSize: 12.5, marginTop: 10 }}>
            Tap to {form.avatarUri ? 'change' : 'add'} photo
          </Text>
        </View>

        {/* Fields */}
        <View className="mt-[26px] gap-3.5">
          <View className="gap-1">
            <Input
              label="First name"
              value={form.firstName}
              onChangeText={(v) => { updateForm({ firstName: v }); if (errors.firstName) setErrors({}); }}
              placeholder="Jordan"
              autoCapitalize="words"
            />
            {errors.firstName && (
              <Text style={{ color: C.terra, fontSize: 12.5 }}>{errors.firstName}</Text>
            )}
          </View>

          <Input
            label="Birthday (optional)"
            value={form.birthday}
            onChangeText={(v) => updateForm({ birthday: v })}
            placeholder="Apr 12, 1994"
          />
        </View>

        <View className="mt-7">
          <Button
            label={loading ? 'Saving…' : 'Continue'}
            onPress={handleContinue}
            fullWidth
            disabled={loading}
            rightIcon={loading ? <ActivityIndicator size="small" color={C.cream} /> : undefined}
          />
        </View>
      </ScrollView>
    </View>
  );
}
