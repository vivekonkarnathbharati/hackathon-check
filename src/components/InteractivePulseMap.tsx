import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Shield,
  AlertTriangle,
  Utensils,
  Navigation,
  Layers,
  Compass,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CityPulseReport } from '../types';

// Fix for leaflet default icon path issues in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});

// Known coordinates dictionary for prominent Indian urban hubs & hotspots
const KNOWN_PUNE_COORDS: Record<string, [number, number]> = {
  'shaniwar wada': [18.5195, 73.8553],
  'swargate': [18.5018, 73.8636],
  'hinjawadi': [18.5912, 73.7389],
  'viman nagar': [18.5679, 73.9143],
  'baner': [18.5590, 73.7868],
  'wakad': [18.5987, 73.7634],
  'fc road': [18.5236, 73.8415],
  'katraj': [18.4575, 73.8677],
  'bavdhan': [18.5158, 73.7707],
  'nal stop': [18.5089, 73.8340],
  'kasba': [18.5218, 73.8576],
  'tulshibaug': [18.5165, 73.8555],
  'mandai': [18.5135, 73.8560],
  'koregaon park': [18.5362, 73.8940],
  'shivajinagar': [18.5314, 73.8446],
  'kothrud': [18.5074, 73.8077],
  'deccan': [18.5167, 73.8436],
  'bhide': [18.5167, 73.8436],
  'bund garden': [18.5362, 73.8814],
  'yerawada': [18.5529, 73.8872],
  'aundh': [18.5580, 73.8073],
  'pashan': [18.5413, 73.7925],
  'pune station': [18.5284, 73.8744],
  'university': [18.5529, 73.8266],
  'chandani chowk': [18.5074, 73.7850],
  'senapati bapat': [18.5315, 73.8290],
  'vaishali': [18.5236, 73.8415],
  'wadeshwar': [18.5215, 73.8410],
  'irani cafe': [18.5590, 73.7868],
  'katakirr': [18.5100, 73.8350],
  'sujata mastani': [18.5140, 73.8520],
};

function getCityDefaultCenter(cityStr: string): [number, number] {
  const c = (cityStr || '').toLowerCase();
  if (c.includes('mumbai')) return [19.0760, 72.8777];
  if (c.includes('delhi')) return [28.6139, 77.2090];
  if (c.includes('bangalore') || c.includes('bengaluru')) return [12.9716, 77.5946];
  if (c.includes('hyderabad')) return [17.3850, 78.4867];
  return [18.5204, 73.8567]; // Default to Pune
}

function resolveCoordinates(
  text: string,
  cityCenter: [number, number],
  seedIndex: number
): [number, number] {
  const lower = text.toLowerCase();
  for (const [key, coords] of Object.entries(KNOWN_PUNE_COORDS)) {
    if (lower.includes(key)) {
      return coords;
    }
  }
  // Deterministic realistic dispersion (1.2km to 4.5km around city center)
  const angle = ((seedIndex * 67 + 23) % 360) * (Math.PI / 180);
  const distance = 0.015 + ((seedIndex * 31) % 25) * 0.0012;
  return [
    cityCenter[0] + Math.sin(angle) * distance,
    cityCenter[1] + Math.cos(angle) * distance,
  ];
}

