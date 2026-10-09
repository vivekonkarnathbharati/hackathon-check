import React, { useState } from 'react';
import {
  Map,
  Layers,
  Crosshair,
  Shield,
  Utensils,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { CityPulseReport } from '../types';

interface CityPulseMapProps {
  report: CityPulseReport;
}

export const CityPulseMap: React.FC<CityPulseMapProps> = ({ report }) => {
  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    type: 'safe' | 'food' | 'hazard';
    desc: string;
  } | null>(null);

  const [filterLayer, setFilterLayer] = useState<'all' | 'safe' | 'food' | 'hazard'>('all');

  // Simulated coordinate points mapped to the SVG grid
  const safeNodes = (report.safeRoutes || []).slice(0, 3).map((r, i) => ({
    x: 25 + i * 25,
    y: 35 + (i % 2) * 20,
    title: `Safe Corridor #${i + 1}`,
    desc: r,
    type: 'safe' as const,
  }));

  const foodNodes = (report.culturalAndFoodSpots || []).slice(0, 3).map((s, i) => ({
    x: 35 + i * 20,
    y: 60 - (i % 2) * 15,
    title: s.name,
    desc: `${s.type} • ${s.budget}`,
    type: 'food' as const,
  }));

  const hazardNodes = (report.comparisonMatrix?.avoidOrCaution || []).slice(0, 3).map((h, i) => ({
    x: 65 + (i % 2) * 18,
    y: 30 + i * 22,
    title: h.name,
    desc: `Risk: ${h.risk}`,
    type: 'hazard' as const,
  }));

  const allNodes = [
    ...(filterLayer === 'all' || filterLayer === 'safe' ? safeNodes : []),
    ...(filterLayer === 'all' || filterLayer === 'food' ? foodNodes : []),
    ...(filterLayer === 'all' || filterLayer === 'hazard' ? hazardNodes : []),
  ];

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              Tactical Urban Radar & Spatial Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Active spatial telemetry overlay for {report.city}
            </p>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-code">
          <button
            onClick={() => setFilterLayer('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterLayer === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setFilterLayer('safe')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterLayer === 'safe'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Safe Routes
          </button>
          <button
            onClick={() => setFilterLayer('food')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterLayer === 'food'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Food Spots
          </button>
          <button
            onClick={() => setFilterLayer('hazard')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterLayer === 'hazard'
                ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hazard Zones
          </button>
        </div>
      </div>

      {/* Cybernetic Map Canvas */}
      <div className="relative w-full h-72 sm:h-80 rounded-xl bg-[#070d18] border border-cyan-500/20 overflow-hidden select-none">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Concentric radar range rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-cyan-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-500/20 pointer-events-none" />

        {/* Radar beam scanner */}
        <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 origin-top-left pointer-events-none animate-radar-sweep opacity-30">
          <div className="w-full h-full bg-gradient-to-tr from-cyan-500/25 to-transparent rounded-full" />
        </div>

        {/* Tactical Crosshair Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <Crosshair className="w-6 h-6 text-cyan-500/40" />
        </div>

        {/* SVG Route Connecting Line Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 120 180 Q 240 100 420 140 T 700 120"
            fill="none"
            stroke="rgba(6, 182, 212, 0.35)"
            strokeWidth="2"
            strokeDasharray="6,4"
          />
        </svg>

        {/* Interactive Coordinate Pins */}
        {allNodes.map((node, idx) => {
          const isSafe = node.type === 'safe';
          const isFood = node.type === 'food';
          const isHazard = node.type === 'hazard';

          return (
            <div
              key={idx}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setSelectedNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            >
              {/* Ping glow */}
              <span className="relative flex h-5 w-5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSafe ? 'bg-emerald-400' : isFood ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center border-2 border-background shadow-lg ${
                    isSafe
                      ? 'bg-emerald-500 text-slate-950'
                      : isFood
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {isSafe ? (
                    <Shield className="w-2.5 h-2.5" />
                  ) : isFood ? (
                    <Utensils className="w-2.5 h-2.5" />
                  ) : (
                    <AlertTriangle className="w-2.5 h-2.5" />
                  )}
                </span>
              </span>

              {/* Hover pill preview */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] font-bold text-white shadow-xl pointer-events-none z-20">
                {node.title}
              </div>
            </div>
          );
        })}

        {/* Selected Node Tooltip Overlay */}
        {selectedNode && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs p-3 rounded-xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md z-30 animate-fade-in text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                {selectedNode.type === 'safe' && <Shield className="w-3.5 h-3.5 text-emerald-400" />}
                {selectedNode.type === 'food' && <Utensils className="w-3.5 h-3.5 text-amber-400" />}
                {selectedNode.type === 'hazard' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                {selectedNode.title}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white px-1"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {selectedNode.desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
