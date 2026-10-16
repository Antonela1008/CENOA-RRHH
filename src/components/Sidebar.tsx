import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Send,
  ClipboardCheck,
  FileText,
  Award,
  GitCompare,
  Sliders,
  Table,
} from 'lucide-react';

interface NavItem {
  id: AppView;
  label: string;
  badge?: number | string;
  icon: React.ElementType;
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, candidates } = useApp();

  const pendingCount = candidates.filter((c) => c.evaluationStatus === 'Pendiente' || c.evaluationStatus === 'Pendiente de revisión').length;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Panel Principal',
      icon: LayoutDashboard,
    },
    {
      id: 'candidates',
      label: 'Gestión de Candidatos',
      badge: candidates.length,
      icon: Users,
    },
    {
      id: 'evaluations',
      label: 'Gestión de Evaluaciones',
      badge: pendingCount,
      icon: Send,
    },
    {
      id: 'behavioral',
      label: 'Evaluación Conductual',
      icon: ClipboardCheck,
    },
    {
      id: 'situational',
      label: 'Casos Situacionales',
      badge: '5 Casos',
      icon: FileText,
    },
    {
      id: 'results',
      label: 'Resultados e Informes',
      icon: Award,
    },
    {
      id: 'comparator',
      label: 'Comparador de Perfiles',
      icon: GitCompare,
    },
    {
      id: 'admin',
      label: 'Panel de Administración',
      icon: Sliders,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between min-h-[calc(100vh-65px)] no-print">
      {/* Navigation Links */}
      <div className="p-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Módulos de RR. HH.
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all duration-150 text-left ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer info & Google Sheets Readiness box */}
      <div className="p-4 m-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md shrink-0">
            <Table className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Google Sheets Ready
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
              Esquema de entidades desacoplado, preparado para sincronización con planillas y Google Apps Script.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex flex-col gap-0.5">
          <span className="font-medium text-slate-700">Concesionarias del Grupo:</span>
          <span>Autosol VW · Tsuyoi Toyota · Auto NOA</span>
        </div>
      </div>
    </aside>
  );
};
