import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Candidate,
  EvaluationResult,
  HRUser,
  Position,
  BusinessUnit,
  EvaluationStatus,
} from '../types';
import {
  MOCK_CANDIDATES,
  MOCK_RESULTS,
  MOCK_HR_USERS,
  MOCK_POSITIONS,
  MOCK_BUSINESS_UNITS,
  MOCK_CANDIDATE_ANSWERS,
} from '../data/mockData';

export type AppView =
  | 'welcome'
  | 'dashboard'
  | 'candidates'
  | 'evaluations'
  | 'behavioral'
  | 'situational'
  | 'results'
  | 'comparator'
  | 'admin'
  | 'candidate-portal';

interface AppContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isLoggedIn: boolean;
  currentUser: HRUser;
  candidates: Candidate[];
  positions: Position[];
  businessUnits: BusinessUnit[];
  results: Record<string, EvaluationResult>;
  selectedCandidateId: string;
  setSelectedCandidateId: (id: string) => void;
  comparatorCandidateIds: string[];
  setComparatorCandidateIds: (ids: string[]) => void;
  toggleCandidateInComparator: (id: string) => void;

  // Candidate evaluation in-progress answers
  candidateAnswers: {
    behavioral: Record<number, number>;
    cases: Record<number, string>;
  };
  setBehavioralAnswer: (questionId: number, score: number) => void;
  setCaseAnswer: (caseId: number, answer: string) => void;
  activeCandidateIdForAssessment: string;
  setActiveCandidateIdForAssessment: (id: string) => void;

  // Actions
  loginAsHR: () => void;
  loginAsCandidate: (candidateId?: string) => void;
  logout: () => void;
  switchToCandidatePortal: (candidateId?: string) => void;
  switchToHRView: () => void;
  addCandidate: (newCandidate: Omit<Candidate, 'id' | 'applicationDate' | 'evaluationStatus'>) => void;
  updateCandidateStatus: (candidateId: string, status: EvaluationStatus) => void;
  createEvaluationForCandidate: (candidateId: string, role: string) => string;
  saveEvaluatorNotes: (candidateId: string, notes: string, decision: EvaluationResult['recommendedDecision']) => void;
  finalizeEvaluationAsCandidate: () => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser] = useState<HRUser>(MOCK_HR_USERS[0]);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [positions] = useState<Position[]>(MOCK_POSITIONS);
  const [businessUnits] = useState<BusinessUnit[]>(MOCK_BUSINESS_UNITS);
  const [results, setResults] = useState<Record<string, EvaluationResult>>(MOCK_RESULTS);

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cand-001');
  const [comparatorCandidateIds, setComparatorCandidateIds] = useState<string[]>([
    'cand-001',
    'cand-002',
    'cand-003',
  ]);

  const [activeCandidateIdForAssessment, setActiveCandidateIdForAssessment] = useState<string>('cand-001');
  const [candidateAnswers, setCandidateAnswers] = useState<{
    behavioral: Record<number, number>;
    cases: Record<number, string>;
  }>({
    behavioral: { ...MOCK_CANDIDATE_ANSWERS['cand-001'].behavioral },
    cases: { ...MOCK_CANDIDATE_ANSWERS['cand-001'].cases },
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const loginAsHR = () => {
    setIsLoggedIn(true);
    setActiveView('dashboard');
    showToast('Bienvenido al Panel de Gestión de Talento - Grupo Cenoa');
  };

  const loginAsCandidate = (candidateId = 'cand-001') => {
    setIsLoggedIn(true);
    setActiveCandidateIdForAssessment(candidateId);
    setActiveView('candidate-portal');
    showToast('Acceso a la Evaluación de Talento para Candidatos');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActiveView('welcome');
  };

  const switchToCandidatePortal = (candidateId = 'cand-001') => {
    setActiveCandidateIdForAssessment(candidateId);
    setActiveView('candidate-portal');
  };

  const switchToHRView = () => {
    setActiveView('dashboard');
  };

  const toggleCandidateInComparator = (id: string) => {
    setComparatorCandidateIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 2) {
          showToast('El comparador requiere al menos 2 candidatos.');
          return prev;
        }
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 5) {
          showToast('Podés comparar un máximo de 5 candidatos simultáneos.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const setBehavioralAnswer = (questionId: number, score: number) => {
    setCandidateAnswers((prev) => ({
      ...prev,
      behavioral: {
        ...prev.behavioral,
        [questionId]: score,
      },
    }));
  };

  const setCaseAnswer = (caseId: number, answer: string) => {
    setCandidateAnswers((prev) => ({
      ...prev,
      cases: {
        ...prev.cases,
        [caseId]: answer,
      },
    }));
  };

  const addCandidate = (newCandData: Omit<Candidate, 'id' | 'applicationDate' | 'evaluationStatus'>) => {
    const newId = `cand-00${candidates.length + 1}`;
    const newCandidate: Candidate = {
      ...newCandData,
      id: newId,
      applicationDate: new Date().toISOString().split('T')[0],
      evaluationStatus: 'Pendiente',
      evaluationId: `eval-${100 + candidates.length + 1}`,
    };
    setCandidates((prev) => [newCandidate, ...prev]);
    showToast(`Candidato ${newCandData.fullName} registrado correctamente.`);
  };

  const updateCandidateStatus = (candidateId: string, status: EvaluationStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, evaluationStatus: status } : c))
    );
    showToast(`Estado de evaluación actualizado a: ${status}`);
  };

  const createEvaluationForCandidate = (candidateId: string, role: string) => {
    const linkToken = `cenoa-${Math.random().toString(36).substring(2, 8)}`;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? { ...c, role, evaluationStatus: 'En proceso', evaluationId: linkToken }
          : c
      )
    );
    const demoLink = `https://talent.cenoa.com.ar/eval/${linkToken}`;
    showToast(`Enlace individual generado: ${demoLink}`);
    return demoLink;
  };

  const saveEvaluatorNotes = (
    candidateId: string,
    notes: string,
    decision: EvaluationResult['recommendedDecision']
  ) => {
    setResults((prev) => {
      const existing = prev[candidateId];
      if (!existing) return prev;
      return {
        ...prev,
        [candidateId]: {
          ...existing,
          evaluatorNotes: notes,
          recommendedDecision: decision,
        },
      };
    });
    showToast('Observaciones y dictamen del evaluador guardados correctamente.');
  };

  const finalizeEvaluationAsCandidate = () => {
    // Calculate simulated results for current candidate
    const candidate = candidates.find((c) => c.id === activeCandidateIdForAssessment);
    if (candidate) {
      updateCandidateStatus(candidate.id, 'Pendiente de revisión');
      showToast('¡Evaluación finalizada con éxito! Los datos fueron enviados al equipo de RR. HH.');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        isLoggedIn,
        currentUser,
        candidates,
        positions,
        businessUnits,
        results,
        selectedCandidateId,
        setSelectedCandidateId,
        comparatorCandidateIds,
        setComparatorCandidateIds,
        toggleCandidateInComparator,
        candidateAnswers,
        setBehavioralAnswer,
        setCaseAnswer,
        activeCandidateIdForAssessment,
        setActiveCandidateIdForAssessment,
        loginAsHR,
        loginAsCandidate,
        logout,
        switchToCandidatePortal,
        switchToHRView,
        addCandidate,
        updateCandidateStatus,
        createEvaluationForCandidate,
        saveEvaluatorNotes,
        finalizeEvaluationAsCandidate,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
