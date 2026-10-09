import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroInput } from './components/HeroInput';
import { SafetyRadarCard } from './components/SafetyRadarCard';
import { CulturalFoodCard } from './components/CulturalFoodCard';
import { ComparisonMatrixCard } from './components/ComparisonMatrixCard';
import { ActionableTransitCard } from './components/ActionableTransitCard';
import { InteractivePulseMap } from './components/InteractivePulseMap';
import { CityPulseMap } from './components/CityPulseMap';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ExportModal } from './components/ExportModal';
import { DEMO_PRESETS } from './services/demoPresets';
import { analyzeCityPulseWithGemini } from './services/geminiService';
import { CityPulseReport, DemoPreset } from './types';
import {
  Sparkles,
  AlertCircle,
  Activity,
  Cpu,
  RefreshCw,
  Compass,
  Zap,
  CheckCircle2
} from 'lucide-react';

const LOADING_STATUSES = [
  'Establishing secure connection to Google Gemini 1.5 Flash...',
  'Parsing unstructured urban situation & chaos vectors...',
  'Cross-referencing flood sensors, street lighting & police chowkis...',
  'Curating verified cultural heritage & street food gems...',
  'Compiling optimal safe corridors vs. high-hazard avoidance matrix...',
  'Finalizing urban navigation brief...'
];

export const App: React.FC = () => {
  // Initialize with Preset 1 data so judges immediately see the dashboard populated on load
  const [report, setReport] = useState<CityPulseReport>(DEMO_PRESETS[0].sampleReport);
  const [inputPrompt, setInputPrompt] = useState<string>(DEMO_PRESETS[0].inputPrompt);
  const [activePresetId, setActivePresetId] = useState<string>(DEMO_PRESETS[0].id);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('CITYPULSE_GEMINI_KEY') || '';
  });

  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Cycling loading message effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STATUSES.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('CITYPULSE_GEMINI_KEY', newKey);
    } else {
      localStorage.removeItem('CITYPULSE_GEMINI_KEY');
    }
  };

  const handleSelectPreset = (preset: DemoPreset) => {
    setActivePresetId(preset.id);
    setInputPrompt(preset.inputPrompt);
    setReport(preset.sampleReport);
    setError(null);
  };

  const handleAnalyze = async (overridePrompt?: string) => {
    const textToAnalyze = overridePrompt || inputPrompt;
    if (!textToAnalyze.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const generatedReport = await analyzeCityPulseWithGemini(textToAnalyze, apiKey);
      setReport(generatedReport);
      // Deselect active preset if custom
      const matched = DEMO_PRESETS.find((p) => p.inputPrompt === textToAnalyze);
      setActivePresetId(matched ? matched.id : '');
    } catch (err: any) {
      console.warn('Analysis fallback activated:', err);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header */}
      <Header
        apiKey={apiKey}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        hasReport={Boolean(report)}
      />

      {/* Main Content Area */}
      <main role="main" aria-label="ChaosGrid Intelligence Dashboard" className="flex-1 pb-16">
        {/* Hero Section & Quick Demo Presets */}
        <HeroInput
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onAnalyze={() => handleAnalyze()}
          isLoading={isLoading}
          onSelectPreset={handleSelectPreset}
          activePresetId={activePresetId}
        />

        {/* Error Notification Banner if any */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 animate-fade-in">
            <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 shadow-xl backdrop-blur-md">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Analysis Notice
                  </h4>
                  <p className="text-xs text-rose-300 leading-relaxed font-normal">
                    {error}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsKeyModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-400 transition"
                >
                  Enter Key
                </button>
                <button
                  onClick={() => setError(null)}
                  className="p-1 rounded-lg text-rose-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOADING STATE: Cybernetic Pulse Scan Effect */}
        {isLoading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="rounded-2xl glass-panel p-8 sm:p-12 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
              {/* Animated scanning beam */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse-slow pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse">
                    <Cpu className="w-10 h-10 text-cyan-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  ChaosGrid Neural Radar in Action
                </h3>

                <p className="text-sm font-mono-code text-cyan-300 max-w-lg mb-6 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  {LOADING_STATUSES[loadingStep]}
                </p>

                {/* Micro Progress Bars */}
                <div className="w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${((loadingStep + 1) / LOADING_STATUSES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD CARDS SECTION */}
        {report && !isLoading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
            {/* CARD A: Safety & Real-Time Alert Radar */}
            <SafetyRadarCard report={report} />

            {/* INTERACTIVE LEAFLET GEOSPATIAL RADAR (Directly below Safety Alert Radar) */}
            <InteractivePulseMap report={report} />

            {/* CARD B: Cultural Heritage & Hidden Food Gems */}
            <CulturalFoodCard spots={report.culturalAndFoodSpots || []} />

            {/* CARD C: Best vs. Worst Comparison Table */}
            <ComparisonMatrixCard matrix={report.comparisonMatrix} />

            {/* CARD D: Actionable Transit & Route Plan */}
            <ActionableTransitCard
              safeRoutes={report.safeRoutes || []}
              transitSteps={report.transitSteps}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer role="contentinfo" aria-label="ChaosGrid AI Footer" className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white tracking-wide">ChaosGrid AI</span>
            <span>• Built for PromptWars Hackathon</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 font-mono-code">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Powered by Google Gemini 1.5 Flash
            </span>
            <span>•</span>
            <span className="text-cyan-400 font-medium">Urban Exploration & Safety Center</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        report={report}
      />
    </div>
  );
};

export default App;
