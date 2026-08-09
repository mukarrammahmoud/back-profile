import { NextFunction, Request, Response } from "express";
export function notFound(req: Request, res: Response): void {
  res.status(404).json({ success: false, message: "Route not found." });
}
export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error("[error]", error);
  if (res.headersSent) {
    next(error);
    return;
  }
  res.status(500).json({ success: false, message: "Internal server error." });
}
