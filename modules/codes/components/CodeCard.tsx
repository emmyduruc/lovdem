import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { Icon } from '../../../shared/components/Icon';

interface CodeCardProps {
  rank: number;
  codeKey: string;
  codeName: string;
  codeFull: string;
  codeColor: string;
  codeInk: string;
  codeBlurb: string;
  isPrimary: boolean;
  showPartnerNote?: boolean;
  partnerName?: string;
  onInfo: () => void;
}

export function CodeCard({
  rank, codeKey, codeName, codeFull, codeColor, codeInk, codeBlurb,
  isPrimary, showPartnerNote, partnerName, onInfo
}: CodeCardProps) {
  return (
    <View
      className="rounded-3xl overflow-hidden"
      style={{
        padding: 18,
        backgroundColor: isPrimary ? codeColor : '#ffffff',
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isPrimary ? 0.12 : 0.06,
        shadowRadius: 16,
        elevation: isPrimary ? 4 : 2,
      }}
    >
      {isPrimary && <HeartSpots opacity={0.10} color={codeInk} />}
      <View className="relative flex-row items-start gap-3.5">
        <View
          className="w-11 h-11 rounded-lg items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: isPrimary ? 'rgba(255,255,255,0.18)' : codeColor + '1F',
          }}
        >
          <Text className="font-extrabold text-xl" style={{ color: isPrimary ? codeInk : codeColor }}>
            {rank}
          </Text>
        </View>
        <View className="flex-1 min-w-0">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-bold text-xl" style={{ color: isPrimary ? codeInk : C.ink }}>
              {codeName}
            </Text>
            <Pressable onPress={onInfo} className="opacity-[0.55] p-1">
              <Icon name="info" size={16} color={isPrimary ? codeInk : C.ink} />
            </Pressable>
          </View>
          <Text className="font-semibold opacity-70" style={{ fontSize: 12.5, color: isPrimary ? codeInk : C.ink }}>
            {codeFull}
          </Text>
          <Text
            className="mt-2 text-base leading-base"
            style={{ opacity: isPrimary ? 0.92 : 0.78, color: isPrimary ? codeInk : C.ink }}
          >
            {codeBlurb}
          </Text>
          {isPrimary && showPartnerNote && (
            <View
              className="mt-3 p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            >
              <Text
                className="font-bold tracking-wider uppercase opacity-70"
                style={{ fontSize: 10.5, color: codeInk }}
              >
                {partnerName}'s note
              </Text>
              <Text className="mt-1 text-sm" style={{ lineHeight: 19, color: codeInk }}>
                For me, Warmth looks like — a hand on the small of my back while I cook. Not a grand gesture. The opposite.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
