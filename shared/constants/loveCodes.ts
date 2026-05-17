import { C } from './colors';

export const LOVE_CODES = [
  {
    key: 'words',
    name: 'Words',
    full: 'Words of Affirmation',
    color: C.gold,
    ink: '#fff8e6',
    blurb: 'Hearing it out loud. Spoken appreciation, written notes, the sentence that lands.',
  },
  {
    key: 'warmth',
    name: 'Warmth',
    full: 'Physical Touch',
    color: C.terra,
    ink: '#fff5ef',
    blurb: 'A hand on the back. The hug at the door. Closeness that says "I\'m here."',
  },
  {
    key: 'actions',
    name: 'Actions',
    full: 'Acts of Service',
    color: C.jungleMid,
    ink: '#f3f6ed',
    blurb: 'The kettle filled. The errand handled. Care expressed in motion.',
  },
  {
    key: 'presence',
    name: 'Presence',
    full: 'Quality Time',
    color: C.jungleDeep,
    ink: '#f6f5d8',
    blurb: 'Phones away, eyes up. Time given fully, without distraction.',
  },
  {
    key: 'gestures',
    name: 'Gestures',
    full: 'Receiving Gifts',
    color: C.yellowGreen,
    ink: '#163828',
    blurb: 'The thought made tangible. A small thing that says "I was thinking of you."',
  },
] as const;

export type LoveCodeKey = typeof LOVE_CODES[number]['key'];

export const codeByKey = (k: string) => LOVE_CODES.find((c) => c.key === k)!;

export const LOVE_CODE_LOOKS_LIKE: Record<string, string[]> = {
  words: ['Specific praise', 'Texts mid-day', 'Spoken "thank you"'],
  warmth: ['A hand on the back', 'Long hugs', 'Sitting close on the couch'],
  actions: ["Errands handled", "Coffee brought to you", "Quietly fixing what's broken"],
  presence: ['Phones away', 'A walk together', 'Asking real questions'],
  gestures: ['A note in a bag', 'A small thing you mentioned weeks ago', 'Flowers, just because'],
};

export const LOVE_CODE_DOESNT_LOOK_LIKE: Record<string, string[]> = {
  words: ['Generic compliments', 'Public-only praise', 'Sarcasm dressed as humor'],
  warmth: ['Functional only touch', 'Touch with an ask attached', 'Stiff side-hugs'],
  actions: ['Help only after asking', 'A kept score', 'Visible resentment'],
  presence: ['Watching TV in parallel', 'Half-listening', 'Phones on the table'],
  gestures: ['Last-minute store flowers', 'A gift card with no thought', 'Re-gifting'],
};

export const LOVE_CODE_DAILY_ACTIONS: Record<string, string[]> = {
  words: ['Name one thing they did well today', 'Send a voice note before bed', 'Write a 2-line card'],
  warmth: ['Pause for a 20-second hug', 'Sit closer than usual on the couch', 'Hold their hand crossing the street'],
  actions: ['Take a chore off their list, silently', 'Pre-make their morning coffee', 'Charge their phone for them'],
  presence: ['Phones in a basket at dinner', 'Take a walk after work, no agenda', 'A 10-min check-in, eyes only'],
  gestures: ['Bring home their snack', 'Leave a sticky note in their bag', 'Pick up the magazine they mentioned'],
};

export type QuizOptionCode = 'Words' | 'Closeness' | 'Actions' | 'Presence' | 'Gestures';

export const QUIZ_CODE_MAP: Record<QuizOptionCode, LoveCodeKey> = {
  Words:     'words',
  Closeness: 'warmth',
  Actions:   'actions',
  Presence:  'presence',
  Gestures:  'gestures',
};

