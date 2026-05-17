// ─────────────────────────────────────────────────────────────
// Edge Function: send-notification
//
// Called by the app (or a DB webhook) to send a push notification
// to one user. Handles preference checks, calls Expo Push API,
// and logs the result back to push_notifications.
//
// Invoke via: supabase.functions.invoke('send-notification', { body: payload })
// ─────────────────────────────────────────────────────────────

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import type { NotificationEvent, PushPayload } from '../../shared/services/notification.service.ts';
import { buildPushPayload } from '../../shared/services/notification.service.ts';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

interface RequestBody {
  recipientId:  string;
  partnerName:  string;
  event:        NotificationEvent;
}

Deno.serve(async (req) => {
  try {
    const body: RequestBody = await req.json();
    const { recipientId, partnerName, event } = body;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // bypasses RLS for server writes
    );

    // 1. Fetch recipient's push token and notification preferences
    const { data: profile } = await supabase
      .from('profiles')
      .select('push_token')
      .eq('id', recipientId)
      .single();

    if (!profile?.push_token) {
      return json({ skipped: 'no push token' });
    }

    const { data: settings } = await supabase
      .from('user_settings')
      .select('notifications_enabled, notification_prefs')
      .eq('user_id', recipientId)
      .single();

    // 2. Respect user preferences
    if (!settings?.notifications_enabled) {
      return json({ skipped: 'notifications disabled' });
    }

    const prefs = settings.notification_prefs as Record<string, boolean>;
    if (prefs[event.type] === false) {
      return json({ skipped: `preference off for ${event.type}` });
    }

    // 3. Build and send the Expo push payload
    const payload: PushPayload = buildPushPayload(profile.push_token, partnerName, event);

    const expoRes = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const expoData = await expoRes.json();
    const ticket   = expoData?.data;
    const failed   = ticket?.status === 'error';

    // 4. Log the result
    await supabase.from('push_notifications').insert({
      recipient_id: recipientId,
      type:         event.type,
      title:        payload.title,
      body:         payload.body,
      data:         payload.data,
      status:       failed ? 'failed' : 'sent',
      error:        failed ? ticket?.message : null,
      sent_at:      failed ? null : new Date().toISOString(),
    });

    return json({ success: !failed, ticket });
  } catch (err) {
    console.error('send-notification error:', err);
    return json({ error: String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
