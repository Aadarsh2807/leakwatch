
export type AppView = 'landing' | 'input' | 'scanning' | 'riskProfile' | 'report' | 'remediation' | 'entropy' | 'history' | 'about';

export interface BreachIncident {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  severity: 'high' | 'mid' | 'low';
  tags: string[];
  metadata: {
    sourceOrigin: string;
    vectorType: string;
    dataFormat: string;
    leakDomain: string;
    threatActor: string;
    validity: string;
    traceId?: string;
  };
}

export interface LeakAnalysisReport {
  score: number;
  compromisedRecords: number;
  intensity: 'High Lume' | 'Moderate' | 'Low';
  incidents: BreachIncident[];
  mitigationSummary: string;
  exposureMapPercentage: number;
}

export interface UserContext {
  email: string;
  authorized: boolean;
  timestamp: string;
}
