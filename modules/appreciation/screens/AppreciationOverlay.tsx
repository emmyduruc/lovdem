import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { Drawer } from '../../../shared/components/Drawer';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Leo } from '../../../shared/components/Leo';
import { Icon } from '../../../shared/components/Icon';

interface AppreciationOverlayProps {
  open: boolean;
  data: AppData;
  onClose: () => void;
}

export function AppreciationOverlay({ open, data, onClose }: AppreciationOverlayProps) {
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const handleClose = () => {
    setSent(false);
    setText('');
    onClose();
  };

  return (
    <Drawer open={open} onClose={handleClose}>
      {!sent ? (
        <View>
          <Text className="text-2xs font-semibold tracking-widest uppercase text-terra">
            Appreciation drop · for {data.partner.firstName}
          </Text>
          <Text className="text-3xl font-bold text-ink mt-1.5" style={{ letterSpacing: -0.22 }}>
            One specific thing. That's it.
          </Text>
          <View className="mt-3.5 rounded-3xl p-3.5 bg-blush overflow-hidden">
            <Text className="text-2xs font-semibold tracking-widest uppercase text-brown-red">
              Prompt
            </Text>
            <Text className="mt-1 font-semibold text-brown-red">
              Something {data.partner.firstName} did this week that landed for you. Be specific.
            </Text>
          </View>
          <View className="mt-3">
            <Input
              multiline
              numberOfLines={5}
              value={text}
              onChangeText={setText}
              placeholder="When you stayed up Tuesday to make sure I…"
              style={{ fontSize: 15, lineHeight: 22 }}
            />
          </View>
          <View className="mt-3.5">
            <Button
              label={`Send to ${data.partner.firstName}`}
              onPress={() => setSent(true)}
              disabled={!text.trim()}
              fullWidth
              leftIcon={<Icon name="send" size={16} color={C.cream} />}
            />
          </View>
        </View>
      ) : (
        <View className="pt-5 pb-2 items-center gap-1.5">
          <Leo size={120} mood="happy" />
          <Text className="text-3xl font-bold text-ink mt-2.5" style={{ letterSpacing: -0.22 }}>
            Sent. Quietly.
          </Text>
          <Text className="text-base-plus leading-base text-ink-2 text-center mt-1.5">
            {data.partner.firstName} will see it when they next open the app.
          </Text>
          <View className="mt-4 rounded-3xl p-3.5 bg-olive w-full">
            <View className="flex-row items-center gap-2.5 justify-center">
              <Text className="text-3xl">💌</Text>
              <Text className="font-bold text-jungle-deep">Badge progress: Words Unlocked</Text>
            </View>
          </View>
          <View className="mt-4 w-full">
            <Button label="Done" onPress={handleClose} fullWidth />
          </View>
        </View>
      )}
    </Drawer>
  );
}
