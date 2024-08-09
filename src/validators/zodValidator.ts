import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

export const validate =
  (schema: ZodSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body });
      next(); //submissonController
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Invalid Request params received",
        data: {},
        error
      });
    }
  };
