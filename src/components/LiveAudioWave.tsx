import React, { useEffect, useState } from 'react';
import { Mic, Radio } from 'lucide-react';

interface LiveAudioWaveProps {
  isRecording: boolean;
  onStop: () => void;
}

export const LiveAudioWave: React.FC<LiveAudioWaveProps> = ({ isRecording, onStop }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isRecording) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 animate-pulse-slow">
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Mic className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono-code font-bold tracking-wider text-white">
            AUDIO STREAM ACTIVE [{formatTime(seconds)}]
          </span>
        </div>

        {/* Animated Sound Waveform Bars */}
        <div className="flex items-center gap-1 h-6 px-2">
          <span className="w-1 bg-cyan-400 rounded-full soundwave-bar" />
          <span className="w-1 bg-indigo-400 rounded-full soundwave-bar" />
          <span className="w-1 bg-cyan-300 rounded-full soundwave-bar" />
          <span className="w-1 bg-purple-400 rounded-full soundwave-bar" />
          <span className="w-1 bg-emerald-400 rounded-full soundwave-bar" />
          <span className="w-1 bg-cyan-400 rounded-full soundwave-bar" />
          <span className="w-1 bg-indigo-300 rounded-full soundwave-bar" />
          <span className="w-1 bg-cyan-500 rounded-full soundwave-bar" />
        </div>
      </div>

      <button
        onClick={onStop}
        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition"
      >
        Done Speaking
      </button>
    </div>
  );
};
