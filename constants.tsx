
import { FeedPost } from './types';

export const MOCK_POSTS: FeedPost[] = [
  {
    id: '1',
    user: {
      username: 'DriftKing_SA',
      avatar: 'https://picsum.photos/seed/user1/200',
      isPro: true,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIxACNRjc2hK7-hdp5Gqx8eapDvcMURFtOfSF1PiOwhDE12Ztz4viDSfUqJ7Kmb6GT0qFQdBYVe-tz8rh8Pk4CdGTJc9yXwhwHzgmciequ1uzKJ5wKZv3vc7BzikC42u_07motyczZ_ulQ8A4FS8e5ARPwcl-kh-sKKPt6z-a-aTx8JOul-n6Ib9LdWXXxe8-dHZWVyCc5HAHfxf0237fF50fuC8dMC9L2Any33ziAN5Z7GfLP0F-cUDMT5L7e9dywUc4_jv-ktX2i',
    caption: 'Testing the new turbo setup on the midnight run. Sound on for the BOV! 🔊🏎️',
    tags: ['#ZalamatiDrift', '#StreetCulture'],
    likes: '12.5k',
    voiceCommentsCount: 300,
    audioTrackName: 'Original Audio - Engine Roar V8 Supercharged...',
    audioTrackCover: 'https://picsum.photos/seed/track1/100',
  },
  {
    id: '2',
    user: {
      username: 'Street_King_H100',
      avatar: 'https://picsum.photos/seed/user2/200',
      isPro: false,
    },
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000',
    caption: 'Late night croiser. #Zalamati #HyundaiH100 #UrbanLife',
    tags: ['#NightDrive', '#GrittyBeats'],
    likes: '15.4k',
    voiceCommentsCount: 1200,
    audioTrackName: 'Gritty Beats - Night Drive',
    audioTrackCover: 'https://picsum.photos/seed/track2/100',
  },
  {
    id: '3',
    user: {
      username: 'Midnight_Ghost',
      avatar: 'https://picsum.photos/seed/user3/200',
      isPro: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&q=80&w=1000',
    caption: 'Foggy streets and glowing neon. Perfect for a chill cruise.',
    tags: ['#NeonVibe', '#CyberpunkStreet'],
    likes: '8.2k',
    voiceCommentsCount: 150,
    audioTrackName: 'Synthwave Dreams - Vol 4',
    audioTrackCover: 'https://picsum.photos/seed/track3/100',
  }
];
