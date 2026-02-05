
import React from 'react';
import { FeedPost } from '../types';

interface Props {
  post: FeedPost;
  onShowComments: () => void;
}

export const FeedItem: React.FC<Props> = ({ post, onShowComments }) => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
      {/* Background Visual */}
      <div className="absolute inset-0 z-0">
        <img 
          src={post.imageUrl} 
          alt={post.caption}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      {/* Interactions Side Bar */}
      <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-8 pb-4">
        {/* Profile */}
        <div className="group relative">
          <div className="w-14 h-14 rounded-full border-2 border-primary p-0.5 shadow-lg overflow-hidden bg-gray-900">
            <img 
              src={post.user.avatar} 
              alt={post.user.username} 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent-orange rounded-full w-5 h-5 flex items-center justify-center border border-white shadow-md">
            <span className="material-icons text-[12px] text-white font-bold">add</span>
          </div>
        </div>

        {/* Like/Fire */}
        <div className="flex flex-col items-center gap-1">
          <button className="w-12 h-12 flex items-center justify-center transition-transform active:scale-75 group">
            <span className="material-icons text-5xl text-accent-orange fire-glow group-hover:scale-110 transition-transform animate-pulse-fast">
              local_fire_department
            </span>
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">{post.likes}</span>
        </div>

        {/* Voice Comments Trigger */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={onShowComments}
            className="w-12 h-12 flex items-center justify-center transition-transform active:scale-75 hover:scale-110"
          >
            <span className="material-icons text-4xl text-white drop-shadow-md">
              mic_external_on
            </span>
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">Voice</span>
        </div>

        {/* Boost/Rocket */}
        <div className="flex flex-col items-center gap-1">
          <button className="w-12 h-12 flex items-center justify-center transition-transform active:scale-75 hover:rotate-12">
            <span className="material-icons text-4xl text-white drop-shadow-md rotate-45">rocket_launch</span>
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">Boost</span>
        </div>

        {/* Spinning Audio Disk */}
        <div className="mt-4 animate-spin-slow">
          <div className="w-12 h-12 rounded-full bg-black border-[6px] border-white/20 flex items-center justify-center overflow-hidden shadow-inner">
            <img 
              src={post.audioTrackCover} 
              alt="Music" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Info Bottom Bar */}
      <div className="absolute bottom-24 left-6 right-20 z-20 text-white">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-xl drop-shadow-md tracking-tight">@{post.user.username}</h3>
          {post.user.isPro && (
            <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black border border-white/20 uppercase tracking-widest">
              PRO
            </span>
          )}
        </div>
        
        <p className="text-base text-gray-100 drop-shadow-md mb-3 leading-relaxed font-medium">
          {post.caption}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, idx) => (
            <span key={idx} className={`text-lg font-black italic tracking-tighter drop-shadow-sm ${idx === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-graffiti' : 'text-white/80'}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-hidden w-full max-w-[80%]">
          <span className="material-icons text-sm animate-pulse">music_note</span>
          <div className="whitespace-nowrap text-xs font-bold tracking-wide overflow-hidden relative">
             <div className="inline-block animate-marquee whitespace-nowrap">
                {post.audioTrackName} &nbsp;&nbsp; • &nbsp;&nbsp; {post.audioTrackName}
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};
