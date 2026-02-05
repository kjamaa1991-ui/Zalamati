
import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-between py-8 px-6 font-display overflow-hidden text-right">
       
       {/* Background Texture - Concrete Wall vibe */}
       <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none" 
            style={{ 
              backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-wall.png")`,
              backgroundSize: '300px'
            }}>
       </div>
       
       {/* Top Light Effect */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-[#FF3B30] shadow-[0_0_120px_60px_rgba(255,59,48,0.4)] rounded-full z-0 opacity-80"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white blur-[2px] z-10 opacity-90"></div>

       <div className="w-full flex-1 flex flex-col items-center justify-center relative z-20 -mt-10">
          {/* Logo Section */}
          <div className="mb-10 flex flex-col items-center relative">
             <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Neon Z SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,59,48,1)] filter drop-shadow-[0_0_30px_rgba(255,59,48,0.6)]">
                   <path d="M 25 25 L 75 25 L 25 75 L 75 75" fill="none" stroke="#FF3B30" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                   {/* Extra ornamental lines for "cyber/street" feel */}
                   <path d="M 20 35 L 40 35" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
                   <path d="M 60 65 L 80 65" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
                </svg>
             </div>
             <div className="flex flex-col items-center mt-2">
                <span className="text-[#FF3B30] text-[10px] tracking-[0.4em] font-black drop-shadow-[0_0_5px_#FF3B30]">A A A L</span>
                <span className="text-white text-xs tracking-[0.3em] font-bold drop-shadow-md">ZALAMATI</span>
             </div>
          </div>

          <h1 className="text-3xl font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-wide">
            تسجيل الساحة
          </h1>
          <p className="text-zinc-400 text-sm font-bold mb-12 tracking-wide">
            أدخل بياناتك لدخول عالم الدواوين
          </p>

          {/* Inputs */}
          <div className="w-full space-y-6 mb-16 px-2">
            <div className="relative group">
               <input 
                 type="text" 
                 value={nickname}
                 onChange={(e) => setNickname(e.target.value)}
                 className="w-full bg-transparent border-2 border-[#FF3B30] rounded-xl py-4 px-6 text-right text-white font-bold text-lg outline-none shadow-[0_0_15px_rgba(255,59,48,0.15),inset_0_0_15px_rgba(255,59,48,0.05)] focus:shadow-[0_0_25px_rgba(255,59,48,0.4),inset_0_0_20px_rgba(255,59,48,0.1)] transition-all placeholder-transparent dir-rtl z-10 relative"
                 placeholder="لقبك"
               />
               <span className="absolute right-5 top-4 text-zinc-500 font-bold transition-all group-focus-within:-top-3 group-focus-within:bg-[#09090b] group-focus-within:text-[#FF3B30] group-focus-within:px-2 group-focus-within:text-xs z-20 pointer-events-none shadow-[0_0_10px_#09090b]">
                 لقبك
               </span>
            </div>

            <div className="relative group">
               <input 
                 type="tel" 
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 className="w-full bg-transparent border-2 border-[#FF3B30] rounded-xl py-4 px-6 text-right text-white font-bold text-lg outline-none shadow-[0_0_15px_rgba(255,59,48,0.15),inset_0_0_15px_rgba(255,59,48,0.05)] focus:shadow-[0_0_25px_rgba(255,59,48,0.4),inset_0_0_20px_rgba(255,59,48,0.1)] transition-all placeholder-transparent dir-rtl z-10 relative"
                 placeholder="رقمك"
               />
               <span className="absolute right-5 top-4 text-zinc-500 font-bold transition-all group-focus-within:-top-3 group-focus-within:bg-[#09090b] group-focus-within:text-[#FF3B30] group-focus-within:px-2 group-focus-within:text-xs z-20 pointer-events-none shadow-[0_0_10px_#09090b]">
                 رقمك
               </span>
            </div>
          </div>

          {/* Enter Button */}
          <div className="relative">
             <div className="absolute inset-0 bg-[#FF3B30] blur-[20px] opacity-40 rounded-full animate-pulse"></div>
             <button 
                onClick={onLogin}
                className="relative w-28 h-28 rounded-full bg-[#0a0a0a] border-[3px] border-[#FF3B30] shadow-[0_0_20px_rgba(255,59,48,0.5),inset_0_0_20px_rgba(255,59,48,0.2)] flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform hover:shadow-[0_0_40px_rgba(255,59,48,0.7),inset_0_0_30px_rgba(255,59,48,0.4)] group z-20"
             >
                <span className="text-white font-black text-lg leading-tight text-center group-hover:text-[#FF3B30] transition-colors drop-shadow-md">
                دخول<br/>الساحة
                </span>
             </button>
          </div>
       </div>

       {/* Footer */}
       <div className="w-full flex flex-col items-center gap-5 relative z-20 pb-4">
          <p className="text-zinc-500 text-xs font-bold tracking-wide">
            بفوتتك، أنت وافقت على ميثاق الزلم
          </p>
          <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <button className="text-zinc-500 text-sm font-bold hover:text-white transition-colors">
            عضو قديم؟ <span className="text-[#FF3B30]">تسجيل دخول</span>
          </button>
       </div>
    </div>
  );
};
