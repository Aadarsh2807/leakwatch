
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  hideHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, hideHeader = false }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark text-white selection:bg-primary/30">
      <div className="noise-overlay" />
      <div className="fixed inset-0 radial-glow z-0" />
      <div className="particle-container z-0" />
      
      {!hideHeader && (
        <header className="relative z-50 flex items-center justify-between px-6 md:px-10 py-8 bg-background-dark/30 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM24 40C15.16 40 8 32.84 8 24C8 15.16 15.16 8 24 8C32.84 8 40 15.16 40 24C40 32.84 32.84 40 24 40Z" fill="currentColor" fillOpacity="0.2"></path>
                <path d="M24 12C17.37 12 12 17.37 12 24C12 30.63 17.37 36 24 36V12Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-sm font-bold tracking-[0.3em] uppercase">LeakWatch</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setView('history')}
              className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${currentView === 'history' ? 'text-primary' : 'text-white/40 hover:text-white'}`}
            >
              System Logs
            </button>
            <button 
              onClick={() => setView('about')}
              className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${currentView === 'about' ? 'text-primary' : 'text-white/40 hover:text-white'}`}
            >
              Protocol
            </button>
            <button 
              onClick={() => setView('input')}
              className="flex items-center gap-2 group"
            >
              <span className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${currentView === 'input' ? 'text-primary' : 'text-white/60 group-hover:text-primary'}`}>Access Console</span>
              <span className="material-symbols-outlined text-[14px] text-primary">terminal</span>
            </button>
          </div>
        </header>
      )}

      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>

      <footer className="relative z-10 flex items-end justify-between px-6 md:px-10 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
            <p className="text-[10px] text-white/60 tracking-[0.2em] font-medium uppercase">Encrypted Connection</p>
          </div>
          <p className="text-[9px] text-white/30 tracking-[0.1em] ml-3.5 hidden sm:block">256-BIT QUANTUM SHIELD ACTIVE</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-[10px] text-white/60 tracking-[0.2em] font-medium uppercase">V.1 Genesis</p>
          <div className="flex gap-4">
            <div 
              onClick={() => setView('entropy')}
              className="size-10 rounded border border-white/5 flex items-center justify-center hover:border-primary/40 transition-colors group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-white/20 group-hover:text-primary transition-colors">shield</span>
            </div>
            <div className="size-10 rounded border border-white/5 flex items-center justify-center hover:border-primary/40 transition-colors group">
              <span className="material-symbols-outlined text-[16px] text-white/20 group-hover:text-primary transition-colors">hub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
