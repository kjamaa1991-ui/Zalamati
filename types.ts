
export interface User {
  username: string;
  avatar: string;
  isPro: boolean;
}

export interface VoiceComment {
  id: string;
  user: User;
  duration: string;
  likes: string;
  timestamp: number;
}

export interface FeedPost {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  tags: string[];
  likes: string;
  voiceCommentsCount: number;
  audioTrackName: string;
  audioTrackCover: string;
}

export interface AppState {
  currentPostIndex: number;
  isMuted: boolean;
  showComments: boolean;
}
