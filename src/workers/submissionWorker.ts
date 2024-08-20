import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import SubmissionJob from "../jobs/SubmissionJob";

export default function submissionWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "SubmissionJob") {
        const submissionJobInstance = new SubmissionJob(job.data);
        submissionJobInstance.handler(job);
      }
    },
    { connection: redisConnection }
  );
}
