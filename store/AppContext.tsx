
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppState, Role, Aluno, Professor, Turma, Horario, AnoLetivo } from '../types';

interface AppContextProps extends AppState {
  toggleTheme: () => void;
  addNotification: (msg: string, type?: 'info' | 'success' | 'warning') => void;
  dismissNotification: (id: string) => void;
  addAluno: (aluno: Omit<Aluno, 'id'>) => void;
  addProfessor: (professor: Omit<Professor, 'id'>) => void;
  addHorario: (horario: Omit<Horario, 'id'>) => void;
  addAnoLetivo: (ano: Omit<AnoLetivo, 'id'>) => void;
  addTurma: (turma: Omit<Turma, 'id'>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('edu-theme');
    return (saved as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const [alunos, setAlunos] = useState<Aluno[]>([
    { id: '1', nome: 'Ana Silva', matricula: '2023001', turma: '9º Ano A', status: 'Ativo', email: 'ana@edu.com' },
  ]);

  const [professores, setProfessores] = useState<Professor[]>([
    { id: '1', nome: 'Marcos Oliveira', disciplina: 'Matemática', email: 'marcos@edu.com', status: 'Ativo' },
  ]);

  const [turmas, setTurmas] = useState<Turma[]>([
    { id: '1', nome: '9º Ano A', serie: '9º Ano', turno: 'Manhã', professorId: '1' },
  ]);

  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [anosLetivos, setAnosLetivos] = useState<AnoLetivo[]>([
    { id: '1', nome: '2024', dataInicio: '2024-02-01', dataFim: '2024-12-15', status: 'Aberto' }
  ]);

  const [notificacoes, setNotificacoes] = useState<AppState['notificacoes']>([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('edu-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(p => p === 'light' ? 'dark' : 'light'), []);

  const addNotification = useCallback((mensagem: string, tipo: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotificacoes(prev => [...prev, { id, mensagem, tipo }]);
    setTimeout(() => setNotificacoes(prev => prev.filter(n => n.id !== id)), 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id));
  }, []);

  const addAluno = (data: Omit<Aluno, 'id'>) => {
    setAlunos(prev => [...prev, { ...data, id: Date.now().toString() }]);
    addNotification('Aluno matriculado com sucesso!', 'success');
  };

  const addProfessor = (data: Omit<Professor, 'id'>) => {
    setProfessores(prev => [...prev, { ...data, id: Date.now().toString() }]);
    addNotification('Professor contratado com sucesso!', 'success');
  };

  const addHorario = (data: Omit<Horario, 'id'>) => {
    setHorarios(prev => [...prev, { ...data, id: Date.now().toString() }]);
    addNotification('Horário adicionado à grade!', 'success');
  };

  const addAnoLetivo = (data: Omit<AnoLetivo, 'id'>) => {
    setAnosLetivos(prev => [...prev, { ...data, id: Date.now().toString() }]);
    addNotification('Ano letivo configurado!', 'success');
  };

  const addTurma = (data: Omit<Turma, 'id'>) => {
    setTurmas(prev => [...prev, { ...data, id: Date.now().toString() }]);
    addNotification('Turma criada com sucesso!', 'success');
  };

  return (
    <AppContext.Provider value={{
      theme, user: { id: 'admin', name: 'Diretor Silva', email: 'diretor@edu.com', role: Role.ADMIN },
      alunos, professores, turmas, horarios, anosLetivos, notificacoes,
      toggleTheme, addNotification, dismissNotification,
      addAluno, addProfessor, addHorario, addAnoLetivo, addTurma
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
