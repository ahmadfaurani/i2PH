import React from 'react';
import { TOM_DATA } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Info, Database } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Target Operating Model Blueprint</h2>
        <p className="text-slate-400 max-w-2xl">
          The single-tabled blueprint for PDRM-wide integration, consolidating databases into a centralized, AI-managed information hub.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-12 bg-pdrm-blue/30 p-4 border-b border-pdrm-border text-[11px] uppercase tracking-wider font-bold text-slate-400">
            <div className="col-span-3">Layer</div>
            <div className="col-span-3">What It Must Do</div>
            <div className="col-span-3">Key Design Decisions</div>
            <div className="col-span-3">Concrete Outputs</div>
          </div>
          
          <div className="divide-y divide-pdrm-border">
            {TOM_DATA.map((row, idx) => (
              <motion.div 
                key={row.layer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-12 p-4 items-center hover:bg-white/5 transition-colors"
              >
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pdrm-gold" />
                    <span className="font-bold text-white text-sm">{row.layer}</span>
                  </div>
                </div>
                <div className="col-span-3 text-sm text-slate-300 pr-4">{row.function}</div>
                <div className="col-span-3 text-sm text-slate-400 pr-4">{row.decisions}</div>
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-2">
                    {row.outputs.split(';').map((output, i) => (
                      <span key={i} className="text-[10px] bg-pdrm-blue/40 text-pdrm-gold px-2 py-1 rounded border border-pdrm-gold/20">
                        {output.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="text-emerald-500 w-5 h-5" />
              </div>
              <h3 className="font-bold text-white">Data Lakehouse</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">Raw + Curated zones ensuring data integrity and quality for AI consumption.</p>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-pdrm-border rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>CURATED ZONE</span>
                <span>85% SYNCED</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pdrm-gold/10 rounded-lg">
                <Info className="text-pdrm-gold w-5 h-5" />
              </div>
              <h3 className="font-bold text-white">Knowledge Graph</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">Entity relationships mapped across all silos for rapid link analysis.</p>
            <div className="flex items-center gap-2 text-pdrm-gold text-xs font-bold">
              <span>EXPLORE GRAPH</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Database className="text-blue-500 w-5 h-5" />
              </div>
              <h3 className="font-bold text-white">Search Index</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">Unified search across Case Mgmt, CID, Traffic, and Immigration.</p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-mono font-bold text-white">12.4M</div>
                <div className="text-[9px] text-slate-500 uppercase">Records</div>
              </div>
              <div className="w-px h-8 bg-pdrm-border" />
              <div className="text-center">
                <div className="text-xl font-mono font-bold text-white">45ms</div>
                <div className="text-[9px] text-slate-500 uppercase">Latency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
