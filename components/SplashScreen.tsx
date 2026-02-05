
import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC = () => {
  const [velocity, setVelocity] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Velocity Simulation
    const vInterval = setInterval(() => {
      setVelocity(v => {
        if (v >= 142) return 142;
        return v + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    // Progress Simulation
    const pInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 1.5;
      });
    }, 40);

    return () => {
      clearInterval(vInterval);
      clearInterval(pInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-between py-12 px-6 font-display overflow-hidden">
      
      {/* Background Tire Tracks (Abstract) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 -left-10 w-[120%] h-20 border-t-4 border-dashed border-white transform rotate-12"></div>
        <div className="absolute bottom-40 -right-10 w-[120%] h-20 border-b-4 border-dashed border-white transform -rotate-6"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
        {/* Main Arabic Logo */}
        <div className="relative group cursor-default">
           <h1 className="text-[7rem] leading-tight font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF5722] to-[#FF3B30] drop-shadow-[0_0_35px_rgba(255,59,48,0.5)] transform hover:scale-105 transition-transform duration-700 select-none">
             زلمتي
           </h1>
           {/* Glow Layer */}
           <h1 className="absolute inset-0 text-[7rem] leading-tight font-black text-[#FF3B30] opacity-30 blur-xl pointer-events-none select-none">
             زلمتي
           </h1>
        </div>

        {/* ZZZZZZZZZ Graphic */}
        <div className="flex flex-col items-center mt-2 opacity-80 gap-1">
           <div className="text-[#3a0a0a] text-2xl font-black italic tracking-[0.2em]" style={{ textShadow: '1px 1px 0 #FF3B30' }}>
             ZZZZZZZZ
           </div>
           <div className="flex gap-6 mt-2">
             <div className="w-1 h-6 bg-[#FF3B30] shadow-[0_0_8px_#FF3B30]"></div>
             <div className="w-1 h-10 bg-[#FF3B30] shadow-[0_0_12px_#FF3B30]"></div>
             <div className="w-1 h-6 bg-[#FF3B30] shadow-[0_0_8px_#FF3B30]"></div>
           </div>
        </div>
      </div>

      {/* Dashboard UI */}
      <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-5 relative overflow-hidden shadow-2xl">
         {/* Top Row */}
         <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">Velocity</div>
              <div className="text-5xl font-black text-white flex items-baseline tracking-tighter">
                {velocity}
                <span className="text-lg text-[#FF3B30] ml-1 font-bold">KM/H</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">Status</div>
              <div className="text-sm font-bold text-[#FF3B30] animate-pulse">IGNITING...</div>
            </div>
         </div>

         {/* Progress Bar */}
         <div className="relative h-4 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF3B30] to-[#FF5722] shadow-[0_0_15px_#FF3B30]"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
         </div>

         {/* Scale Labels */}
         <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono font-bold">
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span className="text-[#FF3B30]">200</span>
         </div>

         <div className="mt-4 text-center">
            <p className="text-[10px] text-zinc-700 font-bold tracking-[0.3em] uppercase">ZALAMATI DRIFT NETWORK v1.0</p>
         </div>
      </div>
    </div>
  );
};
