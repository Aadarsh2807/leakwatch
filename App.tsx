
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { AppView, LeakAnalysisReport, UserContext } from './types';
import { generateLeakReport } from './services/geminiService';

// --- Sub-components for Views ---

const LandingView: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-6">
    <div className="flex flex-col items-center gap-12 text-center max-w-4xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-[0.5em] transition-all duration-1000" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}>
          LeakWatch
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-primary/30"></div>
          <p className="text-white/50 text-xs md:text-sm font-light tracking-[0.4em] uppercase">
            Elite Personal Intelligence & Leak Detection
          </p>
          <div className="h-[1px] w-12 bg-primary/30"></div>
        </div>
      </div>
      <div className="mt-8">
        <button 
          onClick={onStart}
          className="group relative px-12 py-4 bg-primary text-white text-xs font-bold tracking-[0.3em] uppercase rounded-lg hover:scale-105 transition-all duration-500 overflow-hidden"
          style={{ boxShadow: '0 0 20px rgba(91, 19, 236, 0.4), inset 0 0 10px rgba(91, 19, 236, 0.3)' }}
        >
          <span className="relative z-10">Initialize Scan</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
        <p className="mt-6 text-[9px] text-white/20 tracking-[0.2em] uppercase italic">
          Securing genesis protocol...
        </p>
      </div>
    </div>
  </div>
);

