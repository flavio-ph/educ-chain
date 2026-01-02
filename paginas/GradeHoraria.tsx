
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Clock, Filter, Printer, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Modal from '../componentes/ui/Modal';

const GradeHoraria: React.FC = () => {
  const { turmas, professores, addHorario, horarios: gradeGlobal } = useApp();
  const [selectedTurma, setSelectedTurma] = useState(turmas[0]?.id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    diaSemana: 'Segunda',
    horaInicio: '07:30',
    horaFim: '08:20',
    disciplina: '',
    professor: '',
    turmaId: selectedTurma
  });

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const faixasHorarias = [
    '07:30 - 08:20',
    '08:20 - 09:10',
    '09:10 - 10:00',
    '10:20 - 11:10',
    '11:10 - 12:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHorario(formData);
    setIsModalOpen(false);
    setFormData({...formData, disciplina: ''});
  };

  const getAula = (dia: string, faixa: string) => {
    const [start] = faixa.split(' - ');
    return gradeGlobal.find(a => a.diaSemana === dia && a.horaInicio === start && a.turmaId === selectedTurma);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Grade Horária</h2>
          <p className="text-slate-500 dark:text-slate-400">Distribuição semanal de aulas.</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => window.print()} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"><Printer size={18} /></button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/25"
          >
            <Plus size={18} />
            <span>Adicionar Aula</span>
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agendar Aula">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dia</label>
              <select className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.diaSemana} onChange={e => setFormData({...formData, diaSemana: e.target.value})}>
                {dias.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Turma</label>
              <select className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.turmaId} onChange={e => setFormData({...formData, turmaId: e.target.value})}>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Professor</label>
            <select required className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.professor} onChange={e => setFormData({...formData, professor: e.target.value})}>
              <option value="">Selecione...</option>
              {professores.map(p => <option key={p.id} value={p.nome}>{p.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Disciplina</label>
            <input required type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.disciplina} onChange={e => setFormData({...formData, disciplina: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Início</label>
              <input type="time" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.horaInicio} onChange={e => setFormData({...formData, horaInicio: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fim</label>
              <input type="time" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" value={formData.horaFim} onChange={e => setFormData({...formData, horaFim: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">Salvar na Grade</button>
        </form>
      </Modal>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4">
        <select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm">
          {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
        </select>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-900 px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
          <button><ChevronLeft size={20} /></button>
          <span>1º Semestre 2024</span>
          <button><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              <th className="p-4 border-b border-r border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-400 uppercase w-32">Horário</th>
              {dias.map(dia => <th key={dia} className="p-4 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-center min-w-[150px]">{dia}</th>)}
            </tr>
          </thead>
          <tbody>
            {faixasHorarias.map((faixa, idx) => (
              <tr key={idx}>
                <td className="p-4 border-r border-b border-slate-100 dark:border-slate-700/50 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center bg-slate-50/30 dark:bg-slate-900/20">
                  <Clock size={14} className="mx-auto mb-1 opacity-50" />
                  {faixa}
                </td>
                {dias.map(dia => {
                  const aula = getAula(dia, faixa);
                  return (
                    <td key={dia} className="p-2 border-b border-slate-100 dark:border-slate-700/50">
                      {aula ? (
                        <div className="p-3 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm h-full">
                          <p className="text-sm font-bold dark:text-white truncate">{aula.disciplina}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold">{aula.professor}</p>
                        </div>
                      ) : (
                        <div className="h-full min-h-[60px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700/50 rounded-xl text-[10px] text-slate-300 dark:text-slate-600 uppercase font-bold">Livre</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeHoraria;
