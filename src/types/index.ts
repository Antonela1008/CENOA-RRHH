export type EvaluationStatus = 'Pendiente' | 'En proceso' | 'Finalizada' | 'Pendiente de revisión';

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  location: string;
  applicationDate: string;
  evaluationStatus: EvaluationStatus;
  resumeSummary: string;
  experienceYears: number;
  education: string;
  lastCompany: string;
  evaluationId?: string;
}

export interface BehavioralDimension {
  id: string;
  name: string;
  shortName: string;
  description: string;
  benchmarkScore: number; // 1 to 5 target benchmark
}

export interface BehavioralStatement {
  id: number;
  dimensionId: string;
  dimensionName: string;
  statement: string;
  order: number;
}

export interface SituationalCase {
  id: number;
  title: string;
  subtitle: string;
  scenario: string;
  contextData: {
    area: string;
    impact: string;
    metric: string;
  };
  openQuestion: string;
  rubricCriteria: string[];
}

export interface SituationalAnswer {
  caseId: number;
  responseText: string;
  submittedAt?: string;
  score?: number; // 1 to 100
  evaluatorNotes?: string;
}

export interface EvaluationResult {
  candidateId: string;
  evaluationId: string;
  evaluationDate: string;
  overallScore: number; // percentage (e.g. 88%)
  dimensionScores: Record<string, number>; // dimensionId -> score (1.0 to 5.0)
  caseScores: Record<number, number>; // caseId -> score (0 to 100)
  strengths: string[];
  areasToDevelop: string[];
  evaluatorNotes: string;
  recommendedDecision: 'Avanzar a entrevista de profundidad' | 'En reserva para otro puesto' | 'No ajusta al perfil';
  reviewerName: string;
}

export interface HRUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Evaluador';
  department: string;
  unit: string;
  avatar: string;
}

export interface Position {
  id: string;
  title: string;
  department: string;
  businessUnit: string;
  openings: number;
  status: 'Activo' | 'Pausado';
  targetScores: Record<string, number>;
}

export interface BusinessUnit {
  id: string;
  name: string;
  brand: string;
  location: string;
  address: string;
  activeCandidates: number;
}
