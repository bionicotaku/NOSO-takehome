import fs from "fs";
import path from "path";
import TranscriptReviewer from "../components/TranscriptReviewer";
import { TranscriptData } from "../types/schema";

// Helper to load data
async function getTranscriptData(): Promise<TranscriptData> {
  const filePath = path.join(process.cwd(), "public", "transcript.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as TranscriptData;
}

export default async function Page() {
  const data = await getTranscriptData();

  return (
    <TranscriptReviewer
      transcript={data.transcript}
      annotations={data.annotations}
      meta={data.meta}
      checklist={data.compliance_checklist}
    />
  );
}
