import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  AlertOctagon,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  LayoutGrid,
  Table as TableIcon,
  Star
} from 'lucide-react';
import { ComparisonMatrix } from '../types';

interface ComparisonMatrixCardProps {
  matrix: ComparisonMatrix;
}

export const ComparisonMatrixCard: React.FC<ComparisonMatrixCardProps> = ({ matrix }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const { recommended, avoidOrCaution } = matrix;

  return (
    <section aria-label="Best versus Worst Comparison Matrix" role="region" className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Scale className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Best vs. Worst Comparison Matrix
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-slate-800 text-indigo-300 border border-slate-700">
                Card C
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct tactical comparison between optimal corridors and high-risk hazard zones
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs" role="group" aria-label="Matrix view mode">
          <button
            onClick={() => setViewMode('cards')}
            aria-label="Switch matrix display to split cards view"
            aria-pressed={viewMode === 'cards'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'cards'
                ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" /> Split Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            aria-label="Switch matrix display to structured table view"
            aria-pressed={viewMode === 'table'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'table'
                ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" aria-hidden="true" /> Table View
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        /* Split Cards Layout */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RECOMMENDED COLUMN */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <ThumbsUp className="w-4 h-4 text-emerald-400" /> Recommended & Verified
              </span>
              <span className="text-[11px] font-mono-code bg-emerald-900/50 px-2 py-0.5 rounded text-emerald-200">
                {recommended.length} Options
              </span>
            </div>

            <div className="space-y-3">
              {recommended.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-850 transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono-code font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {item.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AVOID / CAUTION COLUMN */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <ThumbsDown className="w-4 h-4 text-rose-400" /> Avoid or Exercise Caution
              </span>
              <span className="text-[11px] font-mono-code bg-rose-900/50 px-2 py-0.5 rounded text-rose-200">
                {avoidOrCaution.length} Hazards
              </span>
            </div>

            <div className="space-y-3">
              {avoidOrCaution.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 hover:bg-slate-850 transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2 pl-6">
                    {item.reason}
                  </p>
                  <div className="pl-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono-code font-semibold bg-rose-950/60 text-rose-300 border border-rose-500/40">
                      <ShieldAlert className="w-3 h-3 text-rose-400" /> Risk: {item.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Clean Comparative Table View */
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-mono-code uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location / Corridor</th>
                <th className="px-4 py-3">Analysis & Rationale</th>
                <th className="px-4 py-3">Rating / Threat Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recommended.map((item, idx) => (
                <tr key={`rec-${idx}`} className="hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Recommended
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">{item.name}</td>
                  <td className="px-4 py-3 text-slate-300">{item.reason}</td>
                  <td className="px-4 py-3 font-mono-code text-emerald-300 font-bold">{item.score}</td>
                </tr>
              ))}
              {avoidOrCaution.map((item, idx) => (
                <tr key={`avoid-${idx}`} className="hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                      <AlertOctagon className="w-3.5 h-3.5" /> Caution / Avoid
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">{item.name}</td>
                  <td className="px-4 py-3 text-slate-300">{item.reason}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300 font-mono-code text-[11px]">
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
