import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 text-sm animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-md">
      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
      <span className="flex-1 text-slate-100">{toastMessage}</span>
      <button
        onClick={() => showToast('')}
        className="text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
