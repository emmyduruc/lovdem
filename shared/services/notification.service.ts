// ─────────────────────────────────────────────────────────────
// Notification event types and the Expo Push payload builder.
//
// This file is used by:
//   - The Edge Function (send-notification) to build payloads
//   - The client to interpret incoming notification data
// ─────────────────────────────────────────────────────────────

export type NotificationEvent =
  | { type: 'partner_joined' }
  | { type: 'date_planned';       dateId: string;  dateTitle: string }
  | { type: 'date_reminder';      dateId: string;  dateTitle: string;  scheduledAt: string }
  | { type: 'date_completed';     dateId: string;  dateTitle: string }
  | { type: 'journal_shared';     journalId: string }
  | { type: 'love_level_updated'; level: number }
  | { type: 'wish_fulfilled';     wishId: string;  wishTitle: string }
  | { type: 'wish_added';         wishId: string;  wishTitle: string }
  | { type: 'badge_earned';       badgeKey: string; badgeName: string }
  | { type: 'check_in_reminder' };

export interface PushPayload {
  to: string;
  title: string;
  body: string;
  data: DeepLinkData;
  sound?: 'default';
  badge?: number;
}

// The data object that travels inside every push notification.
// When the user taps, the client reads this and navigates.
export interface DeepLinkData {
  type: NotificationEvent['type'];
  pathname: string;
  params?: Record<string, string>;
}

export function buildPushPayload(
  pushToken: string,
  partnerName: string,
  event: NotificationEvent
): PushPayload {
  const { title, body, link } = buildContent(partnerName, event);
  return {
    to: pushToken,
    title,
    body,
    sound: 'default',
    data: { type: event.type, ...link },
  };
}

// ── Content map ───────────────────────────────────────────────

function buildContent(
  partner: string,
  event: NotificationEvent
): { title: string; body: string; link: Omit<DeepLinkData, 'type'> } {
  switch (event.type) {
    case 'partner_joined':
      return {
        title: '💚 You\'re connected!',
        body: `${partner} joined your couple.`,
        link: { pathname: '/home' },
      };

    case 'date_planned':
      return {
        title: '📅 New date idea',
        body: `${partner} planned "${event.dateTitle}"`,
        link: { pathname: '/dates/[id]', params: { id: event.dateId } },
      };

    case 'date_reminder':
      return {
        title: `📅 Date tonight — ${event.dateTitle}`,
        body: `Your date with ${partner} is coming up.`,
        link: { pathname: '/dates/[id]', params: { id: event.dateId } },
      };

    case 'date_completed':
      return {
        title: '🌟 How was the date?',
        body: `${partner} marked "${event.dateTitle}" as done. Add your journal.`,
        link: { pathname: '/dates/[id]', params: { id: event.dateId } },
      };

    case 'journal_shared':
      return {
        title: '📝 New journal entry',
        body: `${partner} shared a journal entry with you.`,
        link: { pathname: '/journals/[id]', params: { id: event.journalId } },
      };

    case 'love_level_updated':
      return {
        title: '💛 Love level update',
        body: `${partner} set their love level to ${event.level}.`,
        link: { pathname: '/home' },
      };

    case 'wish_fulfilled':
      return {
        title: '🎁 Wish granted!',
        body: `${partner} fulfilled your wish: "${event.wishTitle}"`,
        link: { pathname: '/wishlist' },
      };

    case 'wish_added':
      return {
        title: '⭐ New wish',
        body: `${partner} added "${event.wishTitle}" to their wish list.`,
        link: { pathname: '/wishlist' },
      };

    case 'badge_earned':
      return {
        title: `🏅 New badge — ${event.badgeName}`,
        body: 'You and your partner earned a new milestone badge.',
        link: { pathname: '/badges' },
      };

    case 'check_in_reminder':
      return {
        title: '💚 Time to check in',
        body: 'How are you feeling about your relationship today?',
        link: { pathname: '/home' },
      };
  }
}
