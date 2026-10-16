import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Link2,
  Copy,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  X,
  FileCheck2,
} from 'lucide-react';

export const EvaluationsView: React.FC = () => {
  const {
    candidates,
    positions,
    createEvaluationForCandidate,
    setSelectedCandidateId,
    setActiveView,
    switchToCandidatePortal,
    showToast,
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string>(
    candidates[0]?.id || ''
  );
  const [selectedPosition, setSelectedPosition] = useState<string>(
    positions[0]?.title || 'Analista de Calidad - Concesionaria'
  );
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const handleCreateEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) {
      showToast('Por favor seleccioná un candidato.');
      return;
    }
    createEvaluationForCandidate(selectedCandidate, selectedPosition);
    setShowCreateModal(false);
  };

  const copyLink = (token: string) => {
    const fullLink = `https://talent.cenoa.com.ar/eval/${token}`;
    navigator.clipboard?.writeText(fullLink);
    showToast(`Enlace individual copiado: ${fullLink}`);
  };

  const filteredCandidates = candidates.filter((c) => {
    if (filterStatus === 'todos') return true;
    return c.evaluationStatus === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Seguimiento de Evaluaciones</span>
            <span aria-hidden="true">·</span>
            <span>Enlaces Individuales</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Gestión de Evaluaciones
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generá enlaces individuales, supervisá fechas de envío y monitoreá el estado de avance de cada postulante.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Generar Nueva Evaluación</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'todos', label: 'Todas las evaluaciones' },
            { id: 'Pendiente', label: 'Pendientes' },
            { id: 'En proceso', label: 'En proceso' },
            { id: 'Pendiente de revisión', label: 'Por revisar' },
            { id: 'Finalizada', label: 'Finalizadas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          Mostrando {filteredCandidates.length} registros
        </div>
      </div>

      {/* Evaluations Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Postulante</th>
                <th className="py-3 px-4">Puesto Evaluado</th>
                <th className="py-3 px-4">Enlace Individual Único</th>
                <th className="py-3 px-4">Fecha Envío</th>
                <th className="py-3 px-4">Fecha Finalización</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((c) => {
                const token = c.evaluationId || `cenoa-${c.id}`;
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Candidate */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{c.fullName}</div>
                      <div className="text-[11px] text-slate-400">{c.email}</div>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {c.role}
                      <span className="block text-[11px] text-slate-400">
                        {c.company.split(' ')[0]} · {c.location}
                      </span>
                    </td>

                    {/* Link */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 max-w-xs">
                        <span className="font-mono text-[11px] text-slate-700 truncate bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          https://talent.cenoa.com.ar/eval/{token}
                        </span>
                        <button
                          onClick={() => copyLink(token)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                          title="Copiar enlace"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Sent Date */}
                    <td className="py-3 px-4 text-slate-600 tabular-nums">
                      {c.applicationDate}
                    </td>

                    {/* Completed Date */}
                    <td className="py-3 px-4 text-slate-600 tabular-nums">
                      {c.evaluationStatus === 'Finalizada' || c.evaluationStatus === 'Pendiente de revisión'
                        ? '14/10/2026'
                        : '—'}
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          c.evaluationStatus === 'Finalizada'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : c.evaluationStatus === 'Pendiente de revisión'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : c.evaluationStatus === 'En proceso'
                            ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {c.evaluationStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => switchToCandidatePortal(c.id)}
                          className="p-1.5 text-cyan-700 hover:bg-cyan-50 rounded-md transition-colors"
                          title="Simular cuestionario como este postulante"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCandidateId(c.id);
                            setActiveView('results');
                          }}
                          className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-[11px] transition-colors"
                        >
                          Ver Informe
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Evaluation */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Generar Nueva Evaluación
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvaluation} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Seleccionar Candidato
                </label>
                <select
                  value={selectedCandidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {candidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Puesto y Perfil a Evaluar
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.title}>
                      {pos.title} — {pos.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-cyan-50/70 rounded-lg border border-cyan-200/80 text-[11px] text-cyan-900 space-y-1">
                <span className="font-bold block">Estructura de la Evaluación:</span>
                <div>• Cuestionario de 20 afirmaciones conductuales (5 dimensiones).</div>
                <div>• 5 casos situacionales específicos del rubro automotriz.</div>
                <div>• Enlace único con acceso seguro para el postulante.</div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Generar Enlace</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
