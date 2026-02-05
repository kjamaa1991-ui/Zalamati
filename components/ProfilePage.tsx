
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

// --- RANK SYSTEM COMPONENT (Sub-view) ---
const RankSystem: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="w-full h-full bg-black overflow-y-auto pb-28 pt-10 font-display animate-fade-in no-scrollbar">
       {/* Header */}
       <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
          <button className="material-icons text-white/60 hover:text-white transition-colors">info_outline</button>
          <h1 className="text-xl font-bold text-white tracking-wide">نظام الرتب</h1>
          <button onClick={onBack} className="material-icons text-white hover:text-accent-orange transition-colors">arrow_forward</button>
       </div>

       {/* Hero/Progress Section */}
       <div className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-2xl font-black text-white mb-4 leading-relaxed relative z-10 text-right">
            رحلتك من <span className="text-zinc-500">ناشئ</span> إلى <span className="text-accent-orange">شيخ</span>
          </h2>
          
          <div className="flex justify-between items-center text-sm font-bold text-zinc-400 mb-2 relative z-10">
            <span className="text-accent-orange drop-shadow-[0_0_8px_rgba(255,87,34,0.5)]">65% 🔥</span>
            <span>التقدم الحالي</span>
          </div>

          <div className="h-5 bg-zinc-900 rounded-full overflow-hidden border border-white/10 relative z-10 shadow-inner">
             <div className="h-full bg-gradient-to-l from-accent-orange to-zalamati-red w-[65%] shadow-[0_0_15px_#FF5722] relative">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]"></div>
             </div>
          </div>

          <div className="flex justify-between text-xs font-bold mt-3 relative z-10">
             <span className="text-zinc-600">التالي: سند</span>
             <span className="text-white">المستوى الحالي: <span className="text-accent-orange">زلمة</span></span>
          </div>
       </div>

       {/* Ranks List */}
       <div className="px-4 flex flex-col gap-4">
          <div className="relative bg-[#111] border border-accent-orange/50 rounded-2xl p-5 overflow-hidden group hover:bg-[#161616] transition-colors">
             <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange shadow-[0_0_10px_#FF5722]"></div>
             <div className="flex flex-row-reverse justify-between items-start mb-3 relative z-10">
                <div className="text-right">
                   <span className="bg-accent-orange/20 text-accent-orange text-[10px] font-black px-2 py-1 rounded border border-accent-orange/30 mb-2 inline-block">تم الوصول</span>
                   <h3 className="text-xl font-black text-white">زلمة (Zalma)</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center border border-accent-orange/50 shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                   <span className="material-icons text-accent-orange text-2xl">local_fire_department</span>
                </div>
             </div>
             <p className="text-zinc-400 text-sm font-bold leading-relaxed relative z-10 text-right">
               اجمع نار (Fire) لرفع سمعتك. البداية الحقيقية في الشارع.
             </p>
          </div>

          {/* Locked Cards */}
          {['سند (Sanad)', 'ريس (Rayes)', 'شيخ (Sheikh)'].map((rank, i) => (
            <div key={i} className="relative bg-[#080808] border border-white/5 rounded-2xl p-5 overflow-hidden opacity-70">
               <div className="flex flex-row-reverse justify-between items-start mb-3">
                  <h3 className="text-xl font-black text-zinc-500">{rank}</h3>
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                     <span className="material-icons text-zinc-600 text-2xl">lock</span>
                  </div>
               </div>
               <span className="material-icons absolute left-4 bottom-4 text-zinc-800 text-4xl -rotate-12">lock</span>
            </div>
          ))}
       </div>
    </div>
  );
};

