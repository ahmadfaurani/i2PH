import { GoogleGenAI } from "@google/genai";
import { Entity, AuditLog } from "../types";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
};

export const mockEntities: Entity[] = [
  {
    id: "P-8821",
    type: "Person",
    name: "Ahmad bin Ibrahim",
    details: {
      "IC Number": "850101-14-5567",
      "Nationality": "Malaysian",
      "Address": "No 12, Jalan Ampang, KL",
      "Status": "Person of Interest"
    },
    confidence: 0.98,
    source: "JPN, Case Management"
  },
  {
    id: "V-4492",
    type: "Vehicle",
    name: "WYY 1234",
    details: {
      "Make": "Proton",
      "Model": "X70",
      "Color": "Silver",
      "Owner": "Ahmad bin Ibrahim"
    },
    confidence: 1.0,
    source: "JPJ"
  },
  {
    id: "D-1102",
    type: "Device",
    name: "iPhone 15 Pro",
    details: {
      "IMEI": "356789012345678",
      "Last Known Cell": "KLCC Tower 1",
      "Associated Account": "ahmad.i@email.com"
    },
    confidence: 0.85,
    source: "Telco Logs"
  }
];

export const mockAuditLogs: AuditLog[] = [
  { id: "LOG-001", timestamp: "2026-02-27 10:15:22", user: "Insp. Sarah", action: "Search", resource: "Person: Ahmad bin Ibrahim", purpose: "Investigation Op Wira", status: "Success" },
  { id: "LOG-002", timestamp: "2026-02-27 10:18:45", user: "Insp. Sarah", action: "Link Analysis", resource: "Knowledge Graph", purpose: "Investigation Op Wira", status: "Success" },
  { id: "LOG-003", timestamp: "2026-02-27 11:02:10", user: "Sgt. Tan", action: "Access Denied", resource: "Classified Intel: CID-99", purpose: "Unauthorized Access", status: "Denied" },
];

export async function generateOperationalBrief(entityName: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional, structured operational brief for a PDRM investigator about the following entity: ${entityName}. 
      Include sections for: Summary, Linked Entities, Risk Assessment, and Recommended Actions. 
      Use a formal, authoritative tone. Format in Markdown.`,
      config: {
        systemInstruction: "You are an AI Analyst for the I2PH (Integrated Information Processing Hub) of PDRM. Your output must be concise, accurate, and policy-aware."
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Brief Generation Error:", error);
    return "Failed to generate brief. Please try again later.";
  }
}

export async function semanticSearch(query: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is searching for: "${query}" in the I2PH system. 
      Based on the query, identify potential entity types (Person, Vehicle, Device, Location, Incident) and search parameters.
      Return a JSON object with 'entities' (array of types) and 'filters' (key-value pairs).`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Semantic Search Error:", error);
    return { entities: [], filters: {} };
  }
}
