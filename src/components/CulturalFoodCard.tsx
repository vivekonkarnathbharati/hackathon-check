import React, { useState } from 'react';
import {
  Utensils,
  Landmark,
  Tag,
  DollarSign,
  Smile,
  Clock,
  Sparkles,
  MapPin,
  ExternalLink,
  Check
} from 'lucide-react';
import { FoodAndCulturalSpot } from '../types';

interface CulturalFoodCardProps {
  spots: FoodAndCulturalSpot[];
}

export const CulturalFoodCard: React.FC<CulturalFoodCardProps> = ({ spots }) => {
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Heritage' | 'Food'>('All');

  const filteredSpots = spots.filter((spot) => {
    if (filter === 'Heritage') {
      return (
        spot.type.toLowerCase().includes('heritage') ||
        spot.type.toLowerCase().includes('monument') ||
        spot.type.toLowerCase().includes('mansion') ||
        spot.type.toLowerCase().includes('wada')
      );
    }
    if (filter === 'Food') {
      return (
        spot.type.toLowerCase().includes('food') ||
        spot.type.toLowerCase().includes('cafe') ||
        spot.type.toLowerCase().includes('snack') ||
        spot.type.toLowerCase().includes('misal') ||
        spot.type.toLowerCase().includes('chai')
      );
    }
    return true;
  });

  const handleCopySpot = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  return (
    <section aria-label="Cultural Heritage and Hidden Food Gems" role="region" className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl">
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Utensils className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Cultural Heritage & Hidden Food Gems
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-slate-800 text-amber-300 border border-slate-700">
                Card B
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Curated local palate, budget tags, vintage wadas & verified pit stops
            </p>
          </div>
        </div>

        {/* Filter Pill Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs" role="group" aria-label="Cultural and food category filters">
          <button
            onClick={() => setFilter('All')}
            aria-label={`Show all ${spots.length} food and heritage spots`}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filter === 'All'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({spots.length})
          </button>
          <button
            onClick={() => setFilter('Heritage')}
            aria-label="Filter to heritage and historic monuments only"
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filter === 'Heritage'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Heritage
          </button>
          <button
            onClick={() => setFilter('Food')}
            aria-label="Filter to street food and cafes only"
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filter === 'Food'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Street Food & Cafes
          </button>
        </div>
      </div>

      {/* Spot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="region" aria-label="Curated spot list">
        {filteredSpots.map((spot, index) => {
          const isCopied = copiedName === spot.name;
          return (
            <div
              key={index}
              tabIndex={0}
              role="article"
              aria-label={`${spot.name}: ${spot.type}, Budget ${spot.budget}`}
              className="flex flex-col justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800/90 hover:border-amber-500/40 hover:bg-slate-850 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <div>
                {/* Spot Title & Type */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono-code font-bold uppercase tracking-wider text-amber-400">
                      <Landmark className="w-3 h-3" aria-hidden="true" /> {spot.type}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition mt-0.5">
                      {spot.name}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopySpot(spot.name)}
                    aria-label={isCopied ? `Copied ${spot.name} location` : `Copy ${spot.name} location`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition focus:outline-none focus:ring-2 focus:ring-amber-400"
                    title="Copy spot name"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Spot Description */}
                {spot.description && (
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {spot.description}
                  </p>
                )}
              </div>

              {/* Badges / Metadata Footer */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                {/* Budget tag */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-medium">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  {spot.budget}
                </span>

                {/* Vibe badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-950/40 text-purple-300 border border-purple-500/30 font-medium">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  {spot.vibe}
                </span>

                {/* Best time badge */}
                {spot.bestTime && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono-code">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {spot.bestTime}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
