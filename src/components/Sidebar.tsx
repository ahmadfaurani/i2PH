import React from 'react';
import { LayoutDashboard, Search, BrainCircuit, ShieldCheck, BarChart3, Database, Link2, FileText, Activity, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'TOM Blueprint', icon: LayoutDashboard },
    { id: 'canonical', label: 'Canonical Schema', icon: Database },
    { id: 'data-sources', label: 'Data Source Layer', icon: Database },
    { id: 'ai-models', label: 'AI Model Blueprint', icon: BrainCircuit },
    { id: 'workbench', label: 'Investigator Workbench', icon: Search },
    { id: 'fusion', label: 'Fusion Studio', icon: Share2 },
    { id: 'ai-hub', label: 'AI Services Hub', icon: BrainCircuit },
    { id: 'governance', label: 'Governance & Audit', icon: ShieldCheck },
    { id: 'metrics', label: 'Success Metrics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 h-screen bg-pdrm-card border-r border-pdrm-border flex flex-col">
      <div className="p-6 border-b border-pdrm-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pdrm-blue rounded-lg flex items-center justify-center border border-pdrm-gold/30">
            <ShieldCheck className="text-pdrm-gold w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">I2PH</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">PDRM Intel Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  activeTab === item.id
                    ? "bg-pdrm-blue/20 text-pdrm-gold border border-pdrm-gold/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  activeTab === item.id ? "text-pdrm-gold" : "text-slate-500 group-hover:text-slate-300"
                )} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-pdrm-border">
        <div className="bg-pdrm-bg/50 rounded-lg p-3 border border-pdrm-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] uppercase font-bold text-slate-500">System Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Data Ingestion</span>
              <span className="text-emerald-500">ACTIVE</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">AI Inference</span>
              <span className="text-emerald-500">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
