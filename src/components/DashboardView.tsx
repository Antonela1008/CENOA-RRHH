import React from 'react';
import { useApp } from '../context/AppContext';
import { DIMENSIONS } from '../data/mockData';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  ArrowUpRight,
  Send,
  GitCompare,
  Building,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    candidates,
    setActiveView,
    setSelectedCandidateId,
    switchToCandidatePortal,
  } = useApp();

  // Metrics
  const total = candidates.length;
  const pending = candidates.filter((c) => c.evaluationStatus === 'Pendiente').length;
  const inProgress = candidates.filter((c) => c.evaluationStatus === 'En proceso').length;
  const completed = candidates.filter((c) => c.evaluationStatus === 'Finalizada').length;
  const pendingReview = candidates.filter((c) => c.evaluationStatus === 'Pendiente de revisión').length;

  const statusDistribution = [
    { name: 'Finalizadas', value: completed, color: '#0F2747' },
    { name: 'En proceso', value: inProgress, color: '#06B6D4' },
    { name: 'Pendientes', value: pending, color: '#94A3B8' },
    { name: 'Pendiente revisión', value: pendingReview, color: '#F59E0B' },
  ];

  const dimensionAverages = DIMENSIONS.map((dim) => {
    return {
      dimension: dim.shortName,
      promedio: 4.3,
      benchmark: dim.benchmarkScore,
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Gestión de Talento y Selección de Personal</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-medium">Octubre 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard de Recursos Humanos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoreo en tiempo real de evaluaciones conductuales y casos situacionales para concesionarias oficiales.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveView('evaluations')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nueva Evaluación</span>
          </button>
          <button
            onClick={() => setActiveView('comparator')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5 text-slate-500" />
            <span>Comparar Perfiles</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Single-Elevation, Unboxed Clean Hierarchy) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Total Candidates */}
        <div
          onClick={() => setActiveView('candidates')}
          className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Candidatos</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {total}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">En proceso de selección</p>
        </div>

        {/* Pendientes */}
        <div
          onClick={() => setActiveView('candidates')}
          className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Evaluaciones Pendientes</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-700 group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-700 tabular-nums">
              {pending}
            </span>
            <span className="text-[11px] text-slate-500">Sin iniciar</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Con link individual enviado</p>
        </div>

        {/* En proceso */}
        <div
          onClick={() => setActiveView('evaluations')}
          className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-cyan-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Evaluaciones en Proceso</span>
            <div className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800 group-hover:bg-cyan-700 group-hover:text-white transition-colors">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-cyan-800 tabular-nums">
              {inProgress}
            </span>
            <span className="text-[11px] text-cyan-700 font-medium">Activas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Respondiendo cuestionario</p>
        </div>

        {/* Finalizadas */}
        <div
          onClick={() => setActiveView('results')}
          className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Evaluaciones Finalizadas</span>
            <div className="p-1.5 rounded-lg bg-slate-900 text-white transition-colors">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {completed}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Completas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Con informe y gráficos listos</p>
        </div>

        {/* Pendientes de revisión */}
        <div
          onClick={() => setActiveView('evaluations')}
          className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-300 transition-all cursor-pointer group col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pendientes de Revisión</span>
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-700 tabular-nums">
              {pendingReview}
            </span>
            <span className="text-[11px] text-amber-600 font-medium">Casos listos</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Respuestas a revisar por RR.HH.</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left chart: Competency Benchmark vs Candidate Average */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Puntaje Promedio por Dimensión Conductual (Escala 1 - 5)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparativa entre el Promedio del Grupo de Postulantes y el Benchmark requerido para Analista de Calidad
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#0F2747]" />
                <span className="text-slate-600 font-medium">Promedio Grupo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#06B6D4]" />
                <span className="text-slate-600 font-medium">Benchmark Puesto</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dimensionAverages}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="dimension"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                  ticks={[1, 2, 3, 4, 5]}
                />
                <Tooltip
                  formatter={(val: any) => [
                    `${Number(val ?? 0).toFixed(2)} pts`,
                    'Puntaje',
                  ]}
                  contentStyle={{
                    backgroundColor: '#0F2747',
                    borderColor: '#0F2747',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="promedio" fill="#0F2747" radius={[4, 4, 0, 0]} maxBarSize={36} />
                <Bar dataKey="benchmark" fill="#06B6D4" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right chart: Status Funnel */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">
              Estado de Evaluaciones
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribución actual del proceso de selección
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value ?? 0} candidatos`, 'Cantidad']}
                  contentStyle={{
                    backgroundColor: '#0F2747',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity & Top Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidates Ready for Review */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Candidatos Recientes para el Puesto Analista de Calidad
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Postulantes destacados con respuestas completadas o en curso
              </p>
            </div>
            <button
              onClick={() => setActiveView('candidates')}
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {candidates.slice(0, 4).map((cand) => (
              <div
                key={cand.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {cand.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {cand.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{cand.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cand.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      cand.evaluationStatus === 'Finalizada'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : cand.evaluationStatus === 'Pendiente de revisión'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : cand.evaluationStatus === 'En proceso'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cand.evaluationStatus}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedCandidateId(cand.id);
                      setActiveView('results');
                    }}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    title="Ver informe individual"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audit & System Activity Feed */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h2 className="text-sm font-bold text-slate-900">
              Actividad Reciente del Proceso
            </h2>
            <span className="text-xs text-slate-400">Hoy</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-slate-800 font-medium">
                  <span className="font-bold">Mariana Soledad Gómez</span> finalizó los 5 casos situacionales con 92% de ajuste al perfil.
                </p>
                <span className="text-[11px] text-slate-400">Hace 35 minutos · Autosol Salta</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-slate-800 font-medium">
                  <span className="font-bold">Lucas Martín Pereyra</span> completó el cuestionario conductual de 20 preguntas.
                </p>
                <span className="text-[11px] text-slate-400">Hace 2 horas · Tsuyoi Jujuy</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-slate-800 font-medium">
                  Nuevo enlace de evaluación generado para <span className="font-bold">Facundo Damián Benítez</span>.
                </p>
                <span className="text-[11px] text-slate-400">Hace 4 horas · Autosol Jujuy</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <div>
                <p className="text-slate-800 font-medium">
                  Informe de auditoría emitido por <span className="font-bold">Lic. Antonela Iradez</span> para posición de Calidad.
                </p>
                <span className="text-[11px] text-slate-400">Ayer 18:40 · Sede Central</span>
              </div>
            </div>
          </div>

          {/* Quick interactive test drive */}
          <div className="mt-5 pt-4 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 p-4 rounded-b-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">
                Simulación para Evaluadores
              </span>
              <span className="text-[11px] text-slate-500">
                Completá las 20 preguntas o respondé los 5 casos en vivo.
              </span>
            </div>
            <button
              onClick={() => switchToCandidatePortal('cand-001')}
              className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Iniciar Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
