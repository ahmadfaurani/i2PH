import React, { useState } from 'react';
import { Search, User, Car, Smartphone, MapPin, AlertCircle, Link2, FileText, ChevronRight, Loader2, BrainCircuit } from 'lucide-react';
import { mockEntities, generateOperationalBrief } from '../services/mockService';
import { Entity } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

const InvestigatorWorkbench: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [brief, setBrief] = useState<string | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  const filteredEntities = mockEntities.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateBrief = async (entity: Entity) => {
    setIsGeneratingBrief(true);
    setBrief(null);
    const result = await generateOperationalBrief(entity.name);
    setBrief(result || "No brief generated.");
    setIsGeneratingBrief(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Person': return <User className="w-5 h-5" />;
      case 'Vehicle': return <Car className="w-5 h-5" />;
      case 'Device': return <Smartphone className="w-5 h-5" />;
      case 'Location': return <MapPin className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-8 h-screen flex flex-col">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Investigator Workbench</h2>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search across all PDRM systems (Name, IC, Plate, IMEI...)"
            className="w-full bg-pdrm-card border border-pdrm-border rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pdrm-gold/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Results List */}
        <div className="col-span-4 glass-panel overflow-y-auto p-4 space-y-4">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Search Results</span>
            <span className="text-[10px] font-mono text-pdrm-gold">{filteredEntities.length} FOUND</span>
          </div>
          {filteredEntities.map((entity) => (
            <button
              key={entity.id}
              onClick={() => { setSelectedEntity(entity); setBrief(null); }}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all group",
                selectedEntity?.id === entity.id
                  ? "bg-pdrm-blue/20 border-pdrm-gold/50"
                  : "bg-pdrm-bg/50 border-pdrm-border hover:border-slate-600"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  selectedEntity?.id === entity.id ? "bg-pdrm-gold/20 text-pdrm-gold" : "bg-slate-800 text-slate-400"
                )}>
                  {getIcon(entity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{entity.name}</h4>
                    <span className="text-[9px] font-mono text-slate-500">{entity.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{entity.source}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1 bg-pdrm-border rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${entity.confidence * 100}%` }} />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-500">{(entity.confidence * 100).toFixed(0)}% CONF</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Entity Detail View */}
        <div className="col-span-8 glass-panel overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {selectedEntity ? (
              <motion.div
                key={selectedEntity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-pdrm-blue/30 rounded-2xl flex items-center justify-center border border-pdrm-gold/30 text-pdrm-gold">
                      {getIcon(selectedEntity.type)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedEntity.name}</h3>
                      <p className="text-slate-400 text-sm">{selectedEntity.type} • {selectedEntity.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleGenerateBrief(selectedEntity)}
                      disabled={isGeneratingBrief}
                      className="flex items-center gap-2 bg-pdrm-gold text-pdrm-blue px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors disabled:opacity-50"
                    >
                      {isGeneratingBrief ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                      GENERATE BRIEF
                    </button>
                    <button className="p-2 bg-pdrm-border rounded-lg text-white hover:bg-slate-700 transition-colors">
                      <Link2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Core Attributes</h5>
                    <div className="space-y-3">
                      {Object.entries(selectedEntity.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-pdrm-border">
                          <span className="text-xs text-slate-400">{key}</span>
                          <span className="text-xs font-mono text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Linked Entities (Knowledge Graph)</h5>
                    <div className="space-y-2">
                      {mockEntities.filter(e => e.id !== selectedEntity.id).map(linked => (
                        <div key={linked.id} className="flex items-center justify-between p-3 bg-pdrm-bg/50 rounded-lg border border-pdrm-border">
                          <div className="flex items-center gap-3">
                            <div className="text-slate-500">{getIcon(linked.type)}</div>
                            <div>
                              <div className="text-xs font-bold text-white">{linked.name}</div>
                              <div className="text-[9px] text-slate-500">Direct Association</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {brief && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 p-6 bg-pdrm-blue/10 border border-pdrm-gold/20 rounded-xl"
                  >
                    <div className="flex items-center gap-2 mb-4 text-pdrm-gold">
                      <BrainCircuit className="w-5 h-5" />
                      <span className="font-bold text-sm">AI-Generated Operational Brief</span>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                      <ReactMarkdown>{brief}</ReactMarkdown>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>Select an entity from the results to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorWorkbench;
