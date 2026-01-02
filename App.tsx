
import React, { useState } from 'react';
import { AppProvider } from './store/AppContext';
import Sidebar from './componentes/layout/Sidebar';
import Header from './componentes/layout/Header';
import Dashboard from './paginas/Dashboard';
import Alunos from './paginas/Alunos';
import Professores from './paginas/Professores';
import Turmas from './paginas/Turmas';
import GradeHoraria from './paginas/GradeHoraria';
import Avisos from './paginas/Avisos';
import { X } from 'lucide-react';
import { useApp } from './store/AppContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { notificacoes, dismissNotification } = useApp();

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'alunos': return <Alunos />;
      case 'professores': return <Professores />;
      case 'turmas': return <Turmas />;
      case 'horarios': return <GradeHoraria />;
      case 'avisos': return <Avisos />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl mb-4 transition-colors">
            <p className="text-4xl">🚧</p>
          </div>
          <h2 className="text-xl font-bold dark:text-white">Módulo em Construção</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Estamos trabalhando para trazer as melhores ferramentas para você.</p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
          >
            Voltar ao Dashboard
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors flex">
      <div className="fixed top-20 right-6 z-50 space-y-3 pointer-events-none">
        {notificacoes.map((n) => (
          <div 
            key={n.id} 
            className={`pointer-events-auto p-4 rounded-xl shadow-xl flex items-center justify-between min-w-[300px] border transform animate-in slide-in-from-right duration-300 ${
              n.tipo === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-800 dark:text-emerald-300' :
              n.tipo === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/40 dark:border-amber-800 dark:text-amber-300' :
              'bg-white border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            <span className="text-sm font-medium">{n.mensagem}</span>
            <button onClick={() => dismissNotification(n.id)} className="ml-4 hover:opacity-70 transition-opacity">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
        
        <footer className="p-6 text-center border-t border-slate-200 dark:border-slate-900 transition-colors">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            &copy; 2024 EduChain ERP - Sistema de Gestão Educacional Inteligente.
          </p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
