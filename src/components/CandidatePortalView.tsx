import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CenoaLogo } from './CenoaLogo';
import { DIMENSIONS, BEHAVIORAL_STATEMENTS, SITUATIONAL_CASES } from '../data/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

const LIKERT_OPTIONS = [
  { value: 1, label: 'Totalmente en desacuerdo' },
  { value: 2, label: 'En desacuerdo' },
  { value: 3, label: 'Neutro' },
  { value: 4, label: 'De acuerdo' },
  { value: 5, label: 'Totalmente de acuerdo' },
];

export const CandidatePortalView: React.FC = () => {
  const {
    candidates,
    activeCandidateIdForAssessment,
    candidateAnswers,
    setBehavioralAnswer,
    setCaseAnswer,
    finalizeEvaluationAsCandidate,
    switchToHRView,
    showToast,
  } = useApp();

  const candidate =
    candidates.find((c) => c.id === activeCandidateIdForAssessment) ||
    candidates[0];

  const [currentStep, setCurrentStep] = useState<
    'welcome' | 'privacy' | 'behavioral' | 'cases' | 'completed'
  >('welcome');

  const [activeDimensionIdx, setActiveDimensionIdx] = useState(0);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  // Behavioral statements calculation
  const totalStatements = BEHAVIORAL_STATEMENTS.length;
  const answeredStatements = Object.keys(candidateAnswers.behavioral).length;
  const currentDimension = DIMENSIONS[activeDimensionIdx];
  const dimensionStatements = BEHAVIORAL_STATEMENTS.filter(
    (s) => s.dimensionId === currentDimension.id
  );

  // Cases calculation
  const totalCases = SITUATIONAL_CASES.length;
  const activeCase = SITUATIONAL_CASES[activeCaseIdx];
  const currentCaseAnswer = candidateAnswers.cases[activeCase.id] || '';
  const wordCount = currentCaseAnswer.trim() ? currentCaseAnswer.trim().split(/\s+/).length : 0;

  const handleNextBehavioral = () => {
    if (activeDimensionIdx < DIMENSIONS.length - 1) {
      setActiveDimensionIdx(activeDimensionIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('cases');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextCase = () => {
    if (activeCaseIdx < totalCases - 1) {
      setActiveCaseIdx(activeCaseIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      finalizeEvaluationAsCandidate();
      setCurrentStep('completed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Candidate Top Header */}
      <header className="bg-white border-b border-slate-200/90 py-3.5 px-6 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <CenoaLogo variant="dark" />

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Postulante: <strong className="text-slate-800">{candidate.fullName}</strong>
            </span>
            <button
              onClick={switchToHRView}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Volver al Panel RR. HH.
            </button>
          </div>
        </div>
      </header>

      {/* Main Candidate Content */}
      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex-1">
        {/* STEP 1: WELCOME & INSTRUCTIONS */}
        {currentStep === 'welcome' && (
          <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Bienvenido al Proceso de Selección · Grupo Cenoa
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hola, {candidate.fullName.split(' ')[0]}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Te damos la bienvenida a la evaluación de competencias para el puesto de{' '}
                <strong className="text-slate-900">{candidate.role}</strong> en{' '}
                <strong className="text-slate-900">{candidate.company}</strong> ({candidate.location}).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <Clock className="w-4 h-4 text-cyan-600" />
                <span className="font-bold text-slate-900 block">Tiempo Estimado</span>
                <span className="text-slate-500">25 a 35 minutos en total</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <FileText className="w-4 h-4 text-cyan-600" />
                <span className="font-bold text-slate-900 block">20 Preguntas</span>
                <span className="text-slate-500">Exploración conductual rápida</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <Briefcase className="w-4 h-4 text-cyan-600" />
                <span className="font-bold text-slate-900 block">5 Casos Reales</span>
                <span className="text-slate-500">Situaciones de calidad automotriz</span>
              </div>
            </div>

            <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs text-cyan-900 space-y-2">
              <span className="font-bold block">Recomendaciones para responder:</span>
              <ul className="space-y-1 list-disc list-inside text-slate-700">
                <li>No hay respuestas "correctas" o "incorrectas" en la sección conductual; respondé con total honestidad según tu forma habitual de trabajar.</li>
                <li>En los casos situacionales, explicá con claridad qué harías en la práctica si ocurriera hoy en el concesionario.</li>
                <li>Tus avances se van guardando de manera automática mientras avanzás.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setCurrentStep('privacy')}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>Continuar a Políticas de Privacidad</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PRIVACY NOTICE */}
        {currentStep === 'privacy' && (
          <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
                <Lock className="w-5 h-5 text-cyan-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Aviso de Privacidad y Consentimiento de Evaluación
                </h2>
                <p className="text-xs text-slate-500">
                  Grupo Cenoa · Gestión de Personas y Atracción de Talento
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-3 leading-relaxed max-h-60 overflow-y-auto">
              <p>
                <strong>1. Finalidad del tratamiento de datos:</strong> La información y respuestas proporcionadas durante esta evaluación serán utilizadas exclusivamente por el equipo de Recursos Humanos de Grupo Cenoa (Autosol, Tsuyoi, Auto NOA, Cenoa Motors) para analizar tu ajuste al perfil de la posición solicitada.
              </p>
              <p>
                <strong>2. Carácter no diagnóstico:</strong> Esta herramienta tiene fines exclusivamente laborales y orientativos sobre competencias profesionales. No constituye un diagnóstico médico ni psicológico clínico.
              </p>
              <p>
                <strong>3. Confidencialidad y custodia:</strong> Tus datos serán conservados de manera confidencial y protegidos conforme a las buenas prácticas corporativas de protección de datos personales.
              </p>
            </div>

            <label className="flex items-start gap-3 p-3.5 bg-cyan-50/50 border border-cyan-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-cyan-600 rounded"
              />
              <span className="text-xs font-medium text-slate-800">
                He leído y acepto los términos del Aviso de Privacidad para participar en la evaluación de competencias de Grupo Cenoa.
              </span>
            </label>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep('welcome')}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                onClick={() => {
                  if (!privacyAccepted) {
                    showToast('Por favor aceptá los términos de privacidad para continuar.');
                    return;
                  }
                  setCurrentStep('behavioral');
                }}
                disabled={!privacyAccepted}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Comenzar Cuestionario Conductual</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BEHAVIORAL QUESTIONNAIRE (Step-by-step for Candidate) */}
        {currentStep === 'behavioral' && (
          <div className="space-y-6">
            {/* Progress bar banner */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  Etapa 1 de 2: Cuestionario Conductual
                </span>
                <span className="text-slate-500 tabular-nums">
                  Dimensión {activeDimensionIdx + 1} de {DIMENSIONS.length} ({answeredStatements}/20 completadas)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-600 transition-all duration-300"
                  style={{
                    width: `${((activeDimensionIdx + 1) / DIMENSIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Dimension Title */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider">
                Dimensión {activeDimensionIdx + 1}:
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {currentDimension.name}
              </h2>
              <p className="text-xs text-slate-500">
                Indicá en qué grado te identificás con cada una de las siguientes afirmaciones:
              </p>
            </div>

            {/* Statements List */}
            <div className="space-y-4">
              {dimensionStatements.map((item) => {
                const score = candidateAnswers.behavioral[item.id];

                return (
                  <div
                    key={item.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0 tabular-nums">
                        {item.order}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        {item.statement}
                      </p>
                    </div>

                    <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100">
                      {LIKERT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBehavioralAnswer(item.id, opt.value)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                            score === opt.value
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-sm font-black tabular-nums">{opt.value}</span>
                          <span className="text-[10px] hidden sm:block mt-0.5 leading-tight font-medium">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  if (activeDimensionIdx > 0) {
                    setActiveDimensionIdx(activeDimensionIdx - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setCurrentStep('privacy');
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNextBehavioral}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>
                  {activeDimensionIdx < DIMENSIONS.length - 1
                    ? 'Siguiente Dimensión'
                    : 'Continuar a Casos Situacionales'}
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SITUATIONAL CASES (For Candidate) */}
        {currentStep === 'cases' && (
          <div className="space-y-6">
            {/* Progress bar banner */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  Etapa 2 de 2: Casos Situacionales de Calidad
                </span>
                <span className="text-slate-500 tabular-nums">
                  Caso {activeCaseIdx + 1} de {totalCases}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-600 transition-all duration-300"
                  style={{
                    width: `${((activeCaseIdx + 1) / totalCases) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Active Case Details */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
              <div>
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block mb-1">
                  Caso Situacional #{activeCase.id}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {activeCase.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeCase.subtitle}
                </p>
              </div>

              {/* Scenario Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeCase.scenario}
              </div>

              {/* Question */}
              <div className="p-4 bg-slate-900 text-white rounded-xl">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Pregunta a responder:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-100">
                  {activeCase.openQuestion}
                </p>
              </div>

              {/* Answer Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-800">
                    Tu respuesta y propuesta de resolución:
                  </label>
                  <span className="text-slate-400 tabular-nums">
                    {wordCount} palabras
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={currentCaseAnswer}
                  onChange={(e) => setCaseAnswer(activeCase.id, e.target.value)}
                  placeholder="Detallá tus acciones inmediatas, cómo te comunicarías con el cliente o equipo, y qué medidas preventivas proponés..."
                  className="w-full p-4 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white leading-relaxed resize-y"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  if (activeCaseIdx > 0) {
                    setActiveCaseIdx(activeCaseIdx - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setCurrentStep('behavioral');
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNextCase}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>
                  {activeCaseIdx < totalCases - 1
                    ? 'Siguiente Caso'
                    : 'Finalizar y Enviar Evaluación'}
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: FINAL CONFIRMATION */}
        {currentStep === 'completed' && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Evaluación Completada con Éxito
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                ¡Muchas gracias, {candidate.fullName.split(' ')[0]}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Tus respuestas al cuestionario conductual y los 5 casos situacionales fueron registradas de forma segura y ya se encuentran disponibles para la Gerencia de Recursos Humanos de Grupo Cenoa.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-left space-y-1.5">
              <div className="flex justify-between">
                <span>Puesto postulado:</span>
                <strong className="text-slate-800">{candidate.role}</strong>
              </div>
              <div className="flex justify-between">
                <span>Concesionaria:</span>
                <strong className="text-slate-800">{candidate.company}</strong>
              </div>
              <div className="flex justify-between">
                <span>Fecha de envío:</span>
                <strong className="text-slate-800">{new Date().toLocaleDateString('es-AR')}</strong>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={switchToHRView}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Volver al Panel de Recursos Humanos
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Candidate Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        © 2026 Grupo Cenoa · Autosol VW · Tsuyoi Toyota · Auto NOA · Sede Central Salta
      </footer>
    </div>
  );
};
