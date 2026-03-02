export interface Entity {
  id: string;
  type: 'Person' | 'Vehicle' | 'Device' | 'Location' | 'Incident';
  name: string;
  details: Record<string, string>;
  confidence: number;
  source: string;
}

export type SensitivityTier = 'Tier 1' | 'Tier 2' | 'Tier 3';

export interface SourceProvenance {
  source_id: string;
  record_id: string;
  timestamp: string;
}

export interface BaseEntity {
  primary_id: string;
  sensitivity_tier: SensitivityTier;
  source_provenance: SourceProvenance[];
}

export interface EvidenceObject extends BaseEntity {
  hash_sha256: string;
  chain_of_custody_ref: string;
  seizure_timestamp: string;
  immutable_flag: boolean;
}

export type EntityType = 'Person' | 'Device' | 'Vehicle' | 'Location' | 'Incident' | 'Communication' | 'Organization' | 'Account' | 'EvidenceObject';

export type EdgeType = 'USES_DEVICE' | 'COMMUNICATED_WITH' | 'OWNS_VEHICLE' | 'PRESENT_AT' | 'ASSOCIATED_WITH' | 'LINKED_TO_CASE' | 'MATCH_REFERENCE';

export type ConfidenceBand = 'High' | 'Medium' | 'Low';

export interface GraphEdge {
  edge_id: string;
  from_entity_id: string;
  to_entity_id: string;
  edge_type: EdgeType;
  confidence_score: number;
  confidence_band: ConfidenceBand;
  provenance: {
    source_id: string;
    record_id: string;
  };
  created_timestamp: string;
  revoked_flag: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  purpose: string;
  status: 'Success' | 'Denied' | 'Flagged';
}

export interface TOMRow {
  layer: string;
  function: string;
  decisions: string;
  outputs: string;
}

export const TOM_DATA: TOMRow[] = [
  { layer: 'A. Data Source Estate', function: 'Connect all PDRM data producers/consumers', decisions: 'Maintain source-of-truth ownership', outputs: 'Master source catalog; system owner registry' },
  { layer: 'B. Ingestion Fabric', function: 'Move data reliably (batch + real-time)', decisions: 'Use CDC; event streaming; schema versioning', outputs: 'Connectors, pipelines, lineage' },
  { layer: 'C. Canonical Data Model', function: 'Standardize entities and relationships', decisions: 'Define core entities: Person, Device, Vehicle, etc.', outputs: 'Canonical schema + mapping rules' },
  { layer: 'D. Identity Resolution', function: 'Deduplicate and link records', decisions: 'Deterministic + probabilistic matching', outputs: 'Golden record IDs; confidence scoring' },
  { layer: 'E. Governance & Access', function: 'Ensure lawful use, role-based access', decisions: 'Zero Trust + ABAC; purpose limitation', outputs: 'Policy engine; audit trails' },
  { layer: 'F. AI Services Layer', function: 'Provide AI on governed data', decisions: 'AI must be policy-aware', outputs: 'Search assistant, summarization' },
  { layer: 'G. Analyst Workflows', function: 'Make it operationally useful', decisions: 'Build investigator workbench', outputs: 'Dashboards, automated briefs' },
  { layer: 'H. Evidence Readiness', function: 'Preserve evidentiary integrity', decisions: 'WORM/immutable; provenance + hashing', outputs: 'Chain-of-custody ledger' },
  { layer: 'I. Resilience', function: 'Ensure uptime, disaster recovery', decisions: 'Multi-site DR; immutable backups', outputs: 'DR playbooks; monitoring' },
  { layer: 'J. Success Metrics', function: 'Prove outcomes empirically', decisions: 'Measure time-to-insight, hit quality', outputs: 'KPI pack; operational scorecards' },
];

export interface IntegrationMap {
  domain: string;
  sourceType: string;
  method: string;
  transformation: string;
  tier: string;
}

export const INTEGRATION_MAP: IntegrationMap[] = [
  { domain: 'Case Management', sourceType: 'RDBMS', method: 'CDC + API', transformation: 'Canonical crime schema', tier: 'Tier 1' },
  { domain: 'Criminal Intelligence', sourceType: 'Hybrid DB + files', method: 'Secure ETL + encryption', transformation: 'Entity extraction + classification', tier: 'Tier 1' },
  { domain: 'Arrest & Custody', sourceType: 'Transactional DB', method: 'CDC', transformation: 'Person entity normalization', tier: 'Tier 1' },
  { domain: 'CDR (Telco Data)', sourceType: 'Batch files + API', method: 'Streaming ingestion', transformation: 'Graph-ready format', tier: 'Tier 2' },
  { domain: 'Vehicle Registry', sourceType: 'Structured DB', method: 'API', transformation: 'Vehicle entity standardization', tier: 'Tier 1' },
  { domain: 'Immigration Movement', sourceType: 'Structured DB', method: 'Secure gateway', transformation: 'Person-location mapping', tier: 'Tier 2' },
  { domain: 'Biometric Systems', sourceType: 'Template DB', method: 'Controlled adapter', transformation: 'Hash indexing only', tier: 'Tier 3 (restricted)' },
  { domain: 'CCTV Systems', sourceType: 'Video + metadata', method: 'Edge preprocessing', transformation: 'Metadata extraction only', tier: 'Tier 2' },
  { domain: 'Financial Intelligence', sourceType: 'Structured time-series', method: 'Secure ETL', transformation: 'Transaction schema normalization', tier: 'Tier 2' },
  { domain: 'Digital Forensics', sourceType: 'File systems', method: 'Controlled import', transformation: 'Artifact metadata extraction', tier: 'Tier 2' },
];
export interface AIModelMapping {
  domain: string;
  dataType: string;
  modelType: string;
  objective: string;
  output: string;
  risk: 'Medium' | 'High' | 'Very High';
}

