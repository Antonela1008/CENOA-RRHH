import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DashboardView } from './components/DashboardView';
import { CandidatesView } from './components/CandidatesView';
import { EvaluationsView } from './components/EvaluationsView';
import { BehavioralView } from './components/BehavioralView';
import { SituationalCasesView } from './components/SituationalCasesView';
import { IndividualResultsView } from './components/IndividualResultsView';
import { CandidateComparatorView } from './components/CandidateComparatorView';
import { AdminPanelView } from './components/AdminPanelView';
import { CandidatePortalView } from './components/CandidatePortalView';

const MainLayout: React.FC = () => {
  const { activeView, isLoggedIn } = useApp();

  // If not logged in or on welcome screen
  if (!isLoggedIn || activeView === 'welcome') {
    return (
      <>
        <WelcomeScreen />
        <Toast />
      </>
    );
  }

  // If candidate portal is active
  if (activeView === 'candidate-portal') {
    return (
      <>
        <CandidatePortalView />
        <Toast />
      </>
    );
  }

  // Corporate HR Layout
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'candidates' && <CandidatesView />}
          {activeView === 'evaluations' && <EvaluationsView />}
          {activeView === 'behavioral' && <BehavioralView />}
          {activeView === 'situational' && <SituationalCasesView />}
          {activeView === 'results' && <IndividualResultsView />}
          {activeView === 'comparator' && <CandidateComparatorView />}
          {activeView === 'admin' && <AdminPanelView />}
        </main>
      </div>

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
