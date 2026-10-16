import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SITUATIONAL_CASES } from '../data/mockData';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Save,
  HelpCircle,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SituationalCasesView: React.FC = () => {
  const {
    candidateAnswers,
    setCaseAnswer,
    showToast,
    setActiveView,
    activeCandidateIdForAssessment,
    candidates,
  } = useApp();

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const activeCase = SITUATIONAL_CASES[activeCaseIndex];
  const currentAnswer = candidateAnswers.cases[activeCase.id] || '';
  const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0;

  const totalCases = SITUATIONAL_CASES.length;
  const completedCasesCount = Object.keys(candidateAnswers.cases).filter(
    (k) => (candidateAnswers.cases[Number(k)] || '').trim().length > 30
  ).length;

  const candidate = candidates.find((c) => c.id === activeCandidateIdForAssessment);

  const handleNextCase = () => {
    if (activeCaseIndex < totalCases - 1) {
      setActiveCaseIndex(activeCaseIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('¡Casos situacionales guardados! Podés revisar el informe de resultados consolidado.');
      setActiveView('results');
    }
  };

  const handlePrevCase = () => {
    if (activeCaseIndex > 0) {
      setActiveCaseIndex(activeCaseIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Casos Situacionales de Calidad</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-semibold">
              Puesto: Analista de Calidad Concesionaria
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Resolución de Casos Situacionales Críticos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            5 escenarios reales del día a día en talleres oficiales y áreas de entrega 0km de concesionarias.
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-900 block tabular-nums">
              Caso {activeCaseIndex + 1} de {totalCases}
            </span>
            <span className="text-[11px] text-slate-500">
              {completedCasesCount} completados
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center font-bold text-xs text-cyan-800 tabular-nums">
            {completedCasesCount}/{totalCases}
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-5 gap-2 bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs">
        {SITUATIONAL_CASES.map((c, idx) => {
          const hasContent = (candidateAnswers.cases[c.id] || '').trim().length > 30;
          const isActive = idx === activeCaseIndex;

          return (
            <button
              key={c.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Caso 0{idx + 1}
                </span>
                {hasContent && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-cyan-400' : 'text-emerald-600'
                    }`}
                  />
                )}
              </div>
              <div className="text-xs font-bold truncate">
                {c.title.split(':')[1]?.trim() || c.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Case Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Case Title and Context Banner */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 border border-cyan-200 text-cyan-800 rounded-md text-[11px] font-bold">
              <Layers className="w-3.5 h-3.5 text-cyan-700" />
              <span>Caso Situacional #{activeCase.id}</span>
            </span>

            <span className="text-xs text-slate-500">
              Evaluando a: <strong className="text-slate-800">{candidate?.fullName || 'Mariana Soledad Gómez'}</strong>
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            {activeCase.title}
          </h2>
          <p className="text-xs text-cyan-800 font-medium mt-0.5">
            {activeCase.subtitle}
          </p>

          {/* Context data pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-100 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Área Operativa</span>
              <span className="font-semibold text-slate-800">{activeCase.contextData.area}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Impacto en el Negocio</span>
              <span className="font-semibold text-slate-800">{activeCase.contextData.impact}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Indicador Clave</span>
              <span className="font-semibold text-slate-800">{activeCase.contextData.metric}</span>
            </div>
          </div>
        </div>

        {/* Scenario description */}
        <div className="p-5 bg-slate-50/50 space-y-4 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              <span>Descripción del Escenario:</span>
            </h3>
            <p className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed text-xs sm:text-sm">
              {activeCase.scenario}
            </p>
          </div>

          {/* Open Question */}
          <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xs">
            <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Consigna para el Postulante:</span>
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
              {activeCase.openQuestion}
            </p>
          </div>

          {/* Rubric hints (transparent evaluation criteria) */}
          <div className="p-3 bg-cyan-50/60 border border-cyan-200/80 rounded-xl">
            <span className="text-[11px] font-bold text-cyan-900 block mb-1">
              Criterios de Evaluación y Rúbrica Observada por RR. HH.:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
              {activeCase.rubricCriteria.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Response Area */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900">
                Respuesta del Candidato / Propuesta de Acción:
              </label>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {wordCount} palabras
              </span>
            </div>

            <textarea
              rows={8}
              value={currentAnswer}
              onChange={(e) => setCaseAnswer(activeCase.id, e.target.value)}
              placeholder="Escribí de manera detallada las acciones concretas, protocolos a aplicar, comunicación con el cliente/equipo y medidas de prevención..."
              className="w-full p-3.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-white leading-relaxed resize-y"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Se recomienda estructurar la respuesta en: Acción inmediata, Gestión de personas y Solución definitiva.</span>
              <span className="text-emerald-700 font-medium">Auto-guardado activo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={handlePrevCase}
          disabled={activeCaseIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
            activeCaseIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
              : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Caso Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Caso situacional guardado correctamente.')}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Guardar borrador</span>
          </button>

          <button
            onClick={handleNextCase}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>
              {activeCaseIndex < totalCases - 1
                ? 'Siguiente Caso'
                : 'Ver Informe Consolidado'}
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