const InputView: React.FC<{ onAnalyze: (email: string) => void }> = ({ onAnalyze }) => {
  const [email, setEmail] = useState('');
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div className="mb-12 text-center">
          <h1 className="text-white tracking-[0.3em] text-4xl font-bold uppercase mb-4">Identity Scan</h1>
          <p className="text-white/50 text-base font-light tracking-wide">Enter an email address to begin deep-web leak analysis.</p>
        </div>
        
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative shadow-[0_0_40px_rgba(91,19,236,0.1)]">
          <div className="absolute -top-3 left-8 px-2 bg-background-dark text-primary text-[10px] font-bold tracking-widest uppercase">
            Source Analysis Node
          </div>
          <div className="relative flex flex-col gap-6">
            <div className="relative group">
              <input 
                className="w-full bg-transparent border-none text-white text-2xl font-medium placeholder:text-white/10 focus:ring-0 p-0 mb-2 transition-all" 
                placeholder="intelligence@source.lock" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-0.5 mt-2 h-4 items-center">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-0.5 bg-cyan-accent opacity-30 transition-all duration-300" 
                    style={{ height: `${Math.random() * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <label className="flex items-center gap-4 cursor-pointer group select-none">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                />
                <div className="size-6 rounded border-2 border-white/20 peer-checked:border-primary peer-checked:bg-primary transition-all duration-300 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-white text-sm scale-0 peer-checked:scale-100 transition-transform">check</span>
                </div>
              </div>
              <span className="text-white/40 text-sm font-medium leading-relaxed group-hover:text-white/60 transition-colors">
                I authorize a secure scan of external repositories for my personal data.
              </span>
            </label>

            <button 
              disabled={!email || !authorized}
              onClick={() => onAnalyze(email)}
              className={`mt-4 w-full h-16 bg-primary text-white text-sm font-bold tracking-[0.2em] uppercase rounded-lg flex items-center justify-center gap-3 transition-all ${(!email || !authorized) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] shadow-[0_4px_0px_#3d0ba3,0_10px_20px_rgba(0,0,0,0.4)]'}`}
            >
              <span className="material-symbols-outlined">radar</span>
              Initiate Scan
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 w-full">
          {['Encryption', 'Neural Link', 'Global Nodes'].map((label, idx) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase">{label}</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i < (4 - idx) ? (idx === 1 ? 'bg-cyan-accent/50' : 'bg-primary') : 'bg-white/10'}`}></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScanningView: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-8">
      <div className="relative size-32">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 rounded-full border border-cyan-accent/20 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-4xl animate-pulse">radar</span>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-white text-xl font-bold tracking-[0.3em] uppercase mb-2">Analyzing Nodes</h2>
        <p className="text-white/40 text-[10px] tracking-widest uppercase animate-pulse">Accessing distributed data clusters...</p>
      </div>
    </div>
  </div>
);

const RiskProfileView: React.FC<{ report: LeakAnalysisReport; onNext: () => void }> = ({ report, onNext }) => (
  <div className="flex-1 flex flex-col items-center py-24 px-8 overflow-y-auto">
    <div className="relative z-10 flex flex-col items-center justify-center text-center mt-10 mb-20 w-full max-w-5xl">
      <div className="mb-2">
        <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">Security Index</span>
      </div>
      <div className="relative">
        <h1 className="text-[120px] md:text-[200px] font-bold leading-none tracking-tighter text-white select-none">
          {report.score}
        </h1>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div className="bg-primary/10 border border-primary/30 backdrop-blur-md px-6 py-2 rounded-full">
            <h2 className="text-primary text-xl md:text-2xl font-bold tracking-[0.2em] glow-trail whitespace-nowrap" style={{ textShadow: '0 0 20px rgba(91, 19, 236, 0.8)' }}>
              {report.intensity.toUpperCase()} EXPOSURE
            </h2>
          </div>
        </div>
      </div>
    </div>

    <section className="relative z-10 w-full max-w-5xl px-8 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
        <div className="md:col-start-1 md:col-span-7">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-primary/40 font-mono text-lg">01.</span>
            <h3 className="text-4xl font-bold tracking-tight text-white/90">Breach Frequency</h3>
          </div>
          <p className="text-xl text-white/50 leading-relaxed font-light">
            Your primary identity markers have been identified in <span className="text-white font-medium italic underline decoration-primary/50 underline-offset-4">{report.incidents.length} separate database leaks</span>. The aggregation of these datasets significantly increases the probability of a targeted attack.
          </p>
        </div>
        <div className="md:col-start-6 md:col-span-7">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-primary/40 font-mono text-lg">02.</span>
            <h3 className="text-4xl font-bold tracking-tight text-white/90">Mitigation Summary</h3>
          </div>
          <p className="text-xl text-white/50 leading-relaxed font-light">
            {report.mitigationSummary}
          </p>
        </div>
        <div className="md:col-start-2 md:col-span-6">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-primary/40 font-mono text-lg">03.</span>
            <h3 className="text-4xl font-bold tracking-tight text-white/90">Identity Surface</h3>
          </div>
          <p className="text-xl text-white/50 leading-relaxed font-light">
            Your digital surface area is currently <span className="text-primary font-medium">{report.exposureMapPercentage}% larger</span> than the safety threshold.
          </p>
        </div>
      </div>
    </section>

    <div className="fixed bottom-0 w-full bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent pt-20 pb-10 flex justify-center px-6 z-50">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full justify-between">
        <div className="flex items-center gap-4 text-white/40 italic">
          <span className="material-symbols-outlined">info</span>
          <span className="text-sm text-xs">Variant Generated Analysis</span>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-bold tracking-wide transition-all uppercase text-[10px]">
            Export Report
          </button>
          <button onClick={onNext} className="flex-1 md:flex-none px-12 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(91, 19, 236, 0.3)] uppercase text-[10px]">
            Detailed Log
          </button>
        </div>
      </div>
    </div>
  </div>
);

const DetailedReportView: React.FC<{ report: LeakAnalysisReport; onRemediate: () => void }> = ({ report, onRemediate }) => (
  <div className="flex-1 px-6 md:px-20 py-8 max-w-[1200px] mx-auto w-full overflow-y-auto pb-40">
    <div className="flex flex-col gap-1 mb-8">
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 mb-4">
        <span>Home</span>
        <span>/</span>
        <span>Breach Archive</span>
        <span>/</span>
        <span className="text-white font-bold">#REPORT-{Math.floor(Math.random()*10000)}</span>
      </nav>
      <div className="flex flex-wrap justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Detailed Breach Report</h1>
          <p className="text-white/50 font-medium text-lg">Clinical Forensic Analysis: Personal Data Integrity</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">download</span>
          Export Forensic Data
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="flex flex-col gap-3 rounded-xl p-8 bg-surface-dark border border-white/10 shadow-sm">
        <div className="flex justify-between items-start text-white/40 text-[10px] font-bold uppercase tracking-wider">
          <p>Exposure Score</p>
          <span className="material-symbols-outlined text-primary">analytics</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-black leading-none">{report.score}<span className="text-lg text-white/20 font-medium">/100</span></p>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
          <div className="bg-primary h-full" style={{ width: `${report.score}%` }}></div>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-xl p-8 bg-surface-dark border border-white/10 shadow-sm">
        <div className="flex justify-between items-start text-white/40 text-[10px] font-bold uppercase tracking-wider">
          <p>Compromised Records</p>
          <span className="material-symbols-outlined text-primary">database</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-black leading-none">{report.compromisedRecords.toLocaleString()}</p>
        </div>
        <p className="text-xs text-white/20">Total verified unique identities</p>
      </div>
      <div className="flex flex-col gap-3 rounded-xl p-8 bg-surface-dark border-2 border-primary shadow-[0_0_20px_2px_rgba(91,19,236,0.4)]">
        <div className="flex justify-between items-start text-white/40 text-[10px] font-bold uppercase tracking-wider">
          <p>Risk Intensity</p>
          <span className="material-symbols-outlined text-primary">radar</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-black leading-none">{report.intensity}</p>
        </div>
        <p className="text-xs text-primary font-bold animate-pulse">CRITICAL THRESHOLD REACHED</p>
      </div>
    </div>

    <div className="flex flex-col gap-6 relative border-l border-white/10 pl-8 md:pl-16">
      {report.incidents.map((incident, idx) => (
        <div key={incident.id} className="relative group">
          <div className="absolute left-[-36px] md:left-[-68px] top-10 size-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
          <div className="rounded-xl bg-surface-dark border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-primary tracking-[0.2em] mb-1">Incident ID: {incident.id}</span>
                <h3 className="text-xl font-bold">{incident.title}</h3>
                <p className="text-sm text-white/50 mt-1">{incident.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-white">{incident.date}</span>
                <span className="text-[10px] font-bold text-white/30">{incident.time}</span>
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              {incident.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">{tag}</span>
              ))}
              <span className={`px-2 py-1 rounded ${incident.severity === 'high' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-white/40'} text-[10px] font-bold uppercase border tracking-widest`}>
                {incident.severity.toUpperCase()} LUME
              </span>
            </div>
            <details className="group/detail border-t border-white/5 pt-4">
              <summary className="list-none cursor-pointer flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-primary transition-colors">
                View Clinical Metadata
                <span className="material-symbols-outlined transition-transform group-open/detail:rotate-180">expand_more</span>
              </summary>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-black/20 font-mono text-[10px] text-white/60">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>SOURCE ORIGIN</span>
                    <span className="text-primary">{incident.metadata.sourceOrigin}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>VECTOR TYPE</span>
                    <span>{incident.metadata.vectorType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>DATA FORMAT</span>
                    <span>{incident.metadata.dataFormat}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>LEAK DOMAIN</span>
                    <span>{incident.metadata.leakDomain}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>THREAT ACTOR</span>
                    <span className="text-primary">{incident.metadata.threatActor}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>VALIDITY</span>
                    <span className="text-green-500">{incident.metadata.validity}</span>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      ))}
      <button 
        onClick={onRemediate}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all mt-8"
      >
        <span className="material-symbols-outlined">security_update_good</span>
        Initiate Remediation Protocol
      </button>
    </div>
  </div>
);

const RemediationView: React.FC = () => {
  const [mitigation, setMitigation] = useState(62);
  const [resolved, setResolved] = useState([true, false, false, false]);

  const toggleResolved = (idx: number) => {
    const newResolved = [...resolved];
    newResolved[idx] = !newResolved[idx];
    setResolved(newResolved);
    setMitigation(Math.min(100, 62 + newResolved.filter(v => v).length * 9.5));
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-80 border-r border-white/5 flex flex-col p-8 bg-background-dark/20 backdrop-blur-sm hidden lg:flex">
        <div className="mb-10">
          <p className="text-white/40 text-[10px] font-medium mb-1 uppercase tracking-widest">Current Phase</p>
          <h3 className="text-white text-2xl font-light tracking-tight">Variant 5 <span className="text-white/30 text-lg">of 8</span></h3>
        </div>
        <div className="space-y-8">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <span className="text-white/60 text-xs uppercase tracking-widest">Overall Mitigation</span>
              <span className="text-primary text-sm font-bold">{Math.round(mitigation)}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${mitigation}%` }}></div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/5">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Status</p>
              <p className="text-white text-lg font-medium">Neutralizing</p>
              <p className="text-orange-500 text-[10px] mt-1 flex items-center gap-1 uppercase font-bold tracking-widest">
                <span className="material-symbols-outlined !text-[10px]">trending_down</span>
                -15% Risk Exposure
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Actions</p>
              <p className="text-white text-lg font-medium">{resolved.filter(v => v).length} / 4 Resolved</p>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex-1 flex flex-col overflow-y-auto items-center py-16 px-4 md:px-8 relative">
        <div className="max-w-2xl w-full">
          <div className="mb-12 text-center">
            <h1 className="text-white text-4xl font-light tracking-tight mb-4">Remediation Protocol</h1>
            <p className="text-white/50 text-base leading-relaxed">Sequence initiated. Execute the following countermeasures to isolate and neutralize detected personal data leaks.</p>
          </div>
          <div className="space-y-4">
            {[
              { id: 'revoke', title: 'Revoke Third-Party Access', desc: 'Terminate all active sessions and OAuth tokens connected to compromised vectors.', icon: 'link_off' },
              { id: 'password', title: 'Deploy Encrypted Credential Update', desc: 'Rotate high-entropy passwords for all affected primary accounts.', icon: 'password' },
              { id: 'mfa', title: 'Initialize Multi-Factor Authentication', icon: 'vibration', desc: 'Secure access points with hardware security keys or biometric verification.' },
              { id: 'darkweb', title: 'Monitor Dark Web Surface', icon: 'visibility', desc: 'Continuous scanning of illicit marketplaces for recurring PII leakage patterns.' }
            ].map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => toggleResolved(idx)}
                className={`group relative border rounded-xl p-6 transition-all cursor-pointer ${resolved[idx] ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(91,19,236,0.1)]' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}`}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 size-12 rounded-full border flex items-center justify-center transition-all ${resolved[idx] ? 'border-primary bg-primary/20 text-primary' : 'border-white/20 text-white/40'}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-lg font-medium transition-colors ${resolved[idx] ? 'text-white' : 'text-white/60'}`}>{item.title}</h4>
                      {resolved[idx] && <span className="text-primary text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border border-primary/30 rounded-full">Resolved</span>}
                    </div>
                    <p className={`text-sm leading-relaxed transition-colors ${resolved[idx] ? 'text-white/60' : 'text-white/30'}`}>{item.desc}</p>
                  </div>
                  {resolved[idx] && <span className="material-symbols-outlined text-primary !text-2xl animate-pulse">check_circle</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center text-white/20 text-[10px] tracking-widest uppercase gap-2 items-center">
            <span className="material-symbols-outlined !text-[10px]">info</span>
            Actions are performed sequentially to ensure total network isolation.
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<UserContext | null>(null);
  const [report, setReport] = useState<LeakAnalysisReport | null>(null);
  const [history, setHistory] = useState<LeakAnalysisReport[]>([]);

  const handleStartScan = () => setView('input');

  const handleAnalyze = async (email: string) => {
    setUser({ email, authorized: true, timestamp: new Date().toISOString() });
    setView('scanning');
    
    // Artificial delay for cinematic effect
    const [reportData] = await Promise.all([
      generateLeakReport(email),
      new Promise(resolve => setTimeout(resolve, 3000))
    ]);

    setReport(reportData);
    setHistory(prev => [reportData, ...prev]);
    setView('riskProfile');
  };

  return (
    <Layout currentView={view} setView={setView} hideHeader={view === 'landing'}>
      {view === 'landing' && <LandingView onStart={handleStartScan} />}
      {view === 'input' && <InputView onAnalyze={handleAnalyze} />}
      {view === 'scanning' && <ScanningView />}
      {view === 'riskProfile' && report && (
        <RiskProfileView report={report} onNext={() => setView('report')} />
      )}
      {view === 'report' && report && (
        <DetailedReportView report={report} onRemediate={() => setView('remediation')} />
      )}
      {view === 'remediation' && <RemediationView />}
      
      {view === 'entropy' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
           <div className="text-center mb-12">
            <h1 className="text-white tracking-[0.4em] text-xs font-bold uppercase mb-4">Structural Integrity Analysis</h1>
            <p className="text-white/40 text-[10px] tracking-widest uppercase">Password Security Neural Validator</p>
          </div>
          <div className="w-full max-w-xl space-y-12">
            <div className="relative group">
              <input 
                type="password" 
                className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary text-center text-4xl font-light tracking-[0.3em] pb-6 px-12 focus:outline-none transition-all placeholder:text-white/10"
                placeholder="••••••••••••"
              />
              <span className="material-symbols-outlined absolute right-0 top-2 text-white/20 hover:text-white cursor-pointer">visibility</span>
            </div>
            
            <div className="flex justify-center gap-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Complexity</span>
                <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-accent w-3/4 shadow-[0_0_8px_rgba(0,245,255,0.6)]"></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Uniqueness</span>
                <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2 shadow-[0_0_8px_rgba(91,19,236,0.6)]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-8">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-accent">Strength: Coherent</p>
                <p className="text-xs text-white/40">Meets elite standards.</p>
              </div>
              <button className="px-6 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-all">
                Generate Elite Password
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'history' && (
        <div className="flex-1 px-8 py-12 max-w-4xl mx-auto w-full overflow-y-auto">
          <div className="mb-12 border-l-2 border-primary pl-6">
            <h2 className="text-3xl font-bold tracking-tight uppercase tracking-[0.2em] mb-2">Chrono Audit</h2>
            <p className="text-white/40 text-sm">Historical deep-web scan archive.</p>
          </div>
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5"></div>
            {history.length === 0 ? (
              <p className="text-white/20 text-center py-20 uppercase tracking-[0.3em]">No scans logged in system.</p>
            ) : (
              history.map((h, i) => (
                <div key={i} className="relative pl-16 group">
                  <div className="absolute left-[20px] top-6 size-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <div 
                    onClick={() => { setReport(h); setView('report'); }}
                    className="bg-surface-dark/50 border border-white/5 p-6 rounded-xl hover:border-primary/40 transition-all cursor-pointer group-hover:-translate-x-1"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Scan Timestamp: {h.incidents[0]?.date}</span>
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Score: {h.score}</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Deep Web Scan Complete</h4>
                    <p className="text-white/40 text-sm line-clamp-2">{h.mitigationSummary}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {view === 'about' && (
        <div className="flex-1 px-8 md:px-20 py-20 max-w-[1200px] mx-auto w-full overflow-y-auto">
          <section className="mb-32">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Intelligence-Grade Security</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-reveal">
              Privacy is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Right</span>,<br/>Not a Feature.
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              Our approach to cybersecurity is rooted in total discretion. We operate with the silence that your security demands.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {[
              { label: 'Leaks Tracked', val: '2.4M+', icon: 'database_off' },
              { label: 'Scrubbed Points', val: '890k', icon: 'cleaning_services' },
              { label: 'Standard', val: 'AES-256', icon: 'verified_user' }
            ].map(m => (
              <div key={m.label} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl flex flex-col gap-4 border border-white/5 group hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">{m.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-1">{m.label}</p>
                  <p className="text-3xl font-bold">{m.val}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="max-w-3xl space-y-24 mb-40">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
                <span className="h-[1px] w-12 bg-primary/30"></span> Our Philosophy
              </h2>
              <p className="text-2xl md:text-3xl leading-relaxed font-light text-white/80">
                We believe that the most effective security is invisible. In an era of constant surveillance, 
                <span className="text-white font-medium"> true discretion</span> is the ultimate luxury and the most powerful defense.
              </p>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default App;
