import React from 'react';
import { AI_MODEL_MAPPING } from '../types';
import { motion } from 'motion/react';
import { Brain, ShieldAlert, Network, MessageSquare, Activity, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

const AIModelBlueprint: React.FC = () => {
  const modelClasses = [
    {
      id: 'A',
      title: 'Knowledge Graph + Entity Resolution',
      icon: Network,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      features: [
        'Deterministic ID matching',
        'Probabilistic matching (Bayesian scoring)',
        'Graph embeddings for hidden link discovery',
        'Link explainability (provenance)'
      ]
    },
    {
      id: 'B',
      title: 'NLP Stack',
      icon: MessageSquare,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      features: [
        'Named Entity Recognition (NER)',
        'Topic modelling (LDA / BERTopic)',
        'Controlled summarization (RAG)',
        'Multi-language support (BM, EN, CN, TN)'
      ]
    },
    {
      id: 'C',
      title: 'Time-Series & Pattern Detection',
      icon: Activity,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      features: [
        'Isolation Forest / Autoencoder anomaly',
        'Seasonal pattern modelling',
        'Communication burst detection',
        'Risk scoring engines'
      ]
    },
    {
      id: 'D',
      title: 'Computer Vision',
      icon: Eye,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      features: [
        'Face recognition (Dual validation)',
        'Object detection (Plates, Patterns)',
        'Tracking consistency scoring',
        'Movement anomaly flags'
      ]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto overflow-y-auto h-full">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">AI Model Mapping & Classes</h2>
        <p className="text-slate-400 max-w-2xl">
          Structured AI modelling matrix across policing domains and core model classes for national-scale intelligence.
        </p>
      </header>

      <section className="mb-12">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-pdrm-gold" />
          Dataset → AI Model Mapping
        </h3>
        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-12 bg-pdrm-blue/30 p-4 border-b border-pdrm-border text-[10px] uppercase tracking-wider font-bold text-slate-400">
            <div className="col-span-2">Domain</div>
            <div className="col-span-2">Data Type</div>
            <div className="col-span-2">Model Type</div>
            <div className="col-span-3">Core Objective</div>
            <div className="col-span-2">Inference Output</div>
            <div className="col-span-1 text-center">Risk</div>
          </div>
          <div className="divide-y divide-pdrm-border">
            {AI_MODEL_MAPPING.map((row, idx) => (
              <motion.div 
                key={row.domain}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="grid grid-cols-12 p-4 items-center hover:bg-white/5 transition-colors"
              >
                <div className="col-span-2 font-bold text-white text-xs">{row.domain}</div>
                <div className="col-span-2 text-[11px] text-slate-400">{row.dataType}</div>
                <div className="col-span-2 text-[11px] text-pdrm-gold font-mono">{row.modelType}</div>
                <div className="col-span-3 text-[11px] text-slate-300 pr-4">{row.objective}</div>
                <div className="col-span-2 text-[11px] text-slate-400">{row.output}</div>
                <div className="col-span-1 flex justify-center">
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-bold border",
                    row.risk === 'Very High' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    row.risk === 'High' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  )}>
                    {row.risk}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-pdrm-gold" />
          AI Model Classes (By Function)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modelClasses.map((cls, idx) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="glass-panel p-6 flex flex-col h-full"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/5", cls.bg)}>
                <cls.icon className={cn("w-6 h-6", cls.color)} />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">{cls.id}. {cls.title}</h4>
              <div className="w-full h-px bg-pdrm-border my-4" />
              <ul className="space-y-3 flex-1">
                {cls.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className={cn("w-1 h-1 rounded-full mt-1.5", cls.color.replace('text-', 'bg-'))} />
                    <span className="text-[11px] text-slate-400 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIModelBlueprint;
