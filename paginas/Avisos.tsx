
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Bell, Megaphone, Calendar, Tag, Search, MoreVertical, Plus } from 'lucide-react';
import { Aviso } from '../types';

const Avisos: React.FC = () => {
  const { addNotification } = useApp();
  const [filter, setFilter] = useState<'Todos' | 'Institucional' | 'Evento' | 'Pedagógico'>('Todos');

  const avisos: Aviso[] = [
    {
      id: '1',
      titulo: 'Reunião de Pais e Mestres',
      conteudo: 'Convidamos todos os responsáveis para a reunião trimestral que ocorrerá no auditório principal às 19h.',
      data: '15 de Junho, 2024',
      prioridade: 'Alta',
      categoria: 'Evento'
    },
    {
      id: '2',
      titulo: 'Manutenção do Portal do Aluno',
      conteudo: 'O sistema ficará indisponível neste domingo das 02h às 06h para atualizações de segurança programadas.',
      data: '12 de Junho, 2024',
      prioridade: 'Média',
      categoria: 'Institucional'
    },
    {
      id: '3',
      titulo: 'Novas Datas de Provão Mensal',
      conteudo: 'Confira o calendário atualizado das avaliações do 2º bimestre na secretaria ou no mural de cada sala.',
      data: '10 de Junho, 2024',
      prioridade: 'Baixa',
      categoria: 'Pedagógico'
    },
    {
      id: '4',
      titulo: 'Campanha de Vacinação Escolar',
      conteudo: 'A secretaria de saúde realizará a atualização da caderneta de vacinação para alunos do ensino fundamental.',
      data: '08 de Junho, 2024',
      prioridade: 'Alta',
      categoria: 'Evento'
    }
  ];

  const filteredAvisos = filter === 'Todos' ? avisos : avisos.filter(a => a.categoria === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Mural de Avisos</h2>
          <p className="text-slate-500 dark:text-slate-400">Comunicações oficiais e eventos da instituição.</p>
        </div>
        <button 
          onClick={() => addNotification('Permissão necessária para publicar avisos', 'warning')}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25"
        >
          <Plus size={18} />
          <span>Novo Aviso</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar aviso por título ou palavra-chave..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
          {['Todos', 'Institucional', 'Evento', 'Pedagógico'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === cat 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAvisos.map((aviso) => (
          <div key={aviso.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${
              aviso.prioridade === 'Alta' ? 'bg-red-500' : 
              aviso.prioridade === 'Média' ? 'bg-amber-500' : 'bg-blue-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl ${
                aviso.categoria === 'Evento' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                aviso.categoria === 'Institucional' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              }`}>
                {aviso.categoria === 'Evento' ? <Megaphone size={20} /> : aviso.categoria === 'Institucional' ? <Bell size={20} /> : <Tag size={20} />}
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                <MoreVertical size={18} />
              </button>
            </div>

            <h3 className="text-lg font-bold dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">{aviso.titulo}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{aviso.conteudo}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Calendar size={14} />
                <span>{aviso.data}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                aviso.prioridade === 'Alta' ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 
                aviso.prioridade === 'Média' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 
                'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
              }`}>
                Prioridade {aviso.prioridade}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredAvisos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <Megaphone size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum aviso encontrado para esta categoria.</p>
        </div>
      )}
    </div>
  );
};

export default Avisos;
