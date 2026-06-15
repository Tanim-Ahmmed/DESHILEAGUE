import { Request, Response, NextFunction } from "express"
import { sendError } from "../utils"

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
  code?: string
  details?: any
}

export class CustomError extends Error implements AppError {
  public statusCode: number
  public isOperational: boolean
  public code: string
  public details?: any

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR', details?: any) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.code = code
    this.details = details

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR')
  }
}

export class AuthorizationError extends CustomError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR')
  }
}

export class AdminAccessError extends CustomError {
  constructor(message: string = 'Admin access required') {
    super(message, 403, 'ADMIN_ACCESS_ERROR')
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR')
  }
}

export class ConflictError extends CustomError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, 'CONFLICT_ERROR')
  }
}

export class RateLimitError extends CustomError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_ERROR')
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR')
  }
}

export class ExternalServiceError extends CustomError {
  constructor(message: string = 'External service error') {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR')
  }
}

/**
 * Create an error with the given message and status code
 */
export const createError = (message: string, statusCode: number = 500): CustomError => {
  return new CustomError(message, statusCode)
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500
  let message = error.message || 'Internal Server Error'
  let code = error.code || 'INTERNAL_ERROR'
  let details = error.details

  // Log error for debugging (skip common browser requests to reduce noise)
  const commonRequests = ['/favicon.ico', '/robots.txt', '/sitemap.xml']
  const shouldLog = !commonRequests.includes(req.path) || statusCode !== 404
  
  if (shouldLog) {
    console.error('Error occurred:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    })
  }

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400
    code = 'VALIDATION_ERROR'
  } else if (error.name === 'CastError') {
    statusCode = 400
    code = 'INVALID_ID_ERROR'
    message = 'Invalid ID format'
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401
    code = 'INVALID_TOKEN_ERROR'
    message = 'Invalid token'
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401
    code = 'TOKEN_EXPIRED_ERROR'
    message = 'Token expired'
  } else if (error.name === 'MongoError' || error.name === 'PrismaClientKnownRequestError') {
    if ((error as any).code === 11000) {
      statusCode = 409
      code = 'DUPLICATE_KEY_ERROR'
      message = 'Duplicate key error'
    } else {
      statusCode = 500
      code = 'DATABASE_ERROR'
      message = 'Database operation failed'
    }
  } else if (error.name === 'PrismaClientValidationError') {
    statusCode = 400
    code = 'VALIDATION_ERROR'
    message = 'Invalid data provided'
  } else if (error.name === 'PrismaClientUnknownRequestError') {
    statusCode = 500
    code = 'DATABASE_ERROR'
    message = 'Unknown database error'
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error'
    details = undefined
  }

  // Send error response
  sendError(res, message, statusCode, {
    code,
    details,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  })
}

/**
 * Async error wrapper middleware
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/**
 * Not found middleware
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Handle common browser requests gracefully
  const commonRequests = ['/favicon.ico', '/robots.txt', '/sitemap.xml']
  
  if (commonRequests.includes(req.path)) {
    res.status(404).json({
      success: false,
      message: 'Resource not found',
      code: 'NOT_FOUND_ERROR',
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    })
    return
  }
  
  const error = new NotFoundError(`Route ${req.originalUrl} not found`)
  next(error)
}

/**
 * Request timeout middleware
 */
export const timeoutHandler = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeout = setTimeout(() => {
      const error = new CustomError('Request timeout', 408, 'TIMEOUT_ERROR')
      next(error)
    }, timeoutMs)

    res.on('finish', () => {
      clearTimeout(timeout)
    })

    next()
  }
}

/**
 * Rate limiting error handler
 */
export const rateLimitErrorHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new RateLimitError('Too many requests')
  next(error)
}

/**
 * Database connection error handler
 */
export const databaseErrorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    const dbError = new DatabaseError('Database connection failed')
    next(dbError)
  } else {
    next(error)
  }
}

/**
 * External service error handler
 */
export const externalServiceErrorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
    const serviceError = new ExternalServiceError('External service unavailable')
    next(serviceError)
  } else {
    next(error)
  }
}
