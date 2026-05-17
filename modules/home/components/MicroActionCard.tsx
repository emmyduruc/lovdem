import { View, Text } from 'react-native';
import { codeByKey } from '../../../shared/constants/loveCodes';
import { AppData } from '../../../shared/types';
import { Card } from '../../../shared/components/Card';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Button } from '../../../shared/components/Button';

interface MicroActionCardProps {
  data: AppData;
  onDoIt: () => void;
}

export function MicroActionCard({ data, onDoIt }: MicroActionCardProps) {
  const code = codeByKey(data.partner.primaryCode);

  return (
    <Card padding={18}>
      <LeafCorner position="br" kind={2} size={80} opacity={0.45} />
      <View className="relative flex-row items-start gap-3">
        {/* Color swatch — must stay dynamic via style, sourced from love code */}
        <View
          className="w-[38px] h-[38px] rounded-xl flex-shrink-0"
          style={{ backgroundColor: code.color }}
        />
        <View className="flex-1">
          <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid">
            Today's micro-action · {code.name}
          </Text>
          <Text className="font-bold text-lg mt-1 leading-lg text-ink">
            Text {data.partner.firstName} one specific thing you noticed about them this week.
          </Text>
          <View className="mt-3 flex-row gap-2">
            <Button label="I'll do it" onPress={onDoIt} size="sm" />
            <Button label="Swap" variant="ghost" size="sm" />
          </View>
        </View>
      </View>
    </Card>
  );
}
