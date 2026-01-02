
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { UserPlus, Filter, Download } from 'lucide-react';
import GenericTable from '../componentes/tabelas/GenericTable';
import { Aluno } from '../types';
import Modal from '../componentes/ui/Modal';

const Alunos: React.FC = () => {
  const { alunos, turmas, addAluno } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', matricula: '', turma: '', status: 'Ativo' as const });

  const filteredAlunos = alunos.filter(a => 
    a.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.matricula.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAluno(formData);
    setIsModalOpen(false);
    setFormData({ nome: '', email: '', matricula: '', turma: '', status: 'Ativo' });
  };

  const columns = [
    { header: 'Matrícula', accessor: 'matricula' as keyof Aluno },
    { 
      header: 'Aluno', 
      accessor: (aluno: Aluno) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            {aluno.nome.charAt(0)}
          </div>
          <div>
            <p className="font-medium dark:text-white">{aluno.nome}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{aluno.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Turma', accessor: 'turma' as keyof Aluno },
    { 
      header: 'Status', 
      accessor: (aluno: Aluno) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          aluno.status === 'Ativo' 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
        }`}>
          {aluno.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Gestão de Alunos</h2>
          <p className="text-slate-500 dark:text-slate-400">Total de {alunos.length} alunos matriculados.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
        >
          <UserPlus size={18} />
          <span>Matricular Aluno</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Matrícula">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Matrícula</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                value={formData.matricula}
                onChange={e => setFormData({...formData, matricula: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Turma</label>
              <select 
                required
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                value={formData.turma}
                onChange={e => setFormData({...formData, turma: e.target.value})}
              >
                <option value="">Selecione...</option>
                {turmas.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Finalizar Matrícula
          </button>
        </form>
      </Modal>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Filtrar por nome ou matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
        />
        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"><Filter size={18} /></button>
        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"><Download size={18} /></button>
      </div>

      <GenericTable data={filteredAlunos} columns={columns} />
    </div>
  );
};

export default Alunos;
