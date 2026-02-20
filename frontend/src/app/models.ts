export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  role: string;
}

export interface UserStats {
  totalTrophies: number;
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
  totalPoints: number;
  gamesPlayed: number;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  psnId: string | null;
  psnVerified: boolean;
  avatarUrl: string | null;
  level: number;
  createdAt: string;
  stats: UserStats;
}

export interface GameResponse {
  id: number;
  title: string;
  platform: string;
  imageUrl: string | null;
  totalTrophies: number;
}

export interface TrophyResponse {
  id: number;
  name: string;
  description: string;
  type: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  imageUrl: string | null;
  hidden: boolean;
  earnRate: number | null;
  earned: boolean;
  earnedAt: string | null;
}

export interface GameDetailResponse {
  id: number;
  title: string;
  platform: string;
  imageUrl: string | null;
  description: string | null;
  totalTrophies: number;
  earnedByUser: number;
  trophies: TrophyResponse[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface SyncResult {
  gamesSynced: number;
  trophiesSynced: number;
  earnedTrophiesSynced: number;
  message: string;
}

export interface VerificationCodeResponse {
  verificationCode: string;
  psnOnlineId: string;
  message: string;
}

export interface VerificationResultResponse {
  verified: boolean;
  psnOnlineId: string | null;
  message: string;
}
