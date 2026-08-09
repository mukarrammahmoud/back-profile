import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";

export const idParam = z.object({ id: z.coerce.number().int().positive() });
export function validate(
  schema: ZodType,
  source: "body" | "query" | "params" = "body",
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: result.error.flatten(),
      });
      return;
    }
    req[source] = result.data;
    next();
  };
}
