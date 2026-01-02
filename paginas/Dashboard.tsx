
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Users, GraduationCap, BookOpen, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Modal from '../componentes/ui/Modal';

const data = [
  { name: 'Jan', alunos: 400, evasao: 24 },
  { name: 'Fev', alunos: 420, evasao: 13 },
  { name: 'Mar', alunos: 450, evasao: 8 },
  { name: 'Abr', alunos: 480, evasao: 5 },
  { name: 'Mai', alunos: 510, evasao: 3 },
  { name: 'Jun', alunos: 505, evasao: 4 },
];

const Dashboard: React.FC = () => {
  const { theme, addAnoLetivo } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', dataInicio: '', dataFim: '', status: 'Aberto' as const });

  const stats = [
    { label: 'Total de Alunos', value: '505', icon: Users, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Professores', value: '42', icon: GraduationCap, color: 'bg-indigo-500', trend: '+2' },
    { label: 'Turmas Ativas', value: '28', icon: BookOpen, color: 'bg-emerald-500', trend: '0' },
    { label: 'Frequência Média', value: '94%', icon: TrendingUp, color: 'bg-orange-500', trend: '+1.5%' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnoLetivo(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Visão Geral da Instituição</h2>
          <p className="text-slate-500 dark:text-slate-400">Bem-vindo ao centro de comando educacional.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Exportar Dados</button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
          >
            Novo Ano Letivo
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Configurar Ano Letivo">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Ciclo</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Ano Letivo 2025"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Início</label>
              <input 
                required
                type="date" 
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                value={formData.dataInicio}
                onChange={e => setFormData({...formData, dataInicio: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Término</label>
              <input 
                required
                type="date" 
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                value={formData.dataFim}
                onChange={e => setFormData({...formData, dataFim: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Salvar Configuração
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Crescimento de Matrículas</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: theme === 'dark' ? '#475569' : '#e2e8f0', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
                />
                <Bar dataKey="alunos" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Taxa de Evasão Mensal</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                <Tooltip 
                   contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: theme === 'dark' ? '#475569' : '#e2e8f0', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
                />
                <Line type="monotone" dataKey="evasao" stroke="#f43f5e" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
