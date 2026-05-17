import { LoveCodeKey } from '../constants/loveCodes';
import { RelationshipLevelKey } from '../constants/relationshipLevels';

export interface Person {
  firstName: string;
  loveLevel: number;
  primaryCode: LoveCodeKey;
  ranking: LoveCodeKey[];
}

export interface AppData {
  me: Person;
  partner: Person;
  relationshipLevel: RelationshipLevelKey;
  dateFreq: string;
  checkIn: string;
}

export type Overlay =
  | 'levelMe'
  | 'levelPartner'
  | `codeInfo:${string}`
  | 'appreciation'
  | 'meeting'
  | 'wish'
  | 'badges'
  | 'results';

export interface OnboardingForm {
  phone:            string;
  firstName:        string;
  birthday:         string;
  checkIn:          string;
  dateFreq:         string;
  codeRanking:      LoveCodeKey[] | null;
  avatarUri:        string | null;  // local file URI before upload
  avatarUrl:        string | null;  // remote URL after upload
  partnerConnected: boolean;
}
