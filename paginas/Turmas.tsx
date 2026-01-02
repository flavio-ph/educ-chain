
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Plus, Filter, Download, BookOpen, Clock, UserCheck } from 'lucide-react';
import GenericTable from '../componentes/tabelas/GenericTable';
import { Turma } from '../types';
import Modal from '../componentes/ui/Modal';

const Turmas: React.FC = () => {
  const { turmas, professores, addTurma, addNotification } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Turma, 'id'>>({
    nome: '',
    serie: '',
    turno: 'Manhã',
    professorId: ''
  });

  const filteredTurmas = turmas.filter(t => 
    t.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.serie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProfessorName = (id: string) => {
    const prof = professores.find(p => p.id === id);
    return prof ? prof.nome : 'Não atribuído';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.professorId) {
      addNotification('Selecione um professor responsável', 'warning');
      return;
    }
    addTurma(formData);
    setIsModalOpen(false);
    setFormData({ nome: '', serie: '', turno: 'Manhã', professorId: '' });
  };

  const columns = [
    { 
      header: 'Turma / Série', 
      accessor: (turma: Turma) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-semibold dark:text-white">{turma.nome}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{turma.serie}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Período', 
      accessor: (turma: Turma) => (
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-slate-400" />
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
            turma.turno === 'Manhã' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400' :
            turma.turno === 'Tarde' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
            'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
          }`}>
            {turma.turno}
          </span>
        </div>
      )
    },
    { 
      header: 'Professor Responsável', 
      accessor: (turma: Turma) => (
        <div className="flex items-center space-x-2">
          <UserCheck size={16} className="text-emerald-500" />
          <span className="text-sm dark:text-slate-300">{getProfessorName(turma.professorId)}</span>
        </div>
      )
    },
    {
      header: 'Ações',
      className: 'text-right',
      accessor: () => (
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => addNotification('Visualizando detalhes da turma...', 'info')}
            className="px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
          >
            DETALHES
          </button>
          <button 
            className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-all"
          >
            ALUNOS
          </button>
        </div>
      )
    }
  ];

  const stats = [
    { label: 'Turno Manhã', count: turmas.filter(t => t.turno === 'Manhã').length, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { label: 'Turno Tarde', count: turmas.filter(t => t.turno === 'Tarde').length, color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
    { label: 'Turno Noite', count: turmas.filter(t => t.turno === 'Noite').length, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Gestão de Turmas</h2>
          <p className="text-slate-500 dark:text-slate-400">Organize as salas de aula e alocação de professores.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
        >
          <Plus size={18} />
          <span>Criar Nova Turma</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Turma">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Identificação (Nome)</label>
            <input 
              required
              type="text" 
              placeholder="Ex: 9º Ano B - 2024"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Série / Ciclo</label>
            <input 
              required
              type="text" 
              placeholder="Ex: 9º Ano"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
              value={formData.serie}
              onChange={e => setFormData({...formData, serie: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Turno</label>
              <select 
                required
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                value={formData.turno}
                onChange={e => setFormData({...formData, turno: e.target.value as any})}
              >
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Professor Responsável</label>
              <select 
                required
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                value={formData.professorId}
                onChange={e => setFormData({...formData, professorId: e.target.value})}
              >
                <option value="">Selecione...</option>
                {professores.map(p => (
                  <option key={p.id} value={p.id}>{p.nome} ({p.disciplina})</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 mt-2">
            Confirmar Criação
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Buscar por nome da turma ou série..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-all">
          <Filter size={18} />
          <span>Filtrar Série</span>
        </button>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-all">
          <Download size={18} />
          <span>Relatório</span>
        </button>
      </div>

      <GenericTable data={filteredTurmas} columns={columns} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${s.color}`}>
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">{s.label}</p>
              <p className="text-xl font-bold dark:text-white">{s.count} Turmas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Turmas;
