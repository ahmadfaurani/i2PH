import React from 'react';
import { motion } from 'motion/react';
import { Code, Database, Share2, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const CanonicalSchema: React.FC = () => {
  const entities = [
    'Person', 'Device', 'Vehicle', 'Location', 'Incident', 
    'Communication', 'Organization', 'Account', 'EvidenceObject'
  ];

  const commonFields = [
    { name: 'primary_id', type: 'string', desc: 'Unique identifier across all systems' },
    { name: 'sensitivity_tier', type: 'Tier 1 | 2 | 3', desc: 'ABAC classification' },
    { name: 'source_provenance[]', type: 'Array<Source>', desc: 'Immutable origin trail' }
  ];

  const edgeTypes = [
    'USES_DEVICE', 'COMMUNICATED_WITH', 'OWNS_VEHICLE', 
    'PRESENT_AT', 'ASSOCIATED_WITH', 'LINKED_TO_CASE', 'MATCH_REFERENCE'
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto overflow-y-auto h-full">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Canonical Entity & Graph Schema</h2>
        <p className="text-slate-400 max-w-2xl">
          Standardized data models and relationship schemas for the PDRM Integrated Hub (I2PH).
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-pdrm-gold" />
            Canonical Entities
          </h3>
          <div className="glass-panel p-6">
            <div className="flex flex-wrap gap-2 mb-8">
              {entities.map(entity => (
                <span key={entity} className="px-3 py-1 bg-pdrm-blue/40 text-white text-[11px] font-bold rounded border border-pdrm-border">
                  {entity}
                </span>
              ))}
            </div>
            
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Common Fields (All Entities)</h4>
            <div className="space-y-3">
              {commonFields.map(field => (
                <div key={field.name} className="flex justify-between items-center py-2 border-b border-pdrm-border">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{field.name}</div>
                    <div className="text-[10px] text-slate-500">{field.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono text-pdrm-gold">{field.type}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-pdrm-blue/20 rounded border border-pdrm-gold/20">
              <h4 className="text-xs font-bold text-pdrm-gold uppercase mb-2 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                EvidenceObject Requirements
              </h4>
              <ul className="text-[10px] text-slate-400 space-y-1 list-disc pl-4">
                <li>hash_sha256 (Mandatory)</li>
                <li>chain_of_custody_ref (Mandatory)</li>
                <li>seizure_timestamp (Mandatory)</li>
                <li>immutable_flag (Boolean)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-500" />
            Graph Edge Schema
          </h3>
          <div className="glass-panel p-6">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded border border-pdrm-border">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Confidence Bands</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-emerald-500">High</span>
                    <span className="text-white">≥ 0.85</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-amber-500">Medium</span>
                    <span className="text-white">0.65 - 0.84</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-red-500">Low</span>
                    <span className="text-white">&lt; 0.65</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded border border-pdrm-border">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Edge Metadata</div>
                <ul className="text-[9px] text-slate-400 space-y-1">
                  <li>• provenance (source_id, record_id)</li>
                  <li>• created_timestamp</li>
                  <li>• revoked_flag</li>
                </ul>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Required Edge Types</h4>
            <div className="grid grid-cols-1 gap-2">
              {edgeTypes.map(type => (
                <div key={type} className="flex items-center gap-3 p-2 bg-pdrm-bg/50 rounded border border-pdrm-border group hover:border-blue-500/50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-white">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-emerald-500" />
          API Implementation
        </h3>
        <div className="glass-panel p-6 overflow-x-auto">
          <div className="grid grid-cols-4 gap-4 text-[10px] uppercase font-bold text-slate-500 mb-4 px-2">
            <div>Method</div>
            <div className="col-span-2">Endpoint</div>
            <div>Description</div>
          </div>
          <div className="space-y-2">
            {[
              { m: 'GET', e: '/api/canonical/:entity?query=', d: 'Search canonical entities' },
              { m: 'GET', e: '/api/graph/neighbors/:entityId', d: 'Fetch linked entities' },
              { m: 'POST', e: '/api/graph/edges/accept', d: 'Validate and save new link' },
              { m: 'POST', e: '/api/graph/edges/revoke', d: 'Mark relationship as invalid' }
            ].map(api => (
              <div key={api.e} className="grid grid-cols-4 gap-4 p-3 bg-white/5 rounded border border-pdrm-border items-center">
                <div>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[9px] font-bold",
                    api.m === 'GET' ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"
                  )}>{api.m}</span>
                </div>
                <div className="col-span-2 font-mono text-white text-[11px]">{api.e}</div>
                <div className="text-slate-400 text-[10px]">{api.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanonicalSchema;
