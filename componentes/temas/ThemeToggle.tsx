
import React from 'react';
import { useApp } from '../../store/AppContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
    </button>
  );
};

export default ThemeToggle;
