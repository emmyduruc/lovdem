import { useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import { z } from 'zod';
import { AppBar } from '../../../shared/components/AppBar';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';
import { authService } from '../../../shared/services/auth.service';
import { C } from '../../../shared/constants/colors';

const schema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{7,14}$/, 'Enter your number with country code, e.g. +12025551234'),
});

type FormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

interface CreateAccountScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function CreateAccountScreen({ onBack, onNext }: CreateAccountScreenProps) {
  const { form, updateForm, setConfirmation } = useOnboardingContext();
  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    const result = schema.safeParse({ phone: form.phone });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const confirmation = await authService.sendOtp(result.data.phone);
      setConfirmation(confirmation);
      onNext();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Could not send OTP. Check the number and try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Create account" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={0} />

        <View className="mt-7 gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            A safe space for two.
          </Text>
          <Text className="text-base text-ink-2 mt-2.5" style={{ lineHeight: 22 }}>
            We'll send a one-time code to verify your number. No passwords needed.
          </Text>
        </View>

        <View className="mt-[26px] gap-1">
          <Input
            label="Phone number"
            value={form.phone}
            onChangeText={(v) => {
              updateForm({ phone: v });
              if (errors.phone) setErrors({});
            }}
            placeholder="+1 202 555 1234"
            keyboardType="phone-pad"
            autoComplete="tel"
            autoCorrect={false}
          />
          {errors.phone && (
            <Text style={{ color: C.terra, fontSize: 12.5, marginTop: 4 }}>
              {errors.phone}
            </Text>
          )}
          <Text style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>
            Include your country code (e.g. +1 for US, +44 for UK)
          </Text>
        </View>

        <View className="mt-7 flex-row gap-2 items-start">
          <View
            className="w-[22px] h-[22px] rounded-[7px] bg-jungle-deep items-center justify-center flex-shrink-0 mt-px"
          />
          <Text className="text-ink-2 flex-1" style={{ fontSize: 12.5, lineHeight: 18 }}>
            I agree to the <Text className="font-bold text-ink">terms</Text> and{' '}
            <Text className="font-bold text-ink">privacy promise</Text>. My partner's data stays between us.
          </Text>
        </View>

        <View className="mt-7">
          <Button
            label={loading ? 'Sending code…' : 'Send code'}
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
