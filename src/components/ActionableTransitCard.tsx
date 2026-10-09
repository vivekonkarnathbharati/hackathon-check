import React, { useState } from 'react';
import {
  Navigation,
  Train,
  Car,
  Footprints,
  Bus,
  CheckCircle,
  Clock,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';
import { TransitStep } from '../types';

interface ActionableTransitCardProps {
  safeRoutes: string[];
  transitSteps?: TransitStep[];
}

export const ActionableTransitCard: React.FC<ActionableTransitCardProps> = ({
  safeRoutes,
  transitSteps,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const getModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'metro':
      case 'train':
        return <Train className="w-4 h-4 text-cyan-400" />;
      case 'cab':
      case 'car':
      case 'taxi':
        return <Car className="w-4 h-4 text-indigo-400" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-amber-400" />;
      case 'walk':
      default:
        return <Footprints className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Actionable Transit & Route Plan
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-slate-800 text-emerald-300 border border-slate-700">
                Card D
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive commuter execution checklist, transit modes & tactical safe corridors
            </p>
          </div>
        </div>

        {/* Progress pill if transit steps exist */}
        {transitSteps && transitSteps.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-code text-slate-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {Object.values(completedSteps).filter(Boolean).length} / {transitSteps.length} Steps Completed
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step-by-Step Navigation Checklist (7 columns) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 px-1 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Commuter Navigation Itinerary
            </span>
            <span className="text-[11px] text-slate-400 lowercase font-normal">
              Click checkbox to mark leg complete
            </span>
          </div>

          {transitSteps && transitSteps.length > 0 ? (
            <div className="space-y-3">
              {transitSteps.map((step) => {
                const isDone = Boolean(completedSteps[step.step]);
                return (
                  <div
                    key={step.step}
                    onClick={() => toggleStep(step.step)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                      isDone
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-900/60 border-slate-700/80 hover:border-emerald-500/40 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className="mt-0.5 text-slate-400 hover:text-emerald-400 transition"
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1 rounded bg-slate-800 text-slate-300">
                              {getModeIcon(step.mode)}
                            </span>
                            <span className="text-xs font-mono-code font-bold uppercase text-slate-400">
                              Step {step.step} • {step.mode}
                            </span>
                          </div>

                          <h4
                            className={`text-sm font-bold text-white transition ${
                              isDone ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {step.title}
                          </h4>

                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {step.instruction}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 shrink-0">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {step.eta}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
              Interactive transit checklist is tailored automatically to route queries.
            </div>
          )}
        </div>

        {/* Tactical Safe Route Recommendations (5 columns) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 px-1 mb-2 flex items-center gap-1.5 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" /> High-Safety Corridors ({safeRoutes.length})
          </div>

          <div className="space-y-2.5">
            {safeRoutes.map((route, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition text-xs"
              >
                <div className="p-1 rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0">
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-slate-200 leading-relaxed font-normal">
                  {route}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
