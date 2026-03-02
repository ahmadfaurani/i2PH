import React, { useState, useEffect, useRef } from 'react';
import { 
  Share2, 
  Clock, 
  Map as MapIcon, 
  FileText, 
  Filter, 
  AlertTriangle, 
  Shield, 
  Download, 
  FileCheck,
  ChevronRight,
  Info,
  Maximize2,
  Lock,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3';
import { cn } from '../lib/utils';
import { 
  MOCK_TIMELINE, 
  MOCK_DOCUMENTS, 
  TimelineEvent, 
  DocumentRecord 
} from '../types';

// --- Graph View Component ---
const GraphView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedEdge, setSelectedEdge] = useState<any>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 500;

    const nodes = [
      { id: 'P-8821', label: 'Ahmad Ibrahim', type: 'Person' },
      { id: 'V-4492', label: 'WYY 1234', type: 'Vehicle' },
      { id: 'D-1102', label: 'iPhone 15', type: 'Device' },
      { id: 'L-501', label: 'KLCC Tower', type: 'Location' },
      { id: 'E-99', label: 'Op Wira', type: 'Event' },
    ];

    const links = [
      { source: 'P-8821', target: 'V-4492', type: 'OWNS_VEHICLE', confidence: 0.98, rationale: 'Registered owner in JPJ database' },
      { source: 'P-8821', target: 'D-1102', type: 'USES_DEVICE', confidence: 0.85, rationale: 'IMEI linked to IC via telco logs' },
      { source: 'D-1102', target: 'L-501', type: 'PRESENT_AT', confidence: 0.91, rationale: 'Cell tower triangulation' },
      { source: 'P-8821', target: 'E-99', type: 'ASSOCIATED_WITH', confidence: 0.75, rationale: 'Named in investigation report' },
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#2D343F")
      .attr("stroke-width", 2)
      .attr("class", "cursor-pointer hover:stroke-blue-500 transition-colors")
      .on("click", (event, d) => setSelectedEdge(d));

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#151921")
      .attr("stroke", (d: any) => {
        if (d.type === 'Person') return '#D4AF37';
        if (d.type === 'Vehicle') return '#3B82F6';
        if (d.type === 'Device') return '#10B981';
        return '#64748B';
      })
      .attr("stroke-width", 2);

    node.append("text")
      .text((d: any) => d.label)
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .attr("fill", "#94A3B8")
      .attr("font-size", "10px")
      .attr("font-weight", "bold");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, []);

  return (
    <div className="relative w-full h-full flex">
      <div className="flex-1 bg-pdrm-bg/30 rounded-xl border border-pdrm-border overflow-hidden">
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" />
      </div>
      
      <AnimatePresence>
        {selectedEdge && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-80 ml-6 glass-panel p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Edge Provenance</h4>
              <button onClick={() => setSelectedEdge(null)} className="text-slate-500 hover:text-white">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-slate-500 uppercase mb-1">Relationship</div>
                <div className="text-sm font-bold text-pdrm-gold">{selectedEdge.type}</div>
              </div>
              
              <div>
                <div className="text-[10px] text-slate-500 uppercase mb-1">Rationale</div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedEdge.rationale}</p>
              </div>
              
              <div>
                <div className="text-[10px] text-slate-500 uppercase mb-1">Confidence Score</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-pdrm-border rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${selectedEdge.confidence * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono text-emerald-500">{(selectedEdge.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="p-4 bg-pdrm-blue/20 rounded border border-pdrm-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold text-white">Source Verification</span>
                </div>
                <div className="text-[10px] text-slate-400">Verified against JPN & Telco Master Registry. Last sync: 2h ago.</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Timeline View Component ---
const TimelineView: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const filteredEvents = filter === 'All' ? MOCK_TIMELINE : MOCK_TIMELINE.filter(e => e.domain === filter);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {['All', 'Traffic', 'Telco', 'Finance'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1 rounded text-[10px] font-bold transition-all",
                filter === f ? "bg-pdrm-gold text-pdrm-blue" : "bg-pdrm-card text-slate-400 border border-pdrm-border"
              )}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[10px]">
          <Filter className="w-3 h-3" />
          <span>CONFIDENCE &gt; 70%</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {filteredEvents.map((event, idx) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8 pb-8 border-l border-pdrm-border last:border-0"
          >
            <div className={cn(
              "absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-pdrm-bg",
              event.hasConflict ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-pdrm-gold"
            )} />
            
            <div className="glass-panel p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 mb-1">{event.timestamp}</div>
                  <h5 className="font-bold text-white text-sm">{event.title}</h5>
                </div>
                <span className="text-[9px] px-2 py-0.5 bg-pdrm-blue/40 text-blue-400 rounded border border-blue-500/20 uppercase">
                  {event.source}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{event.description}</p>
              
              {event.hasConflict && (
                <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-400">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Source Conflict: Bank-Audit disagrees with Field-Ops reports.</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Geo View Component ---
const GeoView: React.FC = () => {
  return (
    <div className="h-full relative overflow-hidden rounded-xl border border-pdrm-border bg-pdrm-card">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 500">
          <path d="M100,100 L200,150 L300,120 L400,200 L500,180 L600,250 L700,220" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M50,300 L150,350 L250,320 L350,400 L450,380 L550,450 L650,420" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="40" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="550" cy="450" r="60" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Map Markers */}
      <div className="absolute inset-0 p-8">
        <div className="absolute top-[30%] left-[25%] group cursor-pointer">
          <div className="w-4 h-4 bg-pdrm-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
          <div className="hidden group-hover:block absolute top-6 left-0 bg-pdrm-card p-2 rounded border border-pdrm-border text-[10px] whitespace-nowrap z-10">
            <div className="font-bold text-white">KLCC Intersection</div>
            <div className="text-slate-500">3 Vehicles Detected</div>
          </div>
        </div>

        <div className="absolute top-[60%] left-[65%] group cursor-pointer">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          <div className="hidden group-hover:block absolute top-6 left-0 bg-pdrm-card p-2 rounded border border-pdrm-border text-[10px] whitespace-nowrap z-10">
            <div className="font-bold text-white">Bukit Bintang Hub</div>
            <div className="text-slate-500">Device Signal Cluster</div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="p-2 bg-pdrm-card border border-pdrm-border rounded-lg text-white hover:bg-slate-800 transition-all">
          <Maximize2 className="w-4 h-4" />
        </button>
        <button className="p-2 bg-pdrm-card border border-pdrm-border rounded-lg text-white hover:bg-slate-800 transition-all">
          <Layers className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 glass-panel p-4 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <MapIcon className="w-4 h-4 text-pdrm-gold" />
          <span className="text-[10px] font-bold text-white uppercase">Movement Patterns</span>
        </div>
        <p className="text-[10px] text-slate-400 mb-3">Authorized-only datasets active. Showing anonymized movement clusters for Op Wira.</p>
        <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
          <span>SYNC: REAL-TIME</span>
          <span className="text-emerald-500">ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

// --- Document View Component ---
const DocumentView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(MOCK_DOCUMENTS[0]);
  const [isRedacted, setIsRedacted] = useState(true);

  return (
    <div className="h-full flex gap-6">
      <div className="w-80 flex flex-col gap-3">
        {MOCK_DOCUMENTS.map(doc => (
          <button 
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className={cn(
              "text-left p-4 rounded-lg border transition-all",
              selectedDoc?.id === doc.id ? "bg-pdrm-blue/20 border-pdrm-gold/50" : "bg-pdrm-card border-pdrm-border hover:border-slate-600"
            )}
          >
            <div className="text-[10px] font-mono text-slate-500 mb-1">{doc.id}</div>
            <h5 className="font-bold text-white text-xs mb-2">{doc.title}</h5>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-500">{doc.source}</span>
              <span className="text-[9px] font-bold text-pdrm-gold">{doc.handlingCode}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 glass-panel p-8 relative overflow-hidden flex flex-col">
        {selectedDoc ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{selectedDoc.title}</h4>
                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                  <span>SOURCE: {selectedDoc.source}</span>
                  <span>HANDLING: {selectedDoc.handlingCode}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsRedacted(!isRedacted)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[10px] transition-all",
                  isRedacted ? "bg-pdrm-gold text-pdrm-blue" : "bg-pdrm-border text-white"
                )}
              >
                <Shield className="w-3 h-3" />
                {isRedacted ? 'DISABLE REDACTION' : 'ENABLE REDACTION'}
              </button>
            </div>

            <div className="flex-1 bg-white/5 rounded-lg p-8 font-mono text-sm leading-relaxed text-slate-300 relative">
              {isRedacted ? (
                <div className="space-y-4">
                  <p>The suspect <span className="bg-white/10 text-transparent select-none px-2 rounded">REDACTED_NAME</span> was observed meeting with known associates at <span className="bg-white/10 text-transparent select-none px-2 rounded">REDACTED_LOCATION</span>. Surveillance indicates a high probability of coordination.</p>
                  <p>Target entered the building at <span className="bg-white/10 text-transparent select-none px-2 rounded">REDACTED_TIME</span>. No visible items carried. Exited via rear entrance at <span className="bg-white/10 text-transparent select-none px-2 rounded">REDACTED_TIME</span>.</p>
                  <p>Suspicious layering patterns detected. Multiple small transfers followed by a large lump sum withdrawal of <span className="bg-white/10 text-transparent select-none px-2 rounded">REDACTED_AMOUNT</span>.</p>
                </div>
              ) : (
                <p>{selectedDoc.content}</p>
              )}
              
              {isRedacted && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <div className="text-6xl font-bold rotate-[-45deg] border-8 border-white p-8">CONFIDENTIAL</div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                <FileCheck className="w-3 h-3" />
                VERIFY PROVENANCE
              </button>
              <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                <Download className="w-3 h-3" />
                EXPORT PDF
              </button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select a document to view
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Fusion Studio Component ---
const FusionStudio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('graph');

  const subTabs = [
    { id: 'graph', label: 'Graph View', icon: Share2 },
    { id: 'timeline', label: 'Timeline View', icon: Clock },
    { id: 'geo', label: 'Geo View', icon: MapIcon },
    { id: 'document', label: 'Document View', icon: FileText },
  ];

  return (
    <div className="p-8 h-screen flex flex-col">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Fusion Studio</h2>
          <p className="text-slate-400 max-w-2xl">
            Analyst Workbench for building intelligence outcomes from multi-source agent outputs.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-pdrm-blue/40 border border-pdrm-gold/30 text-pdrm-gold px-4 py-2 rounded-lg font-bold text-xs hover:bg-pdrm-gold hover:text-pdrm-blue transition-all">
            <FileText className="w-4 h-4" />
            LEAD SHEET BUILDER
          </button>
          <button className="flex items-center gap-2 bg-pdrm-gold text-pdrm-blue px-4 py-2 rounded-lg font-bold text-xs hover:bg-white transition-all">
            <FileCheck className="w-4 h-4" />
            FUSION REPORT
          </button>
          <div className="w-px h-8 bg-pdrm-border mx-2" />
          <button className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
            <Lock className="w-4 h-4" />
            EVIDENCE EXPORT
          </button>
        </div>
      </header>

      <div className="flex gap-4 mb-6 border-b border-pdrm-border">
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-xs font-bold transition-all relative",
              activeSubTab === tab.id ? "text-pdrm-gold" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label.toUpperCase()}
            {activeSubTab === tab.id && (
              <motion.div 
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-pdrm-gold"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeSubTab === 'graph' && <GraphView />}
            {activeSubTab === 'timeline' && <TimelineView />}
            {activeSubTab === 'geo' && <GeoView />}
            {activeSubTab === 'document' && <DocumentView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FusionStudio;
