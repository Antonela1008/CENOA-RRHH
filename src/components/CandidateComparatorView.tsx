import React from 'react';
import { useApp } from '../context/AppContext';
import { DIMENSIONS, SITUATIONAL_CASES } from '../data/mockData';
import {
  GitCompare,
  Users,
  CheckCircle2,
  Award,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
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
  Legend,
} from 'recharts';

const CANDIDATE_COLORS = ['#0F2747', '#06B6D4', '#6366F1', '#10B981', '#F59E0B'];

export const CandidateComparatorView: React.FC = () => {
  const {
    candidates,
    comparatorCandidateIds,
    toggleCandidateInComparator,
    results,
    setSelectedCandidateId,
    setActiveView,
  } = useApp();

  const selectedCandidates = candidates.filter((c) =>
    comparatorCandidateIds.includes(c.id)
  );

  // Prepare Radar Data comparing all selected candidates
  const radarData = DIMENSIONS.map((dim) => {
    const row: any = {
      dimension: dim.shortName,
      Benchmark: dim.benchmarkScore,
    };
    selectedCandidates.forEach((cand) => {
      const candResult = results[cand.id] || results['cand-001'];
      row[cand.fullName.split(' ')[0]] = candResult.dimensionScores[dim.id] || 4.0;
    });
    return row;
  });

  // Prepare Bar Data
  const barData = DIMENSIONS.map((dim) => {
    const row: any = {
      dimension: dim.shortName,
    };
    selectedCandidates.forEach((cand) => {
      const candResult = results[cand.id] || results['cand-001'];
      row[cand.fullName.split(' ')[0]] = candResult.dimensionScores[dim.id] || 4.0;
    });
    return row;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Toma de Decisiones de Selección</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-semibold">Módulo Comparativo</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Comparador de Postulantes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compará el perfil conductual, resolución de casos de calidad y fortalezas de 2 a 5 candidatos en paralelo.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200/90 shadow-2xs">
          <Users className="w-4 h-4 text-cyan-600" />
          <span>
            <strong>{selectedCandidates.length}</strong> candidatos seleccionados
          </span>
          <span className="text-slate-400">(mín. 2 · máx. 5)</span>
        </div>
      </div>

      {/* Candidate Multi-Selection Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">
            Seleccioná los candidatos para la terna comparativa:
          </span>
          <span className="text-slate-400">
            Hacé clic para activar o desactivar perfiles
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {candidates.map((c) => {
            const isSelected = comparatorCandidateIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleCandidateInComparator(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-cyan-400' : 'bg-slate-300'
                  }`}
                />
                <span>{c.fullName}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? 'text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  ({c.company.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Charts: Multi-Radar and Side-by-Side Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Multi-Candidate Radar Chart */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Superposición de Perfiles vs Benchmark
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualización polar de las 5 dimensiones clave
            </p>
          </div>

          <div className="h-72 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#CBD5E1" strokeDasharray="2 2" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9 }} />
                {selectedCandidates.map((cand, idx) => {
                  const firstName = cand.fullName.split(' ')[0];
                  const color = CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length];
                  return (
                    <Radar
                      key={cand.id}
                      name={firstName}
                      dataKey={firstName}
                      stroke={color}
                      fill={color}
                      fillOpacity={0.25}
                    />
                  );
                })}
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-100">
            Escala 1 (Mínimo) a 5 (Óptimo)
          </div>
        </div>

        {/* Dimension Comparison Bar Chart */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Comparativa por Dimensión Conductual
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Puntajes lado a lado en cada área analizada
            </p>
          </div>

          <div className="h-72 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any) => [`${val ?? 0} pts`, 'Puntaje']}
                  contentStyle={{
                    backgroundColor: '#0F2747',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                {selectedCandidates.map((cand, idx) => {
                  const firstName = cand.fullName.split(' ')[0];
                  const color = CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length];
                  return (
                    <Bar
                      key={cand.id}
                      dataKey={firstName}
                      fill={color}
                      radius={[3, 3, 0, 0]}
                      maxBarSize={22}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-100">
            Valores tabulares calculados en base a las 20 afirmaciones
          </div>
        </div>
      </div>

      {/* Side-by-Side Candidate Cards Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Matriz de Decisión y Análisis Comparativo de la Terna
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cotejo detallado de indicadores cuantitativos y observaciones cualitativas
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-700">
              <tr>
                <th className="py-3 px-4 w-48">Criterio de Selección</th>
                {selectedCandidates.map((cand, idx) => (
                  <th key={cand.id} className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length],
                        }}
                      />
                      <span className="font-bold text-slate-900 text-xs">
                        {cand.fullName}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                      {cand.company.split(' ')[0]} · {cand.location}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Overall Score */}
              <tr className="bg-slate-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">
                  Ajuste General (%)
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4">
                      <span className="text-base font-extrabold text-slate-900 tabular-nums">
                        {res.overallScore}%
                      </span>
                      <span className="text-[11px] text-emerald-600 font-medium ml-1.5">
                        {res.overallScore >= 90 ? 'Excelente' : 'Muy bueno'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Quality & Detail */}
              <tr>
                <td className="py-3 px-4 font-medium text-slate-700">
                  Calidad y Detalle (1-5)
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4 font-semibold text-slate-800 tabular-nums">
                      {res.dimensionScores['calidad'] || 4.2} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Organization & Planning */}
              <tr>
                <td className="py-3 px-4 font-medium text-slate-700">
                  Planificación (1-5)
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4 font-semibold text-slate-800 tabular-nums">
                      {res.dimensionScores['organizacion'] || 4.0} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Problem Analysis */}
              <tr>
                <td className="py-3 px-4 font-medium text-slate-700">
                  Análisis Causa Raíz (1-5)
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4 font-semibold text-slate-800 tabular-nums">
                      {res.dimensionScores['analisis'] || 4.0} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Situational Average */}
              <tr className="bg-slate-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">
                  Promedio Casos Situacionales
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  const avg = Math.round(
                    Object.values(res.caseScores).reduce((a, b) => a + b, 0) /
                      Object.values(res.caseScores).length
                  );
                  return (
                    <td key={cand.id} className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                      {avg} / 100 pts
                    </td>
                  );
                })}
              </tr>

              {/* Primary Strengths */}
              <tr>
                <td className="py-3 px-4 font-medium text-slate-700">
                  Fortaleza Principal
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4 text-slate-700 leading-relaxed text-[11px]">
                      {res.strengths[0]}
                    </td>
                  );
                })}
              </tr>

              {/* Area to Develop */}
              <tr>
                <td className="py-3 px-4 font-medium text-slate-700">
                  Área de Desarrollo
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4 text-slate-600 leading-relaxed text-[11px]">
                      {res.areasToDevelop[0]}
                    </td>
                  );
                })}
              </tr>

              {/* Recommended Decision */}
              <tr className="bg-slate-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">
                  Dictamen del Evaluador
                </td>
                {selectedCandidates.map((cand) => {
                  const res = results[cand.id] || results['cand-001'];
                  return (
                    <td key={cand.id} className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-bold">
                        {res.recommendedDecision}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Actions */}
              <tr>
                <td className="py-3 px-4 font-medium text-slate-700">
                  Informe Individual
                </td>
                {selectedCandidates.map((cand) => (
                  <td key={cand.id} className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedCandidateId(cand.id);
                        setActiveView('results');
                      }}
                      className="flex items-center gap-1 text-cyan-700 hover:text-cyan-800 font-bold text-xs"
                    >
                      <span>Abrir Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
