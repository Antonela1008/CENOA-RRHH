import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MOCK_HR_USERS,
  MOCK_POSITIONS,
  MOCK_BUSINESS_UNITS,
  DIMENSIONS,
} from '../data/mockData';
import {
  Sliders,
  Users,
  Briefcase,
  Building2,
  Table,
  CheckCircle2,
  Save,
  Shield,
  Key,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'positions' | 'units' | 'scoring' | 'sheets'>('users');

  const [minScoreThreshold, setMinScoreThreshold] = useState('75');
  const [passingQualityScore, setPassingQualityScore] = useState('4.0');
  const [requirePhotoVerification, setRequirePhotoVerification] = useState(true);
  const [autoEmailAlerts, setAutoEmailAlerts] = useState(true);

  const handleSaveConfig = () => {
    showToast('Parámetros de configuración guardados correctamente en la sesión.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Ajustes Corporativos</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-semibold">Configuración de Plataforma</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestión de usuarios evaluadores, catálogo de puestos automotrices, unidades de negocio y parámetros normativos.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5 text-cyan-400" />
          <span>Guardar Configuración</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'users', label: 'Usuarios y Evaluadores', icon: Users },
          { id: 'positions', label: 'Catálogo de Puestos', icon: Briefcase },
          { id: 'units', label: 'Unidades y Concesionarias', icon: Building2 },
          { id: 'scoring', label: 'Parámetros de Calificación', icon: Sliders },
          { id: 'sheets', label: 'Arquitectura Google Sheets', icon: Table },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: HR Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Equipo de Recursos Humanos y Evaluadores Asignados
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Permisos para administrar evaluaciones, calificar casos y emitir dictámenes.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {MOCK_HR_USERS.map((u) => (
              <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {u.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {u.name}
                    </h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {u.department} · {u.unit}
                    </p>
                    <span className="text-slate-400 text-[11px] font-mono">
                      {u.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      u.role === 'Administrador'
                        ? 'bg-slate-900 text-white'
                        : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Positions Catalog */}
      {activeTab === 'positions' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Catálogo de Puestos Evaluados en Grupo Cenoa
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Definición de perfiles objetivo, vacantes y ponderaciones por dimensión.
            </p>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {MOCK_POSITIONS.map((pos) => (
              <div key={pos.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {pos.title}
                    </h4>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                      pos.status === 'Activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {pos.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Área: {pos.department} · Unidades: {pos.businessUnit}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-slate-600">
                  <span className="text-[11px]">
                    <strong>{pos.openings}</strong> vacantes activas
                  </span>
                  <button
                    onClick={() => showToast(`Puesto ${pos.title} seleccionado como benchmark activo.`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-semibold text-xs transition-colors"
                  >
                    Ver Criterios
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Business Units */}
      {activeTab === 'units' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Concesionarias Oficiales y Unidades de Negocio
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Red de distribución y talleres oficiales en Salta, Jujuy, Tucumán y Patagonia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-xs">
            {MOCK_BUSINESS_UNITS.map((bu) => (
              <div key={bu.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {bu.name}
                    </h4>
                    <span className="text-[11px] text-cyan-800 font-semibold block">
                      {bu.brand}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-700 tabular-nums">
                    {bu.activeCandidates} candidatos
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>{bu.location}</span>
                  <span className="text-slate-400">{bu.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Scoring Parameters */}
      {activeTab === 'scoring' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 space-y-5 text-xs">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Parámetros Normativos y Umbrales de Calificación
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ajustá los estándares mínimos requeridos para superar la etapa de evaluación preliminar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Umbral Mínimo de Ajuste Global (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={minScoreThreshold}
                  onChange={(e) => setMinScoreThreshold(e.target.value)}
                  className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold tabular-nums"
                />
                <span className="text-slate-500 text-[11px]">
                  Puntajes por debajo de {minScoreThreshold}% pasarán a "En reserva".
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Benchmark Mínimo de Orientación a la Calidad (1 - 5)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="5.0"
                  value={passingQualityScore}
                  onChange={(e) => setPassingQualityScore(e.target.value)}
                  className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-bold tabular-nums"
                />
                <span className="text-slate-500 text-[11px]">
                  Criterio excluyente para la posición de Analista de Calidad.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoEmailAlerts}
                onChange={(e) => setAutoEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded"
              />
              <span className="text-slate-700 font-medium">
                Notificar al evaluador cuando un postulante envíe sus 5 casos situacionales.
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={requirePhotoVerification}
                onChange={(e) => setRequirePhotoVerification(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded"
              />
              <span className="text-slate-700 font-medium">
                Exigir aceptación obligatoria del Aviso de Privacidad y Consentimiento antes de iniciar.
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 5: Google Sheets Readiness & Schema preview */}
      {activeTab === 'sheets' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 space-y-5 text-xs">
          <div className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Arquitectura de Datos Preparada para Google Sheets
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Estructura desacoplada para vincular directamente con planillas de cálculo mediante Google Apps Script en la siguiente fase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">
                Hoja 1: "Candidatos"
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ID, Nombre, Correo, Teléfono, Puesto, Concesionaria, Localidad, Fecha, Estado, TokenLink.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">
                Hoja 2: "Respuestas_Conductuales"
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ID_Candidato, Pregunta_01 ... Pregunta_20 (valores 1 al 5), Timestamp de guardado.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">
                Hoja 3: "Casos_Situacionales"
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ID_Candidato, Caso_1 ... Caso_5 (texto amplio de respuesta), Calificación_1..5, Notas.
              </p>
            </div>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-xl border border-cyan-200/80 space-y-2 text-cyan-950">
            <span className="font-bold block">
              Garantía de Desacoplamiento Arquitectónico:
            </span>
            <p className="text-[11px] leading-relaxed">
              La aplicación no almacena credenciales ni dependencias rígidas de SQL o Supabase. Todos los modelos de datos en TypeScript reflejan exactamente la estructura de filas y columnas de Google Sheets, lo que permitirá conectar la API de Google Apps Script mediante un webhook simple sin modificar las vistas visuales ni la experiencia del usuario.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
