import express, { Express } from "express";

import { addSubmission } from "../../controllers/submissionController";
import { validate } from "../../validators/createSubmissionValidator";
import { CreateSubmissionZodSchema } from "../../dtos/createSubmissionDto";

const submissionRouter = express.Router();

submissionRouter.post("/", validate(CreateSubmissionZodSchema), addSubmission);

export default submissionRouter;
