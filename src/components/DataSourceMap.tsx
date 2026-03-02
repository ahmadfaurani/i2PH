import React from 'react';
import { INTEGRATION_MAP } from '../types';
import { motion } from 'motion/react';
import { Database, Zap, RefreshCw, ShieldCheck, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

const DataSourceMap: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto overflow-y-auto h-full">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Master Data Domain Integration Map</h2>
        <p className="text-slate-400 max-w-2xl">
          Structured integration model by domain, defining how PDRM data producers connect to the I2PH hub.
        </p>
      </header>

      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-12 bg-pdrm-blue/30 p-4 border-b border-pdrm-border text-[10px] uppercase tracking-wider font-bold text-slate-400">
          <div className="col-span-2">Domain</div>
          <div className="col-span-2">Source System Type</div>
          <div className="col-span-2">Integration Method</div>
          <div className="col-span-3">Transformation Required</div>
          <div className="col-span-3">AI Readiness Tier</div>
        </div>
        
        <div className="divide-y divide-pdrm-border">
          {INTEGRATION_MAP.map((row, idx) => (
            <motion.div 
              key={row.domain}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="grid grid-cols-12 p-4 items-center hover:bg-white/5 transition-colors"
            >
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Database className="w-3 h-3 text-pdrm-gold" />
                  <span className="font-bold text-white text-xs">{row.domain}</span>
                </div>
              </div>
              <div className="col-span-2 text-[11px] text-slate-400">{row.sourceType}</div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span className="text-[11px] text-blue-400 font-mono">{row.method}</span>
                </div>
              </div>
              <div className="col-span-3 text-[11px] text-slate-300 pr-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 text-emerald-500" />
                  <span>{row.transformation}</span>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-3 h-3 text-purple-500" />
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded font-bold border",
                    row.tier.includes('Tier 1') ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    row.tier.includes('Tier 2') ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  )}>
                    {row.tier}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Tier 1: High Readiness</h4>
          <p className="text-[11px] text-slate-400">Structured transactional data with high normalization potential. Ready for immediate AI ingestion and entity linking.</p>
        </div>
        <div className="glass-panel p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Tier 2: Managed Readiness</h4>
          <p className="text-[11px] text-slate-400">Requires significant preprocessing or edge-level transformation. Suitable for pattern detection and graph-ready formatting.</p>
        </div>
        <div className="glass-panel p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Tier 3: Restricted Readiness</h4>
          <p className="text-[11px] text-slate-400">Highly sensitive or unstructured data. Access restricted to controlled adapters with no raw data exposure.</p>
        </div>
      </div>
    </div>
  );
};

export default DataSourceMap;