// --- MAIN PROFILE DASHBOARD ---
const ProfileDashboard: React.FC<{ onRankClick: () => void }> = ({ onRankClick }) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'likes'>('videos');

  const MOCK_VIDEOS = [
    'https://images.unsplash.com/photo-1611562608779-3c727187216a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1599409897184-90e96ce08323?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <div className="w-full h-full bg-black overflow-y-auto font-display animate-fade-in no-scrollbar pb-24">
      {/* Top Section with Car Background */}
      <div className="relative w-full h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000" 
          alt="Cover" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Top Icons */}
        <div className="absolute top-4 left-0 right-0 px-6 z-20 flex justify-between items-center text-white">
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
            <span className="material-icons text-xl">more_vert</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
            <span className="material-icons text-xl">share</span>
          </button>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-6 -mt-16 z-20 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-black p-1 bg-[#111] shadow-[0_0_30px_rgba(255,59,48,0.4)]">
             <img 
               src="https://picsum.photos/seed/ahmed_drift/200" 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover"
             />
          </div>
          {/* Badge */}
          <div className="absolute bottom-1 right-0 w-8 h-8 bg-gradient-to-br from-[#FF3B30] to-[#b91c1c] rounded-full border-2 border-black flex items-center justify-center shadow-lg">
             <span className="material-icons text-white text-[14px]">local_police</span>
          </div>
        </div>

        {/* Name & Handle */}
        <h1 className="text-3xl font-black text-[#FF3B30] mt-3 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(255,59,48,0.4)]">
          Ahmed Drift
        </h1>
        <p className="text-zinc-500 font-bold text-sm tracking-wider">@Street_Samurai</p>

        {/* Voice Bio */}
        <div className="w-full mt-6 bg-[#111] border border-[#FF3B30]/30 rounded-2xl p-3 flex items-center justify-between shadow-[0_0_15px_rgba(255,59,48,0.1)] group cursor-pointer hover:bg-[#161616] transition-colors">
           <button className="w-10 h-10 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-[0_0_10px_rgba(255,59,48,0.6)] group-active:scale-90 transition-transform">
              <span className="material-icons text-white">play_arrow</span>
           </button>
           
           {/* Fake Waveform */}
           <div className="flex-1 flex items-center justify-end gap-1 px-4 h-8 overflow-hidden">
             {[...Array(15)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-[#FF3B30]/40 rounded-full"
                  style={{ height: `${Math.random() * 100}%` }}
                ></div>
             ))}
           </div>

           <div className="text-right">
              <p className="text-white text-xs font-bold">اسمع مين أنا</p>
              <p className="text-[#FF3B30] text-[10px] font-mono">0:14</p>
           </div>
        </div>

        {/* Stats Row */}
        <div className="w-full grid grid-cols-3 gap-3 mt-6">
           <div className="bg-[#111] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center hover:border-white/10 transition-colors">
              <span className="text-xl font-black text-white">12.5k</span>
              <span className="text-[10px] text-zinc-500 font-bold mt-1">الربع</span>
           </div>
           
           <div className="bg-[#111] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center hover:border-white/10 transition-colors">
              <span className="text-xl font-black text-[#FF3B30]">842</span>
              <span className="text-[10px] text-zinc-500 font-bold mt-1">السمعة</span>
           </div>

           <button 
             onClick={onRankClick}
             className="bg-[#111] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center hover:bg-[#161616] hover:border-[#FF3B30]/30 transition-all group relative overflow-hidden"
           >
              <div className="absolute inset-0 bg-[#FF3B30]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-xl font-black text-white group-hover:text-[#FF3B30] transition-colors">Sheikh</span>
              <span className="text-[10px] text-zinc-500 font-bold mt-1">الرتبة</span>
           </button>
        </div>

        {/* Edit Profile Action */}
        <div className="w-full flex gap-3 mt-6">
           <button className="flex-1 bg-gradient-to-r from-[#b91c1c] to-[#FF3B30] text-white font-black py-3 rounded-xl shadow-[0_0_20px_rgba(255,59,48,0.2)] flex items-center justify-center gap-2 active:scale-95 transition-transform uppercase tracking-widest text-sm">
             <span className="material-icons text-sm">edit</span>
             Edit Profile
           </button>
           <button className="w-12 bg-[#111] border border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:text-white active:scale-95 transition-all">
             <span className="material-icons">bookmark_border</span>
           </button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-8 border-b border-white/10 px-6 flex items-center justify-around">
        <button 
          onClick={() => setActiveTab('videos')}
          className={`pb-4 flex items-center gap-2 transition-all relative ${activeTab === 'videos' ? 'text-white' : 'text-zinc-600'}`}
        >
          <span className="material-icons">grid_view</span>
          <span className="font-bold text-sm">فيديوهاتي</span>
          {activeTab === 'videos' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF3B30] shadow-[0_0_10px_#FF3B30]"></div>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('likes')}
          className={`pb-4 flex items-center gap-2 transition-all relative ${activeTab === 'likes' ? 'text-white' : 'text-zinc-600'}`}
        >
          <span className="material-icons">local_fire_department</span>
          <span className="font-bold text-sm">اللي حبيتهم</span>
          {activeTab === 'likes' && (
             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF3B30] shadow-[0_0_10px_#FF3B30]"></div>
          )}
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2 gap-0.5 mt-0.5">
         {activeTab === 'videos' ? (
           MOCK_VIDEOS.map((url, idx) => (
             <div key={idx} className="aspect-[3/4] bg-[#111] relative group overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white drop-shadow-md">
                   <span className="material-icons text-[12px]">play_arrow</span>
                   <span className="text-[10px] font-bold">15.2k</span>
                </div>
                {idx === 1 && (
                   <div className="absolute top-2 right-2 bg-[#FF3B30] text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">NEW</div>
                )}
             </div>
           ))
         ) : (
           <div className="col-span-2 py-12 text-center text-zinc-600">
             <span className="material-icons text-4xl mb-2 opacity-50">favorite_border</span>
             <p className="text-xs font-bold">لسه ما حبيت اشي يا زلمة؟</p>
           </div>
         )}
      </div>
    </div>
  );
};

export const ProfilePage: React.FC<Props> = ({ onBack }) => {
  const [view, setView] = useState<'dashboard' | 'rank'>('dashboard');

  if (view === 'rank') {
    return <RankSystem onBack={() => setView('dashboard')} />;
  }

  return <ProfileDashboard onRankClick={() => setView('rank')} />;
};