// Custom DivIcons for high-tech Cyberpunk dark-mode markers
function createCustomPin(type: 'hazard' | 'safe' | 'cultural' | 'food') {
  if (type === 'hazard') {
    return L.divIcon({
      className: 'custom-hazard-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
          <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(244, 63, 94, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 28px; height: 28px; border-radius: 50%; background: #f43f5e; border: 2px solid #ffe4e6; box-shadow: 0 0 15px rgba(244, 63, 94, 0.8); display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20],
    });
  }

  if (type === 'safe') {
    return L.divIcon({
      className: 'custom-safe-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
          <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(16, 185, 129, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 28px; height: 28px; border-radius: 50%; background: #10b981; border: 2px solid #d1fae5; box-shadow: 0 0 15px rgba(16, 185, 129, 0.8); display: flex; align-items: center; justify-content: center; color: #022c22;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20],
    });
  }

  // Cultural (Gold) & Food (Cyan/Blue)
  const isFood = type === 'food';
  const color = isFood ? '#06b6d4' : '#f59e0b';
  const borderColor = isFood ? '#cffafe' : '#fef3c7';

  return L.divIcon({
    className: `custom-${type}-pin`,
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
        <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${isFood ? 'rgba(6, 182, 212, 0.3)' : 'rgba(245, 158, 11, 0.3)'};"></div>
        <div style="position: relative; width: 28px; height: 28px; border-radius: 50%; background: ${color}; border: 2px solid ${borderColor}; box-shadow: 0 0 15px ${isFood ? 'rgba(6, 182, 212, 0.8)' : 'rgba(245, 158, 11, 0.8)'}; display: flex; align-items: center; justify-content: center; color: #0f172a;">
          ${isFood ? `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/>
              <path d="M18 11v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9"/>
              <line x1="6" y1="2" x2="6" y2="7"/>
            </svg>
          ` : `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="21" x2="21" y2="21"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
              <path d="M12 2L4 7v10h16V7z"/>
            </svg>
          `}
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20],
  });
}

// Controller component to smoothly center/fly map when city updates
function MapRecenterController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.2 });
  }, [center, map]);
  return null;
}

interface InteractivePulseMapProps {
  report: CityPulseReport;
}

interface MapMarkerItem {
  id: string;
  name: string;
  category: string;
  safetyTip: string;
  details?: string;
  type: 'hazard' | 'safe' | 'cultural' | 'food';
  position: [number, number];
}

