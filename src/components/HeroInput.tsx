import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Moon,
  Compass,
  CloudRain,
  RefreshCw,
  CornerDownLeft,
  AlertCircle
} from 'lucide-react';
import { DEMO_PRESETS } from '../services/demoPresets';
import { DemoPreset } from '../types';
import { LiveAudioWave } from './LiveAudioWave';

interface HeroInputProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onAnalyze: (promptText?: string) => void;
  isLoading: boolean;
  onSelectPreset: (preset: DemoPreset) => void;
  activePresetId?: string;
}

export const HeroInput: React.FC<HeroInputProps> = ({
  inputPrompt,
  setInputPrompt,
  onAnalyze,
  isLoading,
  onSelectPreset,
  activePresetId,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Toggle Voice Note (Web Speech API with simulated fallback)
  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        setIsRecording(true);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputPrompt(transcript);
          setIsRecording(false);
        };

        recognition.onerror = () => {
          simulateVoiceInput();
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch {
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    // Voice simulation typing effect
    const sampleVoice =
      "Voice Note (Transcribed): Stuck near Swargate junction in pouring rain with knee-deep water. Need an elevated safe bypass route toward FC Road, plus open dry tea stalls nearby.";
    let currentIndex = 0;
    setInputPrompt('');

    const interval = setInterval(() => {
      currentIndex += 4;
      setInputPrompt(sampleVoice.slice(0, currentIndex));
      if (currentIndex >= sampleVoice.length) {
        clearInterval(interval);
        setTimeout(() => setIsRecording(false), 600);
      }
    }, 40);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (inputPrompt.trim() && !isLoading) {
        onAnalyze();
      }
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Intelligent Urban Chaos & Safety Command Center</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Navigate City Chaos with{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Gemini Intelligence
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          From unlit alleys and sudden cloudbursts to legendary street food stalls—transform messy citizen alarms and travel intentions into structured survival & exploration radar.
        </p>
      </div>

      {/* QUICK DEMO PRESET BUTTONS (Judges 1-Click Evaluation) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Judges 1-Click Quick Demo Presets
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Click any card to instantly test Gemini reasoning
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/70 via-slate-900/90 to-purple-950/60 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                    : 'glass-panel hover:border-slate-600 hover:bg-slate-800/60 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-xl transition ${
                        preset.id === 'pune-night-transit'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : preset.id === 'old-city-heritage-food'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {preset.id === 'pune-night-transit' && <Moon className="w-4 h-4" />}
                      {preset.id === 'old-city-heritage-food' && <Compass className="w-4 h-4" />}
                      {preset.id === 'monsoon-rush-hour' && <CloudRain className="w-4 h-4" />}
                    </div>
                    <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-400 group-hover:text-cyan-300 transition">
                      {preset.tag}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}
                  >
                    Preset {preset.id === 'pune-night-transit' ? '1' : preset.id === 'old-city-heritage-food' ? '2' : '3'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition mb-1">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                  {preset.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* INPUT BAR: Messy Unstructured Textarea + Voice + Action Button */}
      <div className="relative rounded-2xl glass-panel p-3 sm:p-4 border border-cyan-500/20 shadow-2xl">
        {/* Sound Wave Recording Overlay if active */}
        {isRecording && (
          <div className="mb-3">
            <LiveAudioWave isRecording={isRecording} onStop={() => setIsRecording(false)} />
          </div>
        )}

        <div className="relative">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Describe your messy urban reality... e.g., 'Stranded near central railway station at midnight with 2 friends, rain pouring down, looking for open safe chai stalls and how to avoid flooded underpasses...'"
            className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-100 placeholder-slate-500 resize-none focus:outline-none transition leading-relaxed font-sans"
          />

          {inputPrompt && (
            <button
              onClick={() => setInputPrompt('')}
              className="absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Clear input"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Input Footer Controls */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Voice Note simulated / mic toggle button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border-slate-700/80 hover:text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{isRecording ? 'Listening...' : 'Simulate Voice Note'}</span>
            </button>

            <span className="hidden sm:inline-flex text-[11px] text-slate-500 items-center gap-1 font-mono-code">
              <CornerDownLeft className="w-3 h-3" /> Press ⌘ + Enter to execute
            </span>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => onAnalyze()}
            disabled={isLoading || !inputPrompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-600 text-slate-950 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Decoding Urban Chaos...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Analyze City Pulse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
