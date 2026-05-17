import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Animated, {
  SlideInRight,
  SlideInLeft,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { C } from '../../../shared/constants/colors';
import { LOVE_CODES, QUIZ_QUESTIONS, QUIZ_CODE_MAP, LoveCodeKey } from '../../../shared/constants/loveCodes';
import { Icon } from '../../../shared/components/Icon';
import { QuizOption } from '../components/QuizOption';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

interface QuizScreenProps {
  onBack: () => void;
  onNext: () => void;
}

function QuizDot({ active }: { active: boolean }) {
  const width = useSharedValue(active ? 22 : 6);

  useEffect(() => {
    width.value = withSpring(active ? 22 : 6, { damping: 16, stiffness: 200 });
  }, [active]);

  const animStyle = useAnimatedStyle(() => ({ width: width.value }));

  return (
    <Animated.View
      style={[
        { height: 6, borderRadius: 3, backgroundColor: active ? C.jungleDeep : 'rgba(22,56,40,0.18)' },
        animStyle,
      ]}
    />
  );
}

type StepAnswer = { optKey: string; lcKey: string };

export function QuizScreen({ onBack, onNext }: QuizScreenProps) {
  const { updateForm } = useOnboardingContext();
  const [step, setStep] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, StepAnswer>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    words: 0, warmth: 0, actions: 0, presence: 0, gestures: 0,
  });
  const directionRef = useRef<'forward' | 'back'>('forward');

  const q = QUIZ_QUESTIONS[step];
  const total = QUIZ_QUESTIONS.length;

  // What to visually highlight: in-flight tap or the persisted answer for this step
  const displaySelected = selectedKey ?? answers[step]?.optKey ?? null;

  const handleBack = () => {
    if (step > 0) {
      directionRef.current = 'back';
      setStep(prev => prev - 1);
      setSelectedKey(null);
    } else {
      onBack();
    }
  };

  const pick = (optKey: string, quizCode: string) => {
    if (selectedKey) return;
    setSelectedKey(optKey);

    const lcKey = QUIZ_CODE_MAP[quizCode as keyof typeof QUIZ_CODE_MAP] ?? quizCode;

    // Undo the previous answer for this step if re-answering after going back
    const prevAnswer = answers[step];
    const nextScores = { ...scores };
    if (prevAnswer && prevAnswer.lcKey !== lcKey) {
      nextScores[prevAnswer.lcKey] = Math.max(0, (nextScores[prevAnswer.lcKey] || 0) - 5);
    }
    if (!prevAnswer || prevAnswer.lcKey !== lcKey) {
      nextScores[lcKey] = (nextScores[lcKey] || 0) + 5;
    }
    setScores(nextScores);

    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [step]: { optKey, lcKey } }));
      directionRef.current = 'forward';
      if (step < total - 1) {
        setStep(prev => prev + 1);
        setSelectedKey(null);
      } else {
        const ranked = [...LOVE_CODES]
          .map((c) => ({ ...c, _s: (nextScores[c.key] || 0) + Math.random() * 0.01 }))
          .sort((a, b) => b._s - a._s)
          .map((c) => c.key) as LoveCodeKey[];
        updateForm({ codeRanking: ranked });
        setTimeout(() => onNext(), 100);
      }
    }, 360);
  };

  const entering = directionRef.current === 'forward'
    ? SlideInRight.springify().damping(22).stiffness(180)
    : SlideInLeft.springify().damping(22).stiffness(180);

  return (
    <View style={{ flex: 1, backgroundColor: C.cream }}>
      <View className='flex flex-row justify-between items-center px-4 pt-14 pb-2'>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: 14,
            backgroundColor: 'rgba(22,56,40,0.07)',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Icon name="back" size={20} color={C.jungleDeep} />
        </Pressable>

        <View className='flex flex-row items-center gap-2'>
          {QUIZ_QUESTIONS.map((_, i) => (
            <QuizDot key={i} active={i === step} />
          ))}
        </View>

        <Text style={{ fontSize: 12, fontWeight: '600', color: C.ink2 }}>
          {step + 1}/{total}
        </Text>
      </View>

      <Animated.View key={step} entering={entering} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: '600',
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: C.jungleMid,
              marginTop: 16,
            }}
          >
            {q.category}
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '700',
              color: C.ink,
              marginTop: 8,
              lineHeight: 34,
              letterSpacing: -0.26,
            }}
          >
            {q.question}
          </Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 22,
              color: C.ink2,
              marginTop: 8,
              marginBottom: 24,
            }}
          >
            {q.subtext}
          </Text>

          <View style={{ gap: 12 }}>
            {q.options.map((opt, index) => (
              <Animated.View
                key={opt.key}
                entering={FadeInDown.delay(index * 55).duration(320).springify().damping(18)}
              >
                <QuizOption
                  letter={opt.key}
                  codeKey={QUIZ_CODE_MAP[opt.code]}
                  text={opt.text}
                  selected={displaySelected === opt.key}
                  onPress={() => pick(opt.key, opt.code)}
                />
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
