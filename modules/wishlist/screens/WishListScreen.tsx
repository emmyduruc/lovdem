import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { SegmentedControl } from '../../../shared/components/SegmentedControl';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { WishItem } from '../components/WishItem';

const WISHLIST_ITEMS = {
  partner: [
    { title: 'A linen overshirt, sage', desc: 'Size M. The kind I keep almost buying.', price: '£60–80', emoji: '👕', bg: 'rgba(74,111,82,0.16)', fg: C.jungleMid, linked: true, claimed: true },
    { title: 'Pottery class for two', desc: 'I keep mentioning it. Hint hint.', price: '£90', emoji: '🏺', bg: 'rgba(194,141,29,0.16)', fg: C.gold, linked: false },
    { title: 'That cookbook from the bookstore', desc: 'Saw it Saturday, didn\'t buy it.', price: '£28', emoji: '📗', bg: 'rgba(231,88,56,0.14)', fg: C.terra, linked: true },
    { title: 'A new plant for the bedroom', desc: 'Small. Not a monstera.', price: '£15–30', emoji: '🌿', bg: 'rgba(206,208,95,0.32)', fg: C.jungleDeep, linked: false },
  ],
  me: [
    { title: 'Vinyl: Khruangbin (any)', desc: 'For the new player.', price: '£25', emoji: '💿', bg: 'rgba(22,56,40,0.10)', fg: C.jungleDeep, linked: true },
    { title: 'Espresso tamper, 58.5mm', desc: 'Wooden handle if possible.', price: '£40', emoji: '☕', bg: 'rgba(194,141,29,0.14)', fg: C.gold },
    { title: 'A weekend with no plans', desc: 'Yes, this counts.', price: 'Free', emoji: '🌞', bg: 'rgba(252,208,205,0.7)', fg: C.brownRed },
  ],
};

interface WishListScreenProps {
  data: AppData;
}

export function WishListScreen({ data }: WishListScreenProps) {
  const [who, setWho] = useState<'partner' | 'me'>('partner');
  const items = WISHLIST_ITEMS[who];
  const isViewingPartner = who === 'partner';

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-3.5">
        <Text className="text-5xl font-bold text-ink tracking-tight">Wish list</Text>
        <Text className="text-base-plus leading-base text-ink-2 mt-1">
          Tiny clues, gentle gifts. Mark claimed to keep it a surprise.
        </Text>
      </View>

      <View className="px-4 pt-3.5">
        <SegmentedControl
          segments={[
            { key: 'partner', label: `${data.partner.firstName}'s` },
            { key: 'me', label: 'Yours' },
          ]}
          active={who}
          onChange={(k) => setWho(k as 'partner' | 'me')}
        />
      </View>

      <View className="px-4 pt-3.5 gap-2.5">
        {items.map((item, i) => (
          <WishItem key={i} item={item} viewingPartner={isViewingPartner} />
        ))}
      </View>

      <View className="px-4 pt-3.5">
        <Button label="Add a wish" variant="outline" fullWidth leftIcon={<Icon name="plus" size={16} color={C.jungleDeep} />} />
      </View>
    </ScrollView>
  );
}