export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  code: QuizOptionCode;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  subtext: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1_baseline',
    category: 'ORDINARY DAYS',
    question: 'On a completely ordinary Tuesday with nothing planned, what makes you feel most valued?',
    subtext: 'Select the scenario that immediately softens your day.',
    options: [
      { key: 'A', code: 'Words',     text: "A text out of nowhere saying: 'I keep thinking about you today, just because it's true.'" },
      { key: 'B', code: 'Closeness', text: 'They walk past you in the kitchen and pull you in for a long, deliberate kiss.' },
      { key: 'C', code: 'Actions',   text: "Coming home to find a chore you've been dreading is completely handled." },
      { key: 'D', code: 'Presence',  text: "They close their laptop, look right at you, and say: 'Tell me about your day.'" },
      { key: 'E', code: 'Gestures',  text: 'They bring home that random snack you mentioned wanting weeks ago.' },
    ],
  },
  {
    id: 'q2_crisis',
    category: 'SUPPORT',
    question: 'When you are going through a genuinely hard week, what do you look for?',
    subtext: 'How do you prefer your partner to share your weight?',
    options: [
      { key: 'A', code: 'Words',     text: 'They sit you down, look you in the eyes, and verbally remind you how loved you are.' },
      { key: 'B', code: 'Closeness', text: "They tightly hold you close for as long as you need—no talking, no trying to 'fix' it." },
      { key: 'C', code: 'Actions',   text: 'They quietly step up and take over your personal logistics without being asked.' },
      { key: 'D', code: 'Presence',  text: 'They put their phone away, sit with you in the quiet, and offer total attention.' },
      { key: 'E', code: 'Gestures',  text: 'They show up with your favorite comfort food to make the evening feel easier.' },
    ],
  },
  {
    id: 'q3_deficit',
    category: 'FEELING UNSEEN',
    question: 'When emotional distance creeps into the relationship, what hurts the most?',
    subtext: 'Identify the exact nature of the ache.',
    options: [
      { key: 'A', code: 'Words',     text: "The silence. A heavy week passes without a single 'thank you' or verbal acknowledgment." },
      { key: 'B', code: 'Closeness', text: 'The physical gap. Existing in the same room for days without touching or holding hands.' },
      { key: 'C', code: 'Actions',   text: 'The mental load. Carrying every daily task while they watch without stepping in.' },
      { key: 'D', code: 'Presence',  text: 'The lack of focus. They are physically there but completely glued to their screen.' },
      { key: 'E', code: 'Gestures',  text: 'The autopilot routine. Weeks go by without a single intentional surprise or detail.' },
    ],
  },
  {
    id: 'q4_reignite',
    category: 'SPARK',
    question: 'If things have felt a bit flat lately, what is the fastest path back to desire?',
    subtext: 'What catches you off guard and completely flips the switch?',
    options: [
      { key: 'A', code: 'Words',     text: "Unprompted verbal vulnerability: 'Do you have any idea how attractive you are right now?'" },
      { key: 'B', code: 'Closeness', text: 'Spontaneous, unhurried intimacy initiated right in the middle of a mundane evening.' },
      { key: 'C', code: 'Actions',   text: 'They clear the schedules, arrange the logistics, and handle everything so you can rest.' },
      { key: 'D', code: 'Presence',  text: 'A slow night with zero phones, zero guests, and all energy focused on each other.' },
      { key: 'E', code: 'Gestures',  text: 'They leave something thoughtful for you to discover—a note or curated token.' },
    ],
  },
  {
    id: 'q5_trajectory',
    category: 'FUTURE',
    question: 'Looking ahead five years, what is the one thing you refuse to compromise on?',
    subtext: 'The vital element that keeps the relationship alive for you long-term.',
    options: [
      { key: 'A', code: 'Words',     text: 'That we never stop speaking our love out loud—honestly, often, and with real feeling.' },
      { key: 'B', code: 'Closeness', text: 'That our physical pull never fades—intimacy remains an active choice we make daily.' },
      { key: 'C', code: 'Actions',   text: 'That love looks like consistent effort in how we share our daily burdens.' },
      { key: 'D', code: 'Presence',  text: 'That we preserve sacred, undivided spaces to be wholly locked into one another.' },
      { key: 'E', code: 'Gestures',  text: 'That the small things never die—the personal surprises that prove you are remembered.' },
    ],
  },
];