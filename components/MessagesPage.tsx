
import React from 'react';

// Mock Data for Stories and Chats
const STORIES = [
  { id: 0, name: 'قصتي', img: 'https://picsum.photos/seed/ahmed_drift/200', isMe: true },
  { id: 1, name: 'DriftKing', img: 'https://picsum.photos/seed/user1/200', hasStory: true },
  { id: 2, name: 'Ghost', img: 'https://picsum.photos/seed/user3/200', hasStory: true },
  { id: 3, name: 'H100_Lover', img: 'https://picsum.photos/seed/user2/200', hasStory: false },
  { id: 4, name: 'Turbo', img: 'https://picsum.photos/seed/user4/200', hasStory: true },
  { id: 5, name: 'Mechanic', img: 'https://picsum.photos/seed/user5/200', hasStory: false },
  { id: 6, name: 'Speed', img: 'https://picsum.photos/seed/user6/200', hasStory: true },
];

const CHATS = [
  { id: 1, name: 'DriftKing_SA', msg: 'يا معلم متى التجمع الجاي؟ 🏎️', time: '9:41 م', unread: 2, img: 'https://picsum.photos/seed/user1/200', isOnline: true },
  { id: 2, name: 'Mechanic_Pro', msg: 'القطعة وصلت، مر علي بالورشة', time: '8:30 م', unread: 0, img: 'https://picsum.photos/seed/user5/200', isOnline: false },
  { id: 3, name: 'شلة الحارة', msg: 'Ahmed: وينكم يا شباب؟', time: 'أمس', unread: 5, img: 'https://picsum.photos/seed/group1/200', isGroup: true },
  { id: 4, name: 'Street_Ghost', msg: 'صوت التيربو عندك طرب 🔥', time: 'أمس', unread: 0, img: 'https://picsum.photos/seed/user3/200', isOnline: true },
  { id: 5, name: 'Police_Chase', msg: 'Sent a voice message', isVoice: true, time: '2 يوم', unread: 0, img: 'https://picsum.photos/seed/user9/200', isOnline: false },
  { id: 6, name: 'Unknown_Racer', msg: 'تتحدى؟', time: '1 أسبوع', unread: 0, img: 'https://picsum.photos/seed/user10/200', isOnline: false },
];

export const MessagesPage: React.FC = () => {
  return (
    <div className="w-full h-full bg-black overflow-y-auto pb-24 font-display animate-fade-in no-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-md px-6 py-5 flex items-center justify-between border-b border-white/5 shadow-lg">
         <div className="flex gap-4 items-center">
            <button className="material-icons text-white/80 hover:text-[#FF3B30] transition-colors">edit_square</button>
            <button className="material-icons text-white/80 hover:text-[#FF3B30] transition-colors">camera_alt</button>
         </div>
         <h1 className="text-2xl font-black text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">الدواوين</h1>
      </div>

      {/* Stories Rail */}
      <div className="py-5 border-b border-white/5 bg-[#050505]">
         <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar items-center flex-row-reverse">
            {/* Add Story (Current User) */}
            <div className="flex flex-col items-center gap-2 min-w-[70px]">
               <div className="relative w-[70px] h-[70px]">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"></div>
                  <div className="absolute inset-1 rounded-full bg-[#111] overflow-hidden">
                     <img src={STORIES[0].img} alt="My Story" className="w-full h-full object-cover opacity-60" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FF3B30] rounded-full border-2 border-black flex items-center justify-center shadow-[0_0_10px_#FF3B30]">
                     <span className="material-icons text-white text-[14px] font-bold">add</span>
                  </div>
               </div>
               <span className="text-[10px] font-bold text-white/50">قصتي</span>
            </div>

            {/* Friends Stories */}
            {STORIES.filter(s => !s.isMe).map(story => (
               <div key={story.id} className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group">
                  <div className={`relative w-[70px] h-[70px] p-[2px] rounded-full transition-transform active:scale-95 ${story.hasStory ? 'bg-gradient-to-tr from-[#FF3B30] via-[#FF5722] to-yellow-500 shadow-[0_0_15px_rgba(255,59,48,0.3)]' : 'bg-zinc-800 border border-white/10'}`}>
                     <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-black">
                        <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                     </div>
                  </div>
                  <span className={`text-[10px] font-bold transition-colors ${story.hasStory ? 'text-white' : 'text-zinc-500'}`}>{story.name}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
         <div className="relative group">
            <input 
               type="text" 
               placeholder="دور على خويك..." 
               className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pr-10 pl-4 text-right text-white text-sm focus:outline-none focus:border-[#FF3B30]/50 focus:shadow-[0_0_15px_rgba(255,59,48,0.1)] transition-all placeholder-zinc-600"
            />
            <span className="material-icons absolute right-3 top-3 text-zinc-500 group-focus-within:text-[#FF3B30] transition-colors">search</span>
         </div>
      </div>

      {/* Chat List */}
      <div className="flex flex-col">
         {CHATS.map(chat => (
            <div key={chat.id} className="flex flex-row-reverse items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 active:bg-white/10 group">
               {/* Avatar */}
               <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
                     <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
                  </div>
                  {chat.isOnline && (
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  )}
               </div>

               {/* Content */}
               <div className="flex-1 text-right min-w-0">
                  <div className="flex flex-row-reverse justify-between items-baseline mb-1">
                     <h3 className="text-white font-bold text-base truncate ml-2">{chat.name}</h3>
                     <span className={`text-[10px] font-bold whitespace-nowrap ${chat.unread > 0 ? 'text-[#FF3B30]' : 'text-zinc-600'}`}>{chat.time}</span>
                  </div>
                  <div className="flex flex-row-reverse justify-between items-center">
                     <p className={`text-sm truncate max-w-[200px] dir-rtl ${chat.unread > 0 ? 'text-white font-bold' : 'text-zinc-500'}`}>
                        {chat.isVoice ? (
                           <span className="flex items-center gap-1 flex-row-reverse">
                              <span className="material-icons text-sm text-[#FF3B30]">mic</span>
                              رسالة صوتية
                           </span>
                        ) : chat.msg}
                     </p>
                     {chat.unread > 0 && (
                        <div className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-[0_0_8px_#FF3B30]">
                           <span className="text-[10px] font-black text-white">{chat.unread}</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
      
      {/* Bottom Aesthetic Filler */}
      <div className="py-8 text-center opacity-30 flex flex-col items-center gap-2">
         <span className="material-icons text-4xl text-zinc-600">lock</span>
         <p className="text-xs text-zinc-500 font-bold tracking-widest">الرسائل مشفرة بنظام الحارة</p>
      </div>
    </div>
  );
};
