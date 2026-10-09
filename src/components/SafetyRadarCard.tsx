import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Radio,
  Clock,
  CloudSun,
  PhoneCall,
  Activity,
  Car,
  CloudRain,
  Shield
} from 'lucide-react';
import { CityPulseReport, SmartAlert } from '../types';

interface SafetyRadarCardProps {
  report: CityPulseReport;
}

export const SafetyRadarCard: React.FC<SafetyRadarCardProps> = ({ report }) => {
  const { safetyScore, safetyLevel, smartAlerts, summary, quickStats } = report;

  // Determine color themes based on safetyLevel and score
  const isSafe = safetyScore >= 70;
  const isCaution = safetyScore >= 40 && safetyScore < 70;
  const isUnsafe = safetyScore < 40;

  const scoreColor = isSafe
    ? 'text-emerald-400'
    : isCaution
    ? 'text-amber-400'
    : 'text-rose-400';

  const strokeColor = isSafe
    ? '#10b981'
    : isCaution
    ? '#f59e0b'
    : '#f43f5e';

  // Circle circumference for gauge calculation (r = 45, C = 2 * PI * 45 ≈ 282.7)
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safetyScore / 100) * circumference;

  const getAlertIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'traffic':
        return <Car className="w-4 h-4 text-amber-400" />;
      case 'weather':
        return <CloudRain className="w-4 h-4 text-cyan-400" />;
      case 'safety':
      default:
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> High Alert
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Caution
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Advisory
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Radio className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Safety & Real-Time Alert Radar
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                Card A
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live urban hazard surveillance, threat matrix & telemetry
            </p>
          </div>
        </div>

        {/* Live Pulse Beacon */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono-code text-[11px] text-slate-400">
            {report.city} • {report.timestamp || 'Real-time Feed'}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Gauge & Executive Brief, Right Smart Alert Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Gauge & Level (5 columns) */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          {/* Radial SVG Gauge */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Gauge Inner Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-black font-mono-code ${scoreColor}`}>
                {safetyScore}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Out of 100
              </span>
            </div>
          </div>

          {/* Level Details */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Urban Safety Rating
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {isSafe ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              ) : isCaution ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              )}
              <span className={`text-lg font-black tracking-wide ${scoreColor}`}>
                {safetyLevel}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isSafe
                ? 'Corridors show stable lighting, normal transit dispatch, and minimal localized hazards.'
                : isCaution
                ? 'Exercise heightened situational awareness. Check waterlogging & crowd choke points.'
                : 'Elevated hazard detected. Strictly follow elevated or Metro bypass alternatives.'}
            </p>
          </div>
        </div>

        {/* Executive Summary Brief (7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Activity className="w-4 h-4 text-cyan-400" /> Executive Pulse Summary
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {summary}
            </p>
          </div>

          {/* Telemetry Micro Stats */}
          {quickStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/60 font-mono-code text-[11px]">
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" /> Chaos Index
                </span>
                <span className="font-bold text-white text-xs">{quickStats.chaosIndex}/100</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> Peak Hour
                </span>
                <span className="font-bold text-amber-300 text-xs truncate block" title={quickStats.peakHoursWarning}>
                  {quickStats.peakHoursWarning.slice(0, 14)}...
                </span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <CloudSun className="w-3 h-3 text-cyan-400" /> Weather
                </span>
                <span className="font-bold text-cyan-200 text-xs truncate block" title={quickStats.weatherCondition}>
                  {quickStats.weatherCondition}
                </span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-emerald-400" /> Helpline
                </span>
                <span className="font-bold text-emerald-300 text-xs truncate block" title={quickStats.emergencyHelpline}>
                  {quickStats.emergencyHelpline.slice(0, 12)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WARNING BANNERS: Smart Alerts */}
      <div className="mt-6 space-y-2.5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Active Alert Stream ({smartAlerts.length})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {smartAlerts.map((alert: SmartAlert, idx: number) => {
            const isHigh = alert.severity?.toLowerCase() === 'high';
            const isMed = alert.severity?.toLowerCase() === 'medium';
            return (
              <div
                key={idx}
                className={`flex flex-col justify-between p-3.5 rounded-xl border transition-all ${
                  isHigh
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-100 shadow-sm shadow-rose-900/20'
                    : isMed
                    ? 'bg-amber-950/25 border-amber-500/40 text-amber-100'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                    {getAlertIcon(alert.type)}
                    <span className="font-mono-code">{alert.type} Alert</span>
                  </div>
                  {getSeverityBadge(alert.severity)}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {alert.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
