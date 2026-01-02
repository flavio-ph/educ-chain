
import React from 'react';
import { LayoutDashboard, Users, GraduationCap, Calendar, Settings, Bell, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alunos', label: 'Alunos', icon: Users },
    { id: 'professores', label: 'Professores', icon: GraduationCap },
    { id: 'turmas', label: 'Turmas', icon: BookOpen },
    { id: 'horarios', label: 'Grade Horária', icon: Calendar },
    { id: 'avisos', label: 'Avisos', icon: Bell },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col z-40 transition-colors">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">EduChain</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Escola de Gestão S.A.</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => onTabChange('config')}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all"
        >
          <Settings size={20} />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
