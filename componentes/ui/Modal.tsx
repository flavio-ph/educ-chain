
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
