
import React from 'react';
import { Search, UserCircle, Bell } from 'lucide-react';
import ThemeToggle from '../temas/ThemeToggle';
import { useApp } from '../../store/AppContext';

const Header: React.FC = () => {
  const { user } = useApp();

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Pesquisar por aluno, professor ou sala..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold dark:text-slate-200">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role.toLowerCase()}</p>
          </div>
          <UserCircle size={32} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
