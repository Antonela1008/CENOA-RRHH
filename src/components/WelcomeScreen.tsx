import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CenoaLogo } from './CenoaLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { loginAsHR, loginAsCandidate } = useApp();
  const [email, setEmail] = useState('licantonela.iradez@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<'hr' | 'candidate'>('hr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'hr') {
      loginAsHR();
    } else {
      loginAsCandidate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0B1C33] to-[#0A1628] flex flex-col justify-between text-slate-100 p-6 relative overflow-hidden">
      {/* Subtle structural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between max-w-6xl w-full mx-auto pt-4">
        <CenoaLogo variant="light" />
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Portal Oficial de Recursos Humanos</span>
          <span aria-hidden="true">·</span>
          <span>Versión 2026</span>
        </div>
      </header>

      {/* Main card container */}
      <main className="relative z-10 max-w-4xl w-full mx-auto my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left column: Brand statement & key pillars */}
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-800/80 rounded-full text-xs text-cyan-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Plataforma de Evaluación de Competencias
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Potenciamos decisiones de talento{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
              basadas en competencias
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Diseñada para identificar el potencial, rigor de calidad y alineamiento conductual de los candidatos en las concesionarias oficiales de Grupo Cenoa: Autosol, Tsuyoi y Auto NOA.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>20 afirmaciones conductuales</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>5 casos situacionales automotrices</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Gráficos radar e informes ejecutivos</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Comparador multi-candidato</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive login simulation */}
        <div className="md:col-span-5 bg-white text-slate-800 p-6 sm:p-7 rounded-2xl shadow-2xl border border-slate-200/80">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Ingreso a la Plataforma
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accedé al panel corporativo o simulá la vista de postulante.
            </p>
          </div>

          {/* Role selector tab */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('hr');
                setEmail('licantonela.iradez@gmail.com');
              }}
              className={`py-2 px-3 rounded-md transition-all text-center ${
                selectedRole === 'hr'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recursos Humanos
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('candidate');
                setEmail('marianasoledad.gomez@gmail.com');
              }}
              className={`py-2 px-3 rounded-md transition-all text-center ${
                selectedRole === 'candidate'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Postulante
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50"
                  placeholder="ejemplo@cenoa.com.ar"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Contraseña
                </label>
                <span className="text-[11px] text-cyan-700 hover:underline cursor-pointer">
                  ¿Olvidaste tu clave?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all duration-150 mt-2 cursor-pointer"
            >
              <span>{selectedRole === 'hr' ? 'Ingresar como RR. HH.' : 'Iniciar Evaluación de Candidato'}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Acceso de demostración interactiva</span>
            <span className="font-semibold text-cyan-700">Grupo Cenoa RR.HH.</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div>
          © 2026 Grupo Cenoa. Todos los derechos reservados. Autosol · Tsuyoi · Auto NOA.
        </div>
        <div className="flex items-center gap-4">
          <span>Herramienta interna de evaluación conductual y técnica</span>
          <span aria-hidden="true">·</span>
          <span>Sede Central Salta</span>
        </div>
      </footer>
    </div>
  );
};