export const InteractivePulseMap: React.FC<InteractivePulseMapProps> = ({ report }) => {
  const [filterType, setFilterType] = useState<'all' | 'hazard' | 'safe' | 'culture'>('all');

  const cityCenter = useMemo(() => {
    return getCityDefaultCenter(report.city);
  }, [report.city]);

  // Dynamically assemble markers from report sections
  const markers = useMemo<MapMarkerItem[]>(() => {
    const list: MapMarkerItem[] = [];

    // 1. Hazards & Avoid areas (Red)
    if (report.comparisonMatrix?.avoidOrCaution) {
      report.comparisonMatrix.avoidOrCaution.forEach((item, idx) => {
        list.push({
          id: `hazard-${idx}`,
          name: item.name,
          category: 'High-Risk Hazard / Bottleneck',
          safetyTip: `Risk Factor: ${item.risk}`,
          details: item.reason,
          type: 'hazard',
          position: resolveCoordinates(item.name, cityCenter, idx * 3 + 1),
        });
      });
    }

    // 2. Safe Corridors & Verified Options (Green)
    if (report.comparisonMatrix?.recommended) {
      report.comparisonMatrix.recommended.forEach((item, idx) => {
        list.push({
          id: `safe-${idx}`,
          name: item.name,
          category: `Verified Safe Corridor (Score: ${item.score})`,
          safetyTip: 'Recommended high-visibility route with active surveillance.',
          details: item.reason,
          type: 'safe',
          position: resolveCoordinates(item.name, cityCenter, idx * 3 + 2),
        });
      });
    }

    // 3. Cultural & Food Spots (Gold/Blue)
    if (report.culturalAndFoodSpots) {
      report.culturalAndFoodSpots.forEach((item, idx) => {
        const isFood =
          item.type.toLowerCase().includes('food') ||
          item.type.toLowerCase().includes('cafe') ||
          item.type.toLowerCase().includes('misal') ||
          item.type.toLowerCase().includes('chai');

        list.push({
          id: `spot-${idx}`,
          name: item.name,
          category: item.type,
          safetyTip: `Budget: ${item.budget} • Best Time: ${item.bestTime || 'Anytime'}`,
          details: item.description,
          type: isFood ? 'food' : 'cultural',
          position: resolveCoordinates(item.name, cityCenter, idx * 3 + 3),
        });
      });
    }

    return list;
  }, [report, cityCenter]);

  // Filtered markers
  const filteredMarkers = useMemo(() => {
    if (filterType === 'all') return markers;
    if (filterType === 'hazard') return markers.filter((m) => m.type === 'hazard');
    if (filterType === 'safe') return markers.filter((m) => m.type === 'safe');
    if (filterType === 'culture')
      return markers.filter((m) => m.type === 'cultural' || m.type === 'food');
    return markers;
  }, [markers, filterType]);

  // Safe corridor connecting polyline coordinates
  const safePolylineCoords = useMemo(() => {
    return markers.filter((m) => m.type === 'safe').map((m) => m.position);
  }, [markers]);

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <section aria-label="Interactive Geospatial Navigation Radar" role="region" className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Compass className="w-5 h-5 animate-spin-slow" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Interactive Geospatial Navigation Radar
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                Leaflet Live
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive OpenStreetMap telemetry for <span className="text-cyan-300 font-semibold">{report.city}</span> ({filteredMarkers.length} active spatial pins)
            </p>
          </div>
        </div>

        {/* Action Controls & Layer Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-code" role="group" aria-label="Map Marker Filters">
            <button
              onClick={() => setFilterType('all')}
              aria-label="Display all map telemetry pins"
              className={`px-2.5 py-1 rounded-lg transition ${
                filterType === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Pins
            </button>
            <button
              onClick={() => setFilterType('hazard')}
              aria-label="Filter map to display hazard and caution pins only"
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                filterType === 'hazard'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
              Hazards
            </button>
            <button
              onClick={() => setFilterType('safe')}
              aria-label="Filter map to display verified safe transit routes only"
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                filterType === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Safe Routes
            </button>
            <button
              onClick={() => setFilterType('culture')}
              aria-label="Filter map to display cultural heritage and food stops only"
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                filterType === 'culture'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              Culture & Food
            </button>
          </div>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl z-0">
        <MapContainer
          center={cityCenter}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ height: '100%', width: '100%', background: '#070d18' }}
        >
          {/* Re-center handler */}
          <MapRecenterController center={cityCenter} />

          {/* OpenStreetMap Tile Layer (Zero API keys required) */}
          <TileLayer attribution={tileAttribution} url={tileUrl} maxZoom={19} />

          {/* Optional Safe Corridor Polyline */}
          {safePolylineCoords.length > 1 && (filterType === 'all' || filterType === 'safe') && (
            <Polyline
              positions={safePolylineCoords}
              pathOptions={{
                color: '#10b981',
                weight: 3,
                opacity: 0.8,
                dashArray: '6, 8',
              }}
            />
          )}

          {/* Dynamic Color-Coded Pins */}
          {filteredMarkers.map((marker) => {
            const pinIcon = createCustomPin(marker.type);
            const isHazard = marker.type === 'hazard';
            const isSafe = marker.type === 'safe';

            return (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={pinIcon}
              >
                {/* Dark-mode styled popup */}
                <Popup className="citypulse-dark-popup">
                  <div className="p-1 min-w-[220px] max-w-[280px]">
                    {/* Header badge */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-700/80">
                      <span
                        className={`text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isHazard
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                            : isSafe
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {marker.category}
                      </span>
                    </div>

                    {/* Spot Name */}
                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                      {marker.name}
                    </h4>

                    {/* Description if any */}
                    {marker.details && (
                      <p className="text-xs text-slate-300 mb-2 leading-relaxed font-normal">
                        {marker.details}
                      </p>
                    )}

                    {/* Quick Safety Tip Box */}
                    <div
                      className={`p-2 rounded-lg text-[11px] leading-tight font-medium ${
                        isHazard
                          ? 'bg-rose-950/40 text-rose-200 border border-rose-500/30'
                          : isSafe
                          ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-500/30'
                          : 'bg-cyan-950/40 text-cyan-200 border border-cyan-500/30'
                      }`}
                    >
                      <span className="font-bold">💡 Tip: </span>
                      {marker.safetyTip}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend Overlay in Bottom Corner */}
        <div className="absolute bottom-3 left-3 z-[1000] p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-md text-[11px] font-mono-code space-y-1.5 pointer-events-auto">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] pb-1 border-b border-slate-800">
            Map Telemetry Legend
          </div>
          <div className="flex items-center gap-2 text-rose-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-500/40" />
            <span>Red: Hazard / Caution Zone</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/40" />
            <span>Green: Safe Corridor / Transit</span>
          </div>
          <div className="flex items-center gap-2 text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/40" />
            <span>Gold/Blue: Heritage & Food Spots</span>
          </div>
        </div>
      </div>
    </section>
  );
};
