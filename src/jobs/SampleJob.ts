import { Job } from "bullmq";
import { Ijob } from "../types/bullMqJobDefinition";

export default class SampleJob implements Ijob {
  name: string;
  payload: Record<string, unknown>;
  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name; //or we can hardcode the classname
  }

  handler = (job?: Job): void => {
    console.log("Handler of the job called");
    console.log(this.payload);
    if (job) {
      console.log(job.id, job.name, job.data);
    }
  };

  failed = (job?: Job): void => {
    console.log("Job failed");
    if (job) {
      console.log(job.id);
    }
  };
}
