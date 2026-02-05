
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onBack: () => void;
}

const MUSIC_TRACKS = [
  { id: 'hajini', name: 'هجيني حزين.mp3', label: 'Hajini Sad' },
  { id: 'drift_phonk', name: 'Drift Phonk.mp3', label: 'Drift Phonk' },
  { id: 'shelat', name: 'شيلات إقلاع.mp3', label: 'Shelat Eql3' },
  { id: 'off', name: 'بدون موسيقى', label: 'No Music' },
];

export const CameraPage: React.FC<Props> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeMode, setActiveMode] = useState('ACTION'); // VIDEO, ACTION, DRIFT
  const [vocalBoost, setVocalBoost] = useState(true);
  const [error, setError] = useState<string>('');
  
  // New State for Engine Logic
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(MUSIC_TRACKS[0]);
  const [processingStep, setProcessingStep] = useState<string | null>(null); // If not null, we are processing
  const [showPreview, setShowPreview] = useState(false);

  // Initialize Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: true,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 60 }
          }
        };

        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
           const devices = await navigator.mediaDevices.enumerateDevices();
           const videoDevices = devices.filter(device => device.kind === 'videoinput');
           const wideCamera = videoDevices.find(device => 
             device.label.toLowerCase().includes('back') && 
             (device.label.includes('0.5') || device.label.includes('wide'))
           );
           if (wideCamera) {
             // @ts-ignore
             constraints.video.deviceId = { exact: wideCamera.deviceId };
           }
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        console.error("Camera Error:", err);
        setError("الكاميرا مش راضية تشتغل يا وحش. تأكد من الصلاحيات.");
      }
    };

    if (!showPreview) {
        startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showPreview]);

  const toggleRecording = () => {
    if (isRecording) {
        // Stop Recording -> Start Processing Simulation
        setIsRecording(false);
        startEngineSimulation();
    } else {
        setIsRecording(true);
    }
  };

  const startEngineSimulation = () => {
    const steps = [
        "جاري إرسال الفيديو للمحرك...",
        `تحميل ملف الصوت: ${selectedTrack.name}`,
        "librosa.load(video_path)...",
        "تحليل الطاقة الصوتية (RMS)...",
        "تحديد عتبة الصوت (Threshold)...",
        "اكتشاف صوت الزلم...",
        "Applying Auto-Ducking...",
        "دمج الصوت النهائي...",
        "تم يا كبير! الهيبة فل 🔥"
    ];

    let currentStep = 0;
    setProcessingStep(steps[0]);

    const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
            setProcessingStep(steps[currentStep]);
        } else {
            clearInterval(interval);
            setTimeout(() => {
                setProcessingStep(null);
                setShowPreview(true);
            }, 800);
        }
    }, 600);
  };

  const handleRetake = () => {
      setShowPreview(false);
      // Camera useEffect will re-trigger
  };

  // Preview View (After Processing)
  if (showPreview) {
      return (
        <div className="fixed inset-0 z-50 bg-black font-display flex flex-col items-center justify-between py-10 px-6">
            <div className="absolute inset-0 z-0">
                {/* Simulated Preview Image */}
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" alt="Preview" />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 w-full text-center mt-10">
                <div className="inline-block bg-[#FF3B30]/20 border border-[#FF3B30] rounded-full px-4 py-1 mb-4">
                    <span className="text-[#FF3B30] text-xs font-black tracking-widest uppercase">Smart Mix Active</span>
                </div>
                <h2 className="text-3xl font-black text-white drop-shadow-md">الفيديو جاهز</h2>
            </div>

            <div className="relative z-10 w-full bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white">graphic_eq</span>
                    </div>
                    <div className="text-right flex-1">
                        <h3 className="text-white font-bold text-sm">تقرير المحرك</h3>
                        <p className="text-zinc-400 text-xs">تم خفض الموسيقى 4 مرات عند الكلام</p>
                    </div>
                </div>
                <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-3/4"></div>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                    <span>RMS: 0.85</span>
                    <span>Ducking: Active</span>
                </div>
            </div>

            <div className="relative z-10 w-full flex gap-3">
                <button onClick={handleRetake} className="flex-1 py-4 rounded-xl bg-zinc-800 text-white font-bold border border-white/10">
                    حذف
                </button>
                <button onClick={onBack} className="flex-[2] py-4 rounded-xl bg-[#FF3B30] text-white font-black shadow-[0_0_20px_rgba(255,59,48,0.4)]">
                    نشر الفيديو 🚀
                </button>
            </div>
        </div>
      );
  }

  // Processing Overlay
  if (processingStep) {
      return (
        <div className="fixed inset-0 z-[60] bg-black font-display flex flex-col items-center justify-center relative overflow-hidden">
            {/* Matrix/Terminal Background Effect */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            
            <div className="w-20 h-20 border-4 border-t-[#FF3B30] border-r-[#FF3B30] border-b-transparent border-l-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_#FF3B30]"></div>
            
            <div className="text-center space-y-4 relative z-10 px-6">
                <h2 className="text-2xl font-black text-white tracking-widest animate-pulse">جاري المعالجة</h2>
                <div className="font-mono text-sm text-[#FF3B30] bg-black/50 p-4 rounded-xl border border-[#FF3B30]/30 min-w-[280px]">
                    <span className="text-zinc-500 mr-2">{'>'}</span>
                    {processingStep}
                    <span className="animate-pulse">_</span>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black font-display overflow-hidden flex flex-col">
      {/* Video Feed */}
      <div className="absolute inset-0 bg-zinc-900">
        {error ? (
           <div className="flex items-center justify-center h-full text-white text-center px-6">
              <p>{error}</p>
           </div>
        ) : (
           <video 
             ref={videoRef} 
             autoPlay 
             playsInline 
             muted 
             className={`w-full h-full object-cover transition-transform duration-500 ${activeMode === 'ACTION' ? 'scale-105' : 'scale-100'}`} 
           />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>
      </div>

      {/* Top Controls */}
      <div className="relative z-20 pt-12 px-6">
         <div className="flex justify-center mb-6">
            <h2 className="text-white font-black tracking-wide drop-shadow-md">جاهز للأكشن؟</h2>
         </div>

         {/* Vocal Boost Toggle */}
         <div className="bg-[#111]/80 backdrop-blur-md border border-[#FF3B30]/30 rounded-2xl p-3 flex items-center justify-between shadow-[0_0_20px_rgba(255,59,48,0.15)] mx-4">
            <div className="flex flex-col text-right">
               <span className="text-white text-sm font-bold">Smart Audio Engine</span>
               <span className="text-[#FF3B30] text-[10px] font-bold">خلط تلقائي + Auto Ducking</span>
            </div>
            <button 
               onClick={() => setVocalBoost(!vocalBoost)}
               className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 relative ${vocalBoost ? 'bg-[#FF3B30]' : 'bg-zinc-700'}`}
            >
               <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${vocalBoost ? '-translate-x-5' : 'translate-x-0'}`}></div>
            </button>
         </div>
      </div>

      {/* Right Sidebar Controls */}
      <div className="absolute right-4 top-1/3 z-20 flex flex-col gap-6 items-end">
         <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
            <span className="material-icons">flash_on</span>
         </button>
         
         {/* Music Selector Toggle */}
         <div className="relative">
             <button 
                onClick={() => setShowMusicMenu(!showMusicMenu)}
                className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center shadow-lg active:scale-90 transition-transform ${showMusicMenu ? 'bg-[#FF3B30] border-[#FF3B30] text-white' : 'bg-black/40 border-white/20 text-white'}`}
             >
                <span className="material-icons">music_note</span>
             </button>
             
             {/* Music Menu Popout */}
             {showMusicMenu && (
                 <div className="absolute right-12 top-0 bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 w-48 shadow-2xl animate-fade-in origin-right">
                    <h4 className="text-right text-xs font-bold text-zinc-500 mb-2 px-2">اختر الموسيقى الخلفية</h4>
                    <div className="flex flex-col gap-1">
                        {MUSIC_TRACKS.map(track => (
                            <button 
                                key={track.id}
                                onClick={() => { setSelectedTrack(track); setShowMusicMenu(false); }}
                                className={`text-right text-xs font-bold py-2 px-3 rounded-lg transition-colors ${selectedTrack.id === track.id ? 'bg-[#FF3B30] text-white' : 'text-white hover:bg-white/10'}`}
                            >
                                {track.name}
                            </button>
                        ))}
                    </div>
                 </div>
             )}
         </div>

         <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
            <span className="material-icons">flip_camera_ios</span>
         </button>
      </div>

      {/* Stabilization Indicator (Action Mode) */}
      {activeMode === 'ACTION' && (
         <div className="absolute left-6 top-1/3 z-20">
            <div className="flex flex-col items-center gap-1 opacity-80 animate-pulse-fast">
               <span className="material-icons text-yellow-400 text-2xl drop-shadow-md">vibration</span>
               <span className="text-[10px] text-yellow-400 font-bold bg-black/50 px-2 rounded">MANE3 IHTIZAZ</span>
            </div>
         </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 z-20 flex flex-col items-center bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
         
         {/* Shutter Button Row */}
         <div className="flex items-center justify-between w-full px-10 mb-8">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 border-2 border-white/20 overflow-hidden cursor-pointer active:scale-95 transition-transform">
               <img src="https://picsum.photos/seed/car_thumb/100" className="w-full h-full object-cover opacity-70" alt="Gallery" />
            </div>

            <button 
               onClick={toggleRecording}
               className={`relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 ${isRecording ? 'scale-110' : 'hover:scale-105'}`}
            >
               <div className={`w-full h-full rounded-full transition-all duration-300 flex items-center justify-center ${isRecording ? 'bg-transparent m-2 border-2 border-[#FF3B30]' : 'bg-[#FF3B30] m-1'}`}>
                  {isRecording ? (
                     <div className="w-6 h-6 bg-[#FF3B30] rounded-sm"></div>
                  ) : (
                     <span className="material-icons text-white text-3xl">mic</span>
                  )}
               </div>
               {!isRecording && <div className="absolute inset-0 rounded-full border border-[#FF3B30] opacity-50 animate-ping"></div>}
            </button>

            <button onClick={onBack} className="w-12 h-12 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform">
               <span className="material-icons">close</span>
            </button>
         </div>

         {/* Modes Slider */}
         <div className="flex items-center gap-6 text-sm font-black tracking-widest overflow-hidden h-8">
            {['VIDEO', 'ACTION MODE', 'DRIFT-CAM'].map((mode) => (
               <button 
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`transition-all duration-300 transform whitespace-nowrap ${activeMode === mode ? 'text-[#FF3B30] scale-110 text-shadow-sm' : 'text-white/40 scale-90'}`}
               >
                  {mode}
               </button>
            ))}
         </div>
         <div className="w-1.5 h-1.5 bg-[#FF3B30] rounded-full mt-2 shadow-[0_0_8px_#FF3B30]"></div>
      </div>
    </div>
  );
};
