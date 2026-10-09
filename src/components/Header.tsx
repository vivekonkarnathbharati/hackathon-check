import React from 'react';
import { Compass, Sparkles, Key, Share2, Activity, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  apiKey: string;
  onOpenKeyModal: () => void;
  onOpenExportModal: () => void;
  hasReport: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  apiKey,
  onOpenKeyModal,
  onOpenExportModal,
  hasReport,
}) => {
  const hasCustomKey = Boolean(apiKey || import.meta.env.VITE_GEMINI_API_KEY);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Section */}
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition duration-300">
              <Compass className="w-6 h-6 text-white transform group-hover:rotate-45 transition duration-500" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-background"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                ChaosGrid AI
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Hackathon Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide hidden md:block">
              Real-time Urban Chaos Navigation & Exploration Engine
            </p>
          </div>
        </div>

        {/* Telemetry Status and Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Engine Status indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400 font-medium">Model:</span>
            <span className="text-cyan-400 font-mono-code font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" /> Gemini 1.5 Flash
            </span>
          </div>

          {/* Export / Share Button */}
          {hasReport && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-cyan-300 shadow-sm transition hover:scale-105"
              title="Export Urban Brief"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Brief</span>
            </button>
          )}

          {/* API Key Modal Button */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
              hasCustomKey
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
            }`}
          >
            {hasCustomKey ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">API Connected</span>
                <span className="sm:hidden">Key</span>
              </>
            ) : (
              <>
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Set Gemini Key</span>
                <span className="sm:hidden">Key</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