export const AI_MODEL_MAPPING: AIModelMapping[] = [
  { domain: 'Criminal Case Records', dataType: 'Structured + narrative', modelType: 'NLP + Classification', objective: 'Auto-categorize crime types', output: 'Case similarity score', risk: 'Medium' },
  { domain: 'Investigation Reports', dataType: 'Long-form text', modelType: 'LLM summarization', objective: 'Generate investigation briefs', output: 'Structured summary', risk: 'Medium' },
  { domain: 'Call Detail Records (CDR)', dataType: 'Graph/time-series', modelType: 'Graph ML', objective: 'Identify communication clusters', output: 'Network map + anomaly score', risk: 'High' },
  { domain: 'Vehicle Registry', dataType: 'Structured', modelType: 'Entity Resolution', objective: 'Detect vehicle associations', output: 'Link confidence score', risk: 'Medium' },
  { domain: 'Biometric', dataType: 'Image + template', modelType: 'CV model', objective: 'Identity verification', output: 'Match probability', risk: 'Very High' },
  { domain: 'CCTV Metadata', dataType: 'Time-series + object', modelType: 'CV + Object Tracking', objective: 'Movement pattern detection', output: 'Trajectory + anomaly flag', risk: 'High' },
  { domain: 'Financial Transaction', dataType: 'Structured time-series', modelType: 'Anomaly Detection', objective: 'Detect suspicious patterns', output: 'Risk index', risk: 'High' },
  { domain: 'Digital Evidence', dataType: 'File metadata', modelType: 'Classification', objective: 'Identify known artifacts', output: 'Artifact match classification', risk: 'Medium' },
  { domain: 'Arrest Records', dataType: 'Structured', modelType: 'Predictive trend modelling', objective: 'Identify recidivism patterns', output: 'Risk pattern', risk: 'High' },
  { domain: 'Social Network Data', dataType: 'Graph + text', modelType: 'Sentiment + Narrative', objective: 'Identify coordinated campaigns', output: 'Narrative cluster score', risk: 'Very High' },
];

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  domain: string;
  source: string;
  confidence: number;
  hasConflict?: boolean;
}

export interface GeoPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: string;
  timestamp: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  content: string;
  handlingCode: string;
  source: string;
  redacted?: boolean;
}

export const MOCK_TIMELINE: TimelineEvent[] = [
  { id: 'T1', timestamp: '2026-02-27 08:00:00', title: 'Vehicle Spotted', description: 'WYY 1234 identified at KLCC intersection.', domain: 'Traffic', source: 'CCTV-KL-04', confidence: 0.95 },
  { id: 'T2', timestamp: '2026-02-27 08:15:00', title: 'Communication Burst', description: 'High frequency calls between P-8821 and P-9901.', domain: 'Telco', source: 'CDR-Gateway', confidence: 0.88 },
  { id: 'T3', timestamp: '2026-02-27 09:30:00', title: 'Financial Transaction', description: 'MYR 50,000 transfer from unknown offshore account.', domain: 'Finance', source: 'Bank-Audit', confidence: 0.72, hasConflict: true },
  { id: 'T4', timestamp: '2026-02-27 10:00:00', title: 'Device Activation', description: 'IMEI 3567... active in Bukit Bintang.', domain: 'Telco', source: 'Cell-Tower-B1', confidence: 0.91 },
];

export const MOCK_DOCUMENTS: DocumentRecord[] = [
  { id: 'DOC-001', title: 'Investigation Report: Op Wira', content: 'The suspect was observed meeting with known associates at the specified location. Surveillance indicates a high probability of coordination.', handlingCode: 'RESTRICTED', source: 'CID-Intel' },
  { id: 'DOC-002', title: 'Surveillance Log: KLCC Area', content: 'Target entered the building at 08:45. No visible items carried. Exited via rear entrance at 09:15.', handlingCode: 'CONFIDENTIAL', source: 'Field-Ops' },
  { id: 'DOC-003', title: 'Financial Audit: Account X-99', content: 'Suspicious layering patterns detected. Multiple small transfers followed by a large lump sum withdrawal.', handlingCode: 'SECRET', source: 'AMLA-Unit' },
];
