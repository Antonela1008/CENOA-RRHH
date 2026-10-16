import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DIMENSIONS, SITUATIONAL_CASES } from '../data/mockData';
import {
  Printer,
  FileDown,
  Award,
  CheckCircle2,
  AlertTriangle,
  User,
  Calendar,
  Building2,
  HelpCircle,
  Save,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export const IndividualResultsView: React.FC = () => {
  const {
    candidates,
    selectedCandidateId,
    setSelectedCandidateId,
    results,
    saveEvaluatorNotes,
    showToast,
  } = useApp();

  const candidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];
  const candidateResult = results[candidate.id] || results['cand-001'];

  const [notes, setNotes] = useState(candidateResult.evaluatorNotes);
  const [decision, setDecision] = useState(candidateResult.recommendedDecision);

  // Sync state if candidate changes
  React.useEffect(() => {
    if (candidateResult) {
      setNotes(candidateResult.evaluatorNotes);
      setDecision(candidateResult.recommendedDecision);
    }
  }, [candidate.id]);

  const radarData = DIMENSIONS.map((dim) => {
    const candScore = candidateResult.dimensionScores[dim.id] || 4.2;
    return {
      dimension: dim.shortName,
      candidato: candScore,
      benchmark: dim.benchmarkScore,
      fullMark: 5,
    };
  });

  const barData = DIMENSIONS.map((dim) => {
    const candScore = candidateResult.dimensionScores[dim.id] || 4.2;
    return {
      dimension: dim.shortName,
      score: candScore,
      benchmark: dim.benchmarkScore,
    };
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSaveNotes = () => {
    saveEvaluatorNotes(candidate.id, notes, decision);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar with Candidate Selector & Print Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Talent Assessment</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-semibold">Informe Individual Ejecutivo</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Informe de Evaluación de Competencias
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Resultados consolidados de exploración conductual y resolución de casos de calidad.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Candidate selector */}
          <select
            value={candidate.id}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold shadow-2xs focus:ring-2 focus:ring-cyan-500/20"
          >
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fullName} ({c.company.split(' ')[0]})
              </option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            title="Imprimir informe en formato ejecutivo"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Imprimir / Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* PRINT-ONLY HEADER (Shows only when user prints or exports PDF) */}
      <div className="hidden print-only mb-6 border-b-2 border-slate-900 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-900">
              GRUPO CENOA | Talent Assessment
            </h1>
            <p className="text-xs text-slate-600">
              Dossier Ejecutivo de Evaluación de Competencias y Casos Situacionales
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <span>Fecha de emisión: {new Date().toLocaleDateString('es-AR')}</span>
            <span className="block font-semibold text-slate-700">Autosol · Tsuyoi · Auto NOA</span>
          </div>
        </div>
      </div>

      {/* Candidate Dossier Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-sm">
              {candidate.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {candidate.fullName}
                </h2>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                  {candidate.evaluationStatus}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {candidate.role} · <span className="text-cyan-800 font-semibold">{candidate.company}</span> ({candidate.location})
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                <span>{candidate.email}</span>
                <span aria-hidden="true">·</span>
                <span>{candidate.phone}</span>
                <span aria-hidden="true">·</span>
                <span>Exp: {candidate.experienceYears} años</span>
              </div>
            </div>
          </div>

          {/* Overall Match Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Ajuste General al Perfil
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {candidateResult.overallScore}%
              </span>
              <span className="text-xs font-semibold text-emerald-600">Sobresaliente</span>
            </div>
            <span className="text-[10px] text-slate-400">Ponderación integrada</span>
          </div>
        </div>

        {/* Methodology notice */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
          <p>
            <strong>Marco Institucional:</strong> Este informe es una herramienta interna de exploración conductual y resolución de casos de calidad para el sector automotriz. No genera diagnósticos psicológicos ni decisiones automáticas de contratación. Su propósito es orientar la entrevista técnica de profundidad.
          </p>
        </div>
      </div>

      {/* Visual Charts Grid: Radar & Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print-break-inside-avoid">
        {/* Radar Chart (Competency Spider vs Benchmark) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Gráfico Radar de Competencias
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F2747]" />
                  <span>Candidato</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                  <span>Benchmark</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Superposición frente al perfil de excelencia requerido
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#CBD5E1" strokeDasharray="2 2" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9 }} />
                <Radar
                  name="Candidato"
                  dataKey="candidato"
                  stroke="#0F2747"
                  fill="#0F2747"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Benchmark"
                  dataKey="benchmark"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-5 gap-1 text-center text-[10px]">
            {DIMENSIONS.map((dim) => (
              <div key={dim.id}>
                <span className="text-slate-400 block truncate">{dim.shortName}</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {candidateResult.dimensionScores[dim.id] || 4.0}/5
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart by Dimension */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Desglose de Puntajes Conductuales
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Escala de 1 a 5 según las 20 afirmaciones respondidas
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="dimension" type="category" tick={{ fontSize: 10, fill: '#475569' }} width={90} />
                <Tooltip
                  formatter={(val: any) => [`${val ?? 0} pts`, 'Puntaje']}
                  contentStyle={{
                    backgroundColor: '#0F2747',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="score" fill="#0F2747" radius={[0, 4, 4, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Todas las dimensiones superan el umbral mínimo (3.5 pts).</span>
            <span className="text-cyan-700 font-bold">100% Verificado</span>
          </div>
        </div>
      </div>

      {/* Situational Cases Breakdown */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 print-break-inside-avoid">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Desempeño en los 5 Casos Situacionales de Calidad
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluación cualitativa y cuantitativa de las propuestas de acción del postulante
            </p>
          </div>
          <span className="text-xs font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
            Promedio Casos: 92/100
          </span>
        </div>

        <div className="space-y-3">
          {SITUATIONAL_CASES.map((sc) => {
            const caseScore = candidateResult.caseScores[sc.id] || 90;

            return (
              <div
                key={sc.id}
                className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold tabular-nums">
                      {sc.id}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">
                      {sc.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {caseScore}/100 pts
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Excelente
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 leading-relaxed pl-7">
                  <span className="font-semibold text-slate-700">Enfoque demostrado: </span>
                  {sc.id === 1 && 'Priorización innegociable de la seguridad en ruta y el protocolo de entrega oficial, complementado con contención al cliente sin fisuras comerciales.'}
                  {sc.id === 2 && 'Manejo impecable de la cuenta corporativa, diagnóstico técnico en ruta con el mecánico y garantía de servicio sin cargo.'}
                  {sc.id === 3 && 'Estructuración metódica en 3 acciones de impacto a 30 días para revertir la caída de NPS en Postventa.'}
                  {sc.id === 4 && 'Estrategia de diálogo empático con el personal de taller, eliminación de fricciones ergonómicas y vinculación con incentivos.'}
                  {sc.id === 5 && 'Aplicación rigurosa de la matriz de urgencia e impacto para blindar las garantías financieras y preparar la auditoría.'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Areas to Deepen Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print-break-inside-avoid">
        {/* Strengths */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Fortalezas Observadas
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {candidateResult.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Deepen in Interview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Aspectos para Profundizar en Entrevista
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {candidateResult.areasToDevelop.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Evaluator Notes & Decision Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 print-break-inside-avoid">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Dictamen y Observaciones del Evaluador de RR. HH.
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Evaluador: {candidateResult.reviewerName}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Recomendación de Decisión para la Gerencia de Calidad:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'Avanzar a entrevista de profundidad',
                'En reserva para otro puesto',
                'No ajusta al perfil',
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDecision(opt as any)}
                  className={`p-2.5 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                    decision === opt
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notas y Síntesis del Perfil:
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-slate-50/50 leading-relaxed resize-y"
            />
          </div>

          <div className="flex items-center justify-between pt-2 no-print">
            <span className="text-[11px] text-slate-400">
              Los cambios en el dictamen se conservan en la sesión interactiva.
            </span>
            <button
              onClick={handleSaveNotes}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guardar Dictamen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
