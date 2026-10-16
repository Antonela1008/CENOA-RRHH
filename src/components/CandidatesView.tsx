import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Candidate, EvaluationStatus } from '../types';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Award,
  GitCompare,
  X,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  Send,
  FileCheck2,
  GraduationCap,
  Copy,
  ExternalLink,
} from 'lucide-react';

export const CandidatesView: React.FC = () => {
  const {
    candidates,
    addCandidate,
    setSelectedCandidateId,
    setActiveView,
    toggleCandidateInComparator,
    comparatorCandidateIds,
    updateCandidateStatus,
    showToast,
    switchToCandidatePortal,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedCompany, setSelectedCompany] = useState<string>('todas');
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeCandidateDetail, setActiveCandidateDetail] = useState<Candidate | null>(null);

  // New Candidate Form State
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('Analista de Calidad');
  const [newCompany, setNewCompany] = useState('Autosol Concesionario Oficial Volkswagen');
  const [newLocation, setNewLocation] = useState('Salta Capital');
  const [newExperience, setNewExperience] = useState(3);
  const [newEducation, setNewEducation] = useState('Lic. en Calidad o afines');
  const [newSummary, setNewSummary] = useState('');

  const companiesList = Array.from(new Set(candidates.map((c) => c.company)));

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'todos' || c.evaluationStatus === selectedStatus;
    const matchesCompany =
      selectedCompany === 'todas' || c.company === selectedCompany;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newEmail.trim()) {
      showToast('Por favor completá los campos obligatorios.');
      return;
    }

    addCandidate({
      fullName: newFullName,
      email: newEmail,
      phone: newPhone || '+54 9 387 000-0000',
      role: newRole,
      company: newCompany,
      location: newLocation,
      experienceYears: Number(newExperience),
      education: newEducation,
      lastCompany: 'Concesionaria Oficial NOA',
      resumeSummary:
        newSummary ||
        'Postulante evaluado para el área de control de calidad y auditoría de postventa en Grupo Cenoa.',
    });

    setShowNewModal(false);
    // Reset form
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewSummary('');
  };

  const copyAssessmentLink = (candidate: Candidate) => {
    const link = `https://talent.cenoa.com.ar/eval/${candidate.evaluationId || 'cenoa-eval'}`;
    navigator.clipboard?.writeText(link);
    showToast(`Enlace copiado al portapapeles: ${link}`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Grupo Cenoa</span>
            <span aria-hidden="true">·</span>
            <span>Atracción de Talento</span>
            <span aria-hidden="true">·</span>
            <span>Directorio de Postulantes</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Gestión de Candidatos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Administrá postulaciones, enviá enlaces individuales y accedé a las fichas completas de evaluación.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Nuevo Candidato</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, puesto, empresa o localidad..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 bg-slate-50/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filtros:</span>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="todos">Todos los Estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Pendiente de revisión">Pendiente de revisión</option>
          </select>

          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 max-w-xs truncate"
          >
            <option value="todas">Todas las Concesionarias</option>
            {companiesList.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidates Interactive Data Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Candidato</th>
                <th className="py-3 px-4">Puesto Postulado</th>
                <th className="py-3 px-4">Empresa / Concesionaria</th>
                <th className="py-3 px-4">Localidad</th>
                <th className="py-3 px-4">Fecha Postulación</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No se encontraron candidatos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => {
                  const isInComparator = comparatorCandidateIds.includes(c.id);

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                            {c.fullName
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                          <div>
                            <button
                              onClick={() => setActiveCandidateDetail(c)}
                              className="font-bold text-slate-900 hover:text-cyan-700 transition-colors text-left block"
                            >
                              {c.fullName}
                            </button>
                            <span className="text-[11px] text-slate-400 block">
                              {c.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {c.role}
                      </td>

                      {/* Company */}
                      <td className="py-3 px-4 text-slate-600">
                        <span className="truncate max-w-[200px] block" title={c.company}>
                          {c.company}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-slate-600">
                        {c.location}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-slate-500 tabular-nums">
                        {c.applicationDate}
                      </td>

                      {/* Status */}
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

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setActiveCandidateDetail(c)}
                            title="Ver ficha completa de candidato"
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedCandidateId(c.id);
                              setActiveView('results');
                            }}
                            title="Ver informe individual de evaluación"
                            className="p-1.5 text-slate-500 hover:text-cyan-700 hover:bg-cyan-50 rounded-md transition-colors"
                          >
                            <Award className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => toggleCandidateInComparator(c.id)}
                            title={
                              isInComparator
                                ? 'Quitar del comparador'
                                : 'Agregar al comparador'
                            }
                            className={`p-1.5 rounded-md transition-colors ${
                              isInComparator
                                ? 'text-cyan-700 bg-cyan-100'
                                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => copyAssessmentLink(c)}
                            title="Copiar enlace individual de evaluación"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer of Table */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando <strong>{filteredCandidates.length}</strong> de{' '}
            <strong>{candidates.length}</strong> candidatos postulados
          </span>
          <div className="flex items-center gap-3">
            <span>Filtro activo: {selectedStatus !== 'todos' ? selectedStatus : 'Todos'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-700 font-semibold">Grupo Cenoa RR.HH.</span>
          </div>
        </div>
      </div>

      {/* Modal: New Candidate */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Registrar Nuevo Candidato
                </h3>
                <p className="text-xs text-slate-500">
                  Agregá los datos iniciales para emitir el enlace de evaluación.
                </p>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Alberto Fernández"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="postulante@gmail.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="text"
                    placeholder="+54 9 387 ..."
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Puesto Postulado
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 bg-white"
                  >
                    <option value="Analista de Calidad">Analista de Calidad</option>
                    <option value="Asesor Comercial Senior">Asesor Comercial Senior</option>
                    <option value="Jefe de Taller de Servicio">Jefe de Taller de Servicio</option>
                    <option value="Recepcionista Asesor de Postventa">Recepcionista Asesor de Postventa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Localidad
                  </label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 bg-white"
                  >
                    <option value="Salta Capital">Salta Capital</option>
                    <option value="San Salvador de Jujuy">San Salvador de Jujuy</option>
                    <option value="San Miguel de Tucumán">San Miguel de Tucumán</option>
                    <option value="Comodoro Rivadavia">Comodoro Rivadavia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Empresa / Concesionaria Oficial de Grupo Cenoa
                </label>
                <select
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 bg-white"
                >
                  <option value="Autosol Concesionario Oficial Volkswagen">Autosol Concesionario Oficial Volkswagen</option>
                  <option value="Tsuyoi Concesionario Oficial Toyota">Tsuyoi Concesionario Oficial Toyota</option>
                  <option value="Auto NOA (Fiat / Jeep)">Auto NOA (Fiat / Jeep)</option>
                  <option value="Cenoa Motors (Peugeot / Citroën)">Cenoa Motors (Peugeot / Citroën)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Años de Experiencia
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={newExperience}
                    onChange={(e) => setNewExperience(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Formación Académica
                  </label>
                  <input
                    type="text"
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Resumen o Notas de CV
                </label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Síntesis de perfil técnico, auditorías previas y conocimientos de normas..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Guardar y Emitir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drawer / Modal: Candidate Individual Profile */}
      {activeCandidateDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                  {activeCandidateDetail.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {activeCandidateDetail.fullName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{activeCandidateDetail.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-700 font-semibold">
                      {activeCandidateDetail.company}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveCandidateDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="py-4 space-y-4 text-xs">
              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{activeCandidateDetail.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{activeCandidateDetail.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>{activeCandidateDetail.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Postulado el {activeCandidateDetail.applicationDate}</span>
                </div>
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">Formación</span>
                  </div>
                  <p className="text-slate-800 font-medium">
                    {activeCandidateDetail.education}
                  </p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">Experiencia Laboral</span>
                  </div>
                  <p className="text-slate-800 font-medium">
                    {activeCandidateDetail.experienceYears} años en el sector automotriz / calidad
                  </p>
                </div>
              </div>

              {/* Resume summary */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Resumen Profesional y Perfil
                </h4>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                  {activeCandidateDetail.resumeSummary}
                </p>
              </div>

              {/* Unique Assessment Link Section */}
              <div className="p-3.5 bg-cyan-50/70 border border-cyan-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cyan-900">
                    Enlace Individual de Evaluación
                  </span>
                  <span className="text-[11px] text-cyan-700 font-medium">
                    Estado: {activeCandidateDetail.evaluationStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://talent.cenoa.com.ar/eval/${
                      activeCandidateDetail.evaluationId || 'cenoa-eval'
                    }`}
                    className="flex-1 px-3 py-1.5 bg-white border border-cyan-200 rounded-md text-slate-700 font-mono text-[11px]"
                  />
                  <button
                    onClick={() => copyAssessmentLink(activeCandidateDetail)}
                    className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </button>
                </div>
              </div>

              {/* Status updater */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Modificar Estado de Evaluación (Simulación de ciclo de vida)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    ['Pendiente', 'En proceso', 'Pendiente de revisión', 'Finalizada'] as EvaluationStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateCandidateStatus(activeCandidateDetail.id, st);
                        setActiveCandidateDetail({
                          ...activeCandidateDetail,
                          evaluationStatus: st,
                        });
                      }}
                      className={`py-1.5 px-2 rounded-md font-medium text-center border transition-all ${
                        activeCandidateDetail.evaluationStatus === st
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  switchToCandidatePortal(activeCandidateDetail.id);
                  setActiveCandidateDetail(null);
                }}
                className="flex items-center gap-1.5 text-cyan-700 hover:text-cyan-800 font-semibold text-xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Simular Test de este candidato</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCandidateId(activeCandidateDetail.id);
                    setActiveView('results');
                    setActiveCandidateDetail(null);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ver Informe Completo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
