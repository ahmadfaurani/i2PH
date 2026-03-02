import express from "express";
import { createServer as createViteServer } from "vite";
import { 
  BaseEntity, 
  GraphEdge, 
  EntityType, 
  EdgeType, 
  ConfidenceBand,
  EvidenceObject
} from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data
  const mockEntities: Record<string, BaseEntity[]> = {
    'Person': [
      {
        primary_id: 'P-1001',
        sensitivity_tier: 'Tier 1',
        source_provenance: [{ source_id: 'JPN', record_id: 'REC-001', timestamp: new Date().toISOString() }]
      }
    ],
    'EvidenceObject': [
      {
        primary_id: 'E-5001',
        sensitivity_tier: 'Tier 2',
        source_provenance: [{ source_id: 'FORENSICS', record_id: 'F-99', timestamp: new Date().toISOString() }],
        hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        chain_of_custody_ref: 'COC-2026-001',
        seizure_timestamp: new Date().toISOString(),
        immutable_flag: true
      } as EvidenceObject
    ]
  };

  const mockEdges: GraphEdge[] = [
    {
      edge_id: 'EDGE-001',
      from_entity_id: 'P-1001',
      to_entity_id: 'V-2001',
      edge_type: 'OWNS_VEHICLE',
      confidence_score: 0.95,
      confidence_band: 'High',
      provenance: { source_id: 'JPJ', record_id: 'OWN-123' },
      created_timestamp: new Date().toISOString(),
      revoked_flag: false
    }
  ];

  // Validation helper
  const validateEntity = (type: EntityType, entity: any) => {
    const commonFields = ['primary_id', 'sensitivity_tier', 'source_provenance'];
    for (const field of commonFields) {
      if (!entity[field]) return { valid: false, error: `Missing common field: ${field}` };
    }
    if (type === 'EvidenceObject') {
      const evidenceFields = ['hash_sha256', 'chain_of_custody_ref', 'seizure_timestamp', 'immutable_flag'];
      for (const field of evidenceFields) {
        if (entity[field] === undefined) return { valid: false, error: `Missing EvidenceObject field: ${field}` };
      }
    }
    return { valid: true };
  };

  // API Endpoints
  
  // GET /canonical/:entity?query=
  app.get("/api/canonical/:entity", (req, res) => {
    const entityType = req.params.entity as EntityType;
    const query = req.query.query as string;
    
    const results = mockEntities[entityType] || [];
    res.json(results);
  });

  // GET /graph/neighbors/:entityId
  app.get("/api/graph/neighbors/:entityId", (req, res) => {
    const { entityId } = req.params;
    const neighbors = mockEdges.filter(e => e.from_entity_id === entityId || e.to_entity_id === entityId);
    res.json(neighbors);
  });

  // POST /graph/edges/accept
  app.post("/api/graph/edges/accept", (req, res) => {
    const edge = req.body as GraphEdge;
    
    // Calculate confidence band
    if (edge.confidence_score >= 0.85) edge.confidence_band = 'High';
    else if (edge.confidence_score >= 0.65) edge.confidence_band = 'Medium';
    else edge.confidence_band = 'Low';

    // In a real app, we would save this to a DB
    res.status(201).json({ 
      status: "Accepted", 
      edge: {
        ...edge,
        created_timestamp: new Date().toISOString(),
        revoked_flag: false
      } 
    });
  });

  // POST /graph/edges/revoke
  app.post("/api/graph/edges/revoke", (req, res) => {
    const { edge_id } = req.body;
    // In a real app, we would mark this as revoked in the DB
    res.json({ status: "Revoked", edge_id });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`I2PH Server running on http://localhost:${PORT}`);
  });
}

startServer();
