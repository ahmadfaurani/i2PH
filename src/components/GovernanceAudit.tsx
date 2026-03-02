import React from 'react';
import { mockAuditLogs } from '../services/mockService';
import { ShieldCheck, Lock, History, FileCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const GovernanceAudit: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Governance & Audit Center</h2>
        <p className="text-slate-400 max-w-2xl">
          Ensuring lawful use, data minimization, and role-based access control through immutable audit trails and policy enforcement.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="text-emerald-500 w-4 h-4" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Access Policy</span>
          </div>
          <div className="text-2xl font-bold text-white">ABAC Active</div>
          <p className="text-[10px] text-slate-500 mt-1">Attribute-Based Access Control</p>
        </div>
        
        <div className="glass-panel p-6 border-l-4 border-l-pdrm-gold">
          <div className="flex items-center gap-3 mb-2">
            <History className="text-pdrm-gold w-4 h-4" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Audit Status</span>
          </div>
          <div className="text-2xl font-bold text-white">Immutable</div>
          <p className="text-[10px] text-slate-500 mt-1">WORM Storage Enabled</p>
        </div>

        <div className="glass-panel p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <FileCheck className="text-blue-500 w-4 h-4" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Compliance</span>
          </div>
          <div className="text-2xl font-bold text-white">100% Valid</div>
          <p className="text-[10px] text-slate-500 mt-1">Last Audit: 2h ago</p>
        </div>

        <div className="glass-panel p-6 border-l-4 border-l-red-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-500 w-4 h-4" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Anomalies</span>
          </div>
          <div className="text-2xl font-bold text-white">0 Detected</div>
          <p className="text-[10px] text-slate-500 mt-1">Real-time monitoring active</p>
        </div>
      </div>

      <div className="glass-panel">
        <div className="p-6 border-b border-pdrm-border flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            System Audit Trail
          </h3>
          <button className="text-[10px] font-bold text-pdrm-gold hover:underline uppercase">Export Court-Ready Log</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-pdrm-blue/20 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">Purpose</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pdrm-border">
              {mockAuditLogs.map((log, idx) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{log.timestamp}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white">{log.user}</td>
                  <td className="px-6 py-4 text-xs text-slate-300">{log.action}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{log.resource}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{log.purpose}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] px-2 py-1 rounded font-bold",
                      log.status === 'Success' ? "bg-emerald-500/10 text-emerald-500" : 
                      log.status === 'Denied' ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                    )}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernanceAudit;
