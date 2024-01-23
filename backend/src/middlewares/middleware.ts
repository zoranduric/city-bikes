import { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: err.flatten(),
    });
  } else if (err instanceof Error) {
    const error = err as Error & { statusCode?: number };
    res.status(error.statusCode ?? 400).json({
      message: err.message,
    });
    return;
  } else {
    res.status(500).json({
      message: 'internal server error',
    });
  }
}
