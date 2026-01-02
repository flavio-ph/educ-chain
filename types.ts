
export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  turma: string;
  status: 'Ativo' | 'Inativo';
  email: string;
}

export interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  email: string;
  status: 'Ativo' | 'Inativo';
}

export interface Turma {
  id: string;
  nome: string;
  serie: string;
  turno: 'Manhã' | 'Tarde' | 'Noite';
  professorId: string;
}

export interface AnoLetivo {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  status: 'Aberto' | 'Fechado';
}

export interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  data: string;
  prioridade: 'Baixa' | 'Média' | 'Alta';
  categoria: 'Institucional' | 'Evento' | 'Pedagógico';
}

export interface Horario {
  id: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  disciplina: string;
  professor: string;
  turmaId: string;
}

export interface AppState {
  theme: 'light' | 'dark';
  user: User | null;
  alunos: Aluno[];
  professores: Professor[];
  turmas: Turma[];
  horarios: Horario[];
  anosLetivos: AnoLetivo[];
  notificacoes: { id: string; mensagem: string; tipo: 'info' | 'success' | 'warning' }[];
}
