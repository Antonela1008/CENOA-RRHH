import React from 'react';
import { useApp } from '../context/AppContext';
import { CenoaLogo } from './CenoaLogo';
import {
  UserCheck,
  Briefcase,
  LogOut,
  Building2,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    switchToCandidatePortal,
    switchToHRView,
    logout,
  } = useApp();

  const isCandidateView = activeView === 'candidate-portal';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 px-6 py-3.5 bg-white border-b border-slate-200/90 shadow-xs no-print">
      {/* Zone 1: Brand wordmark & Group Identity */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={() => setActiveView('dashboard')}
          className="text-left focus-visible:outline-cyan-600 focus-visible:outline-2 rounded-md"
        >
          <CenoaLogo variant="dark" />
        </button>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 pl-4 border-l border-slate-200">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Grupo Cenoa Automotriz</span>
          <span aria-hidden="true">·</span>
          <span>NOA & Patagonia</span>
        </div>
      </div>

      {/* Zone 2: Mode Indicators and Context Breadcrumb */}
      <div className="hidden md:flex items-center gap-3 text-xs text-slate-500">
        {!isCandidateView ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md border border-slate-200/80">
            <span className="font-medium text-slate-700">Entorno:</span>
            <span className="text-cyan-700 font-semibold">Recursos Humanos & Evaluadores</span>
            <span aria-hidden="true">·</span>
            <span>Concesionarias Oficiales</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-md text-cyan-900">
            <UserCheck className="w-3.5 h-3.5 text-cyan-700" />
            <span className="font-semibold">Modo Vista de Candidato Activa</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-800">Evaluación en tiempo real</span>
          </div>
        )}
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Toggle between HR View and Candidate View */}
        {!isCandidateView ? (
          <button
            onClick={() => switchToCandidatePortal('cand-001')}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
            title="Probar la experiencia visual e interactiva que ve el postulante"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-700" />
            <span>Simular Vista Candidato</span>
          </button>
        ) : (
          <button
            onClick={switchToHRView}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-700" />
            <span>Volver al Panel RR. HH.</span>
          </button>
        )}

        {/* User Pill / Exit */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold tracking-tight">
            {currentUser.avatar}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-500 leading-tight">
              {currentUser.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            title="Cerrar sesión de simulación"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
