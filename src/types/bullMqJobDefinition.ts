import { Job } from "bullmq";

export interface Ijob {
  name: string;
  payload?: Record<string, unknown>;
  handler: (job?: Job) => void;
  failed: (job?: Job) => void;
}
