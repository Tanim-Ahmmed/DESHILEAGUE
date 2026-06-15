import type { Response } from 'express';

export function sendSuccess(res: Response, message: string, data: any = {}) {
  return res.json({
    success: true,
    message,
    data,
    errors: null,
  });
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  data: any = null,
  errors: Array<{ field: string; message: string }> | null = null
) {
  return res.status(statusCode).json({
    success: false,
    message,
    data,
    errors: errors || null,
  });
} 