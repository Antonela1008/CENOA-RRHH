import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DIMENSIONS, BEHAVIORAL_STATEMENTS } from '../data/mockData';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Save,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

const LIKERT_OPTIONS = [
  { value: 1, label: 'Totalmente en desacuerdo', shortLabel: '1' },
  { value: 2, label: 'En desacuerdo', shortLabel: '2' },
  { value: 3, label: 'Neutro / Ocasionalmente', shortLabel: '3' },
  { value: 4, label: 'De acuerdo', shortLabel: '4' },
  { value: 5, label: 'Totalmente de acuerdo', shortLabel: '5' },
];

export const BehavioralView: React.FC = () => {
  const { candidateAnswers, setBehavioralAnswer, showToast, setActiveView } = useApp();
  const [activeDimensionIndex, setActiveDimensionIndex] = useState(0);

  const activeDimension = DIMENSIONS[activeDimensionIndex];
  const dimensionStatements = BEHAVIORAL_STATEMENTS.filter(
    (s) => s.dimensionId === activeDimension.id
  );

  const answeredCount = Object.keys(candidateAnswers.behavioral).length;
  const totalStatements = BEHAVIORAL_STATEMENTS.length;
  const progressPercentage = Math.round((answeredCount / totalStatements) * 100);

  const isCurrentDimensionComplete = dimensionStatements.every(
    (s) => candidateAnswers.behavioral[s.id] !== undefined
  );

  const handleNextDimension = () => {
    if (activeDimensionIndex < DIMENSIONS.length - 1) {
      setActiveDimensionIndex(activeDimensionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Cuestionario conductual completo. Podés continuar a los casos situacionales.');
      setActiveView('situational');
    }
  };

  const handlePrevDimension = () => {
    if (activeDimensionIndex > 0) {
      setActiveDimensionIndex(activeDimensionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Módulo de Evaluación de Talento</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-semibold">Cuestionario Conductual</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Exploración de Competencias Conductuales
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            20 afirmaciones distribuidas en 5 dimensiones clave para el perfil operativo y analítico de concesionarias.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-900 block tabular-nums">
              {answeredCount} de {totalStatements} respondidas
            </span>
            <span className="text-[11px] text-slate-500">
              {progressPercentage}% completado
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center relative font-bold text-xs text-slate-900 tabular-nums">
            {progressPercentage}%
          </div>
        </div>
      </div>

      {/* Internal Guidance Disclaimer (As required by brief) */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-xl flex items-start gap-3 text-xs text-amber-900">
        <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <span className="font-bold">Aviso Metodológico de Recursos Humanos:</span>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Este cuestionario es una herramienta interna de exploración conductual y ajuste al puesto en concesionarias, no constituye un test psicométrico clínico ni genera diagnósticos psicológicos.
          </p>
        </div>
      </div>

      {/* Dimension Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-1.5 overflow-x-auto">
        {DIMENSIONS.map((dim, idx) => {
          const dimStatements = BEHAVIORAL_STATEMENTS.filter((s) => s.dimensionId === dim.id);
          const isComplete = dimStatements.every((s) => candidateAnswers.behavioral[s.id] !== undefined);
          const isActive = idx === activeDimensionIndex;

          return (
            <button
              key={dim.id}
              onClick={() => setActiveDimensionIndex(idx)}
              className={`flex-1 min-w-[150px] p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Dimensión 0{idx + 1}
                </span>
                {isComplete && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-cyan-400' : 'text-emerald-600'
                    }`}
                  />
                )}
              </div>
              <div className="text-xs font-bold truncate">
                {dim.shortName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Dimension Details */}
      <div className="p-4 bg-slate-100/70 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
          <span className="w-2 h-2 rounded-full bg-cyan-600" />
          <span>Dimensión {activeDimensionIndex + 1}: {activeDimension.name}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {activeDimension.description}
        </p>
      </div>

      {/* Statements List for this dimension */}
      <div className="space-y-4">
        {dimensionStatements.map((item) => {
          const currentScore = candidateAnswers.behavioral[item.id];

          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all bg-white ${
                currentScore !== undefined
                  ? 'border-slate-200 shadow-2xs'
                  : 'border-slate-200/80 shadow-2xs'
              }`}
            >
              {/* Statement text */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 tabular-nums">
                  {item.order}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {item.statement}
                </p>
              </div>

              {/* Likert Scale 5 Options */}
              <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100">
                {LIKERT_OPTIONS.map((opt) => {
                  const isSelected = currentScore === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBehavioralAnswer(item.id, opt.value)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-base font-extrabold tabular-nums">
                        {opt.value}
                      </span>
                      <span
                        className={`text-[10px] hidden sm:block mt-1 font-medium leading-tight ${
                          isSelected ? 'text-cyan-300' : 'text-slate-500'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile label hint */}
              <div className="sm:hidden mt-2 text-[10px] text-center text-slate-400">
                1: Totalmente en desacuerdo ➔ 5: Totalmente de acuerdo
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation and Save Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={handlePrevDimension}
          disabled={activeDimensionIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
            activeDimensionIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
              : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dimensión Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Respuestas guardadas automáticamente.')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Guardar progreso</span>
          </button>

          <button
            onClick={handleNextDimension}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>
              {activeDimensionIndex < DIMENSIONS.length - 1
                ? 'Siguiente Dimensión'
                : 'Ir a Casos Situacionales'}
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
