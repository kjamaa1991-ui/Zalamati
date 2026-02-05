
import React, { useState } from 'react';
import { VoiceComment } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const MOCK_COMMENTS: VoiceComment[] = [
  { id: 'c1', user: { username: 'مستخدم_1', avatar: '', isPro: false }, duration: '0:15', likes: '1.2K', timestamp: Date.now() - 50000 },
  { id: 'c2', user: { username: 'سائق_محترف', avatar: '', isPro: true }, duration: '0:08', likes: '340', timestamp: Date.now() - 100000 },
  { id: 'c3', user: { username: 'زلمتي_قديم', avatar: '', isPro: false }, duration: '0:22', likes: '5K', timestamp: Date.now() - 150000 },
];

const Waveform: React.FC = () => {
  return (
    <div className="flex items-center gap-0.5 h-6 px-1 overflow-hidden w-full">
      {[...Array(25)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white w-0.5 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          style={{ height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
  );
};

export const VoiceCommentModal: React.FC<Props> = ({ isOpen, onClose, postId }) => {
  const [isRecording, setIsRecording] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Content Panel */}
      <div className="relative w-full bg-[#0a0a0a] rounded-t-[40px] p-6 pt-4 shadow-[0_-20px_50px_rgba(0,0,0,1)] border-t border-white/5 flex flex-col gap-6 animate-slide-up">
        {/* Handle */}
        <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-2" />
        
        {/* Header Title */}
        <h2 className="text-2xl font-bold text-white text-center font-display tracking-tight text-glow-strong">
          التعليقات
        </h2>

        {/* Comments List */}
        <div className="flex flex-col gap-6 max-h-[380px] overflow-y-auto no-scrollbar py-2">
          {MOCK_COMMENTS.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 group">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                <span className="material-icons text-white/40 text-xl">person</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-white/80">{comment.user.username}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Play Button */}
                  <button className="material-icons text-white text-2xl drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    play_circle
                  </button>
                  
                  {/* Glowing Waveform Container */}
                  <div className="flex-1 bg-white/5 rounded-full px-2 py-1 flex items-center border border-white/10">
                     <Waveform />
                  </div>

                  {/* Stats Container */}
                  <div className="flex items-center gap-3 pr-1">
                    <span className="text-[10px] text-white/60 font-mono font-bold whitespace-nowrap">
                      {comment.duration}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="material-icons text-[14px] text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                        local_fire_department
                      </span>
                      <span className="text-[11px] font-black text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] tracking-tighter">
                        {comment.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recording Section */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/5">
          <div className="relative">
            {isRecording && (
              <div className="absolute -inset-4 rounded-full bg-white/20 animate-ping" />
            )}
            <button 
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
              onMouseLeave={() => setIsRecording(false)}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all transform active:scale-90 ${isRecording ? 'bg-accent-orange shadow-[0_0_40px_rgba(255,87,34,0.6)]' : 'bg-white'}`}
            >
              <span className={`material-icons text-4xl ${isRecording ? 'text-white' : 'text-black'}`}>
                {isRecording ? 'graphic_eq' : 'mic'}
              </span>
            </button>
          </div>
          <p className="text-white font-bold text-sm tracking-wide text-glow">
            {isRecording ? 'RECORDING...' : 'اضغط وسجّل...'}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .text-glow-strong { text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255,255,255,1); }
      `}</style>
    </div>
  );
};
