import { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppBar } from '../../../shared/components/AppBar';
import { Button } from '../../../shared/components/Button';
import { OtpInput } from '../../../shared/components/OtpInput';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';
import { authService } from '../../../shared/services/auth.service';
import { C } from '../../../shared/constants/colors';

// Firebase OTP codes expire after 60 seconds
const OTP_EXPIRY_SECONDS = 60;
const OTP_LENGTH = 6;

interface OtpScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function OtpScreen({ onBack, onNext }: OtpScreenProps) {
  const { form, confirmation, setConfirmation } = useOnboardingContext();

  const [code, setCode]         = useState('');
  const [seconds, setSeconds]   = useState(OTP_EXPIRY_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resending, setResending] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  // Auto-verify as soon as all digits are entered
  useEffect(() => {
    if (code.length === OTP_LENGTH && !loading) {
      verify(code);
    }
  }, [code]);

  const verify = useCallback(async (otp: string) => {
    if (!confirmation) {
      Alert.alert('Session expired', 'Please go back and request a new code.');
      return;
    }

    setLoading(true);
    setHasError(false);

    try {
      await authService.verifyOtp(confirmation, otp);
      onNext();
    } catch {
      setHasError(true);
      setCode('');
      Alert.alert('Incorrect code', 'That code didn\'t match. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [confirmation, onNext]);

  const handleResend = async () => {
    if (!canResend || resending) return;

    setResending(true);
    setHasError(false);
    setCode('');

    try {
      const newConfirmation = await authService.sendOtp(form.phone);
      setConfirmation(newConfirmation);
      setSeconds(OTP_EXPIRY_SECONDS);
      setCanResend(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not resend. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setResending(false);
    }
  };

  const maskedPhone = form.phone.replace(/(\+\d{1,3})(\d+)(\d{4})/, '$1 •••• $3');

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Verify number" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={0} />

        <Animated.View entering={FadeInDown.delay(80).duration(340)} className="mt-7 gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            Check your messages.
          </Text>
          <Text className="text-base text-ink-2 mt-2.5" style={{ lineHeight: 22 }}>
            We sent a 6-digit code to{' '}
            <Text className="font-semibold text-ink">{maskedPhone}</Text>
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(180).duration(340)}
          className="mt-10 items-center"
        >
          <OtpInput
            length={OTP_LENGTH}
            value={code}
            onChange={setCode}
            autoFocus
            disabled={loading}
            error={hasError}
          />
        </Animated.View>

        {/* Countdown / Resend */}
        <Animated.View
          entering={FadeInDown.delay(280).duration(340)}
          className="mt-6 items-center"
        >
          {canResend ? (
            <Pressable onPress={handleResend} disabled={resending}>
              <Text
                style={{
                  color: resending ? C.muted : C.jungleDeep,
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                {resending ? 'Sending…' : 'Resend code'}
              </Text>
            </Pressable>
          ) : (
            <Text style={{ color: C.muted, fontSize: 13 }}>
              Resend code in{' '}
              <Text style={{ color: C.ink, fontWeight: '600' }}>
                {String(seconds).padStart(2, '0')}s
              </Text>
            </Text>
          )}
        </Animated.View>

        {/* Manual verify fallback (if auto-verify didn't trigger) */}
        {code.length === OTP_LENGTH && (
          <Animated.View entering={FadeInDown.duration(220)} className="mt-8">
            <Button
              label={loading ? 'Verifying…' : 'Verify'}
              onPress={() => verify(code)}
              fullWidth
              disabled={loading}
              rightIcon={loading ? <ActivityIndicator size="small" color={C.cream} /> : undefined}
            />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
