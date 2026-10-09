import React, { useState } from 'react';
import { Key, Shield, ExternalLink, X, Check } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
}) => {
  const [inputVal, setInputVal] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputVal.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputVal('');
    onSaveKey('');
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="api-key-modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl glass-panel p-6 shadow-2xl border border-cyan-500/20 text-slate-100">
        <button
          onClick={onClose}
          aria-label="Close API Key Configuration Modal"
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Key className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h3 id="api-key-modal-title" className="text-lg font-bold text-white tracking-wide">Gemini API Key</h3>
            <p className="text-xs text-slate-400">Google Gemini 1.5 Flash Engine Access</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Provide your Gemini API key to enable live AI analysis. Your key is kept secure inside your browser local storage.
        </p>

        <div className="space-y-3 mb-5">
          <label htmlFor="api-key-input-field" className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            API Key
          </label>
          <input
            id="api-key-input-field"
            type="password"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="AIzaSy..."
            aria-label="Google Gemini API Key secret"
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          />
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Stored locally in browser
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              aria-label="Get Free Gemini Key from Google AI Studio (opens in new tab)"
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
            >
              Get Free Key <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {inputVal && (
            <button
              onClick={handleClear}
              aria-label="Remove stored API key from local storage"
              className="px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              Remove
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Cancel and close dialog"
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            aria-label="Save API key and apply configuration"
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" aria-hidden="true" /> Saved!
              </>
            ) : (
              'Save & Apply'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
