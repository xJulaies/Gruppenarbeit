import { RequestHandler } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { createError } from "../lib/errorhandling/createError";
import { TRequestTarget } from "../types/zodTypes";

function formatZodError(error: ZodError) {
  const firstIssue = error.issues[0];

  if (!firstIssue) {
    return "Invalid request";
  }

  const path = firstIssue.path.join(".");
  return path ? `${path}: ${firstIssue.message}` : firstIssue.message;
}

const validate = (
  target: TRequestTarget,
  zodSchema: z.ZodType,
): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (target === "headers") {
        zodSchema.parse(req.headers);
      } else {
        const parsedData = zodSchema.parse(req[target]);
        req[target] = parsedData;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(createError(400, formatZodError(error)));
      }
      return next(error);
    }
  };
};

export function validatorBody(zodSchema: z.ZodType): RequestHandler {
  return validate("body", zodSchema);
}

export function validatorParams(zodSchema: z.ZodType): RequestHandler {
  return validate("params", zodSchema);
}

export function validatorQuery(zodSchema: z.ZodType): RequestHandler {
  return validate("query", zodSchema);
}

export function validatorHeaders(zodSchema: z.ZodType): RequestHandler {
  return validate("headers", zodSchema);
}
