import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CanonicalSchema from './components/CanonicalSchema';
import DataSourceMap from './components/DataSourceMap';
import AIModelBlueprint from './components/AIModelBlueprint';
import InvestigatorWorkbench from './components/InvestigatorWorkbench';
import FusionStudio from './components/FusionStudio';
import GovernanceAudit from './components/GovernanceAudit';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, BarChart3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'canonical':
        return <CanonicalSchema />;
      case 'data-sources':
        return <DataSourceMap />;
      case 'ai-models':
        return <AIModelBlueprint />;
      case 'workbench':
        return <InvestigatorWorkbench />;
      case 'fusion':
        return <FusionStudio />;
      case 'governance':
        return <GovernanceAudit />;
      case 'ai-hub':
        return (
          <div className="p-8 h-screen flex flex-col items-center justify-center text-center">
            <BrainCircuit className="w-20 h-20 text-pdrm-gold mb-6 opacity-50" />
            <h2 className="text-3xl font-bold text-white mb-4">AI Services Hub</h2>
            <p className="text-slate-400 max-w-lg mb-8">
              Advanced AI capabilities including Federated Semantic Search, Cross-Case Link Analysis, and Triage Prioritization.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
              {['Semantic Search', 'Link Analysis', 'Auto-Briefing', 'Triage Engine'].map(service => (
                <div key={service} className="glass-panel p-6 text-left hover:border-pdrm-gold/50 transition-all cursor-pointer group">
                  <h4 className="font-bold text-white mb-2 group-hover:text-pdrm-gold">{service}</h4>
                  <p className="text-xs text-slate-500">Policy-aware AI processing governed by I2PH ABAC rules.</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'metrics':
        return (
          <div className="p-8 h-screen flex flex-col items-center justify-center text-center">
            <BarChart3 className="w-20 h-20 text-blue-500 mb-6 opacity-50" />
            <h2 className="text-3xl font-bold text-white mb-4">Success Metrics</h2>
            <p className="text-slate-400 max-w-lg">
              Real-time operational scorecards measuring time-to-insight, hit quality, and false-link rates across the PDRM estate.
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-pdrm-bg overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

