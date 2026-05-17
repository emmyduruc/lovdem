import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { codeByKey } from '../../../shared/constants/loveCodes';
import { AppData } from '../../../shared/types';
import { WhoToggle } from '../components/WhoToggle';
import { CodeCard } from '../components/CodeCard';

interface CodesScreenProps {
  data: AppData;
  onInfo: (key: string) => void;
}

export function CodesScreen({ data, onInfo }: CodesScreenProps) {
  const [who, setWho] = useState<'me' | 'partner'>('me');
  const insets = useSafeAreaInsets();
  const target = data[who];
  const ranking = target.ranking;

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pb-1" style={{ paddingTop: insets.top + 14 }}>
        <Text className="text-5xl font-bold text-ink tracking-tight">
          Love Codes
        </Text>
        <Text className="text-base-plus leading-base text-ink-2 mt-1">
          The shape of how each of you receives love.
        </Text>
      </View>

      <View className="px-4 pt-3.5">
        <WhoToggle who={who} data={data} onChange={setWho} />
      </View>

      <View className="px-4 pt-[18px] gap-3">
        {ranking.map((k, i) => {
          const code = codeByKey(k);
          return (
            <CodeCard
              key={k}
              rank={i + 1}
              codeKey={k}
              codeName={code.name}
              codeFull={code.full}
              codeColor={code.color}
              codeInk={code.ink}
              codeBlurb={code.blurb}
              isPrimary={i === 0}
              showPartnerNote={i === 0 && who === 'partner'}
              partnerName={data.partner.firstName}
              onInfo={() => onInfo(k)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
