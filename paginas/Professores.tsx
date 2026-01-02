
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { UserPlus, Filter, Download, BookOpen, Mail } from 'lucide-react';
import GenericTable from '../componentes/tabelas/GenericTable';
import { Professor } from '../types';
import Modal from '../componentes/ui/Modal';

const Professores: React.FC = () => {
  const { professores, addProfessor } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', disciplina: '', status: 'Ativo' as const });

  const filteredProfessores = professores.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProfessor(formData);
    setIsModalOpen(false);
    setFormData({ nome: '', email: '', disciplina: '', status: 'Ativo' });
  };

  const columns = [
    { 
      header: 'Professor', 
      accessor: (prof: Professor) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold text-sm border border-amber-200 dark:border-amber-800">
            {prof.nome.charAt(0)}
          </div>
          <div>
            <p className="font-semibold dark:text-white">{prof.nome}</p>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2">
              <Mail size={12} />
              <span>{prof.email}</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      header: 'Disciplina', 
      accessor: (prof: Professor) => (
        <div className="flex items-center space-x-2">
          <BookOpen size={16} className="text-indigo-500" />
          <span className="font-medium dark:text-slate-200">{prof.disciplina}</span>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: (prof: Professor) => (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
          prof.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
        }`}>
          {prof.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Corpo Docente</h2>
          <p className="text-slate-500 dark:text-slate-400">Gerencie os professores e suas atribuições.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25"
        >
          <UserPlus size={18} />
          <span>Contratar Professor</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastro de Docente">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
            <input required type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-mail Corporativo</label>
            <input required type="email" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Disciplina Principal</label>
            <input required type="text" placeholder="Ex: Física Quântica" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.disciplina} onChange={e => setFormData({...formData, disciplina: e.target.value})} />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Confirmar Contratação
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="md:col-span-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
        <div className="flex space-x-2">
          <button className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center space-x-2"><Filter size={18} /><span>Filtros</span></button>
          <button className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800"><Download size={18} /></button>
        </div>
      </div>

      <GenericTable data={filteredProfessores} columns={columns} />
    </div>
  );
};

export default Professores;
