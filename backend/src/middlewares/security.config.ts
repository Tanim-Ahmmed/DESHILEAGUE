import { Request, Response, NextFunction, RequestHandler } from 'express'
import helmet, { HelmetOptions } from 'helmet'
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors'
import { sendError } from '../utils'

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const isDocker = process.env.DOCKER_ENV === 'true'
const isLocal = !isDocker

// Security configuration based on environment
export const securityConfig = {
  // Helmet configuration
  helmet: {
    // Development: Relaxed security for easier debugging
    development: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
          ],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          connectSrc: ["'self'", 'ws:', 'wss:'],
          frameSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          manifestSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    },
    // Production: Strict security
    production: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", 'https://fonts.googleapis.com'],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          connectSrc: ["'self'"],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          manifestSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: true,
      crossOriginResourcePolicy: { policy: 'same-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin' },
    },
  },

  // CORS configuration
  cors: {
    // Development: Allow all localhost origins
    development: {
      local: {
        origin: [
          'http://localhost:3000',
          'http://localhost:5000',
          'http://localhost:5173',
          'http://localhost:8080',
          'http://127.0.0.1:3000',
          'http://127.0.0.1:5000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:8080',
          'http://localhost:4173', // Vite preview
          'http://localhost:3001', // Alternative dev server
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'X-Requested-With',
          'Accept',
          'Origin',
          'X-API-Key',
        ],
        exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
        maxAge: 86400, // 24 hours
      },
      docker: {
        origin: [
          'http://localhost:3000',
          'http://localhost:5000',
          'http://localhost:5173',
          'http://localhost:8080',
          'http://127.0.0.1:3000',
          'http://127.0.0.1:5000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:4173',
          'http://127.0.0.1:8080',
          'http://api-gateway:5000',
          'http://api-gateway:3000',
          'http://localhost:4173',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'X-Requested-With',
          'Accept',
          'Origin',
          'X-API-Key',
        ],
        exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
        maxAge: 86400, // 24 hours
      },
    },
    // Production: Strict origin policy
    production: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || [
        'https://tapetennis.com',
        'https://www.tapetennis.com',
        'https://app.tapetennis.com',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'X-API-Key',
      ],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400, // 24 hours
    },
  },

  // Rate limiting configuration
  rateLimit: {
    development: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: 'Too many requests from this IP in development',
      standardHeaders: true,
      legacyHeaders: false,
    },
    production: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP',
      standardHeaders: true,
      legacyHeaders: false,
    },
  },
}

// Get current environment configuration
export const getCurrentConfig = () => {
  const env = isProduction ? 'production' : 'development'
  const deployment = isDocker ? 'docker' : 'local'

  const corsConfig = securityConfig.cors[env]
  const corsOptions =
    typeof corsConfig === 'object' && 'local' in corsConfig
      ? (corsConfig as any)[deployment] || corsConfig
      : corsConfig

  return {
    helmet: securityConfig.helmet[env],
    cors: corsOptions,
    rateLimit: securityConfig.rateLimit[env],
    environment: env,
    deployment,
    isDevelopment,
    isProduction,
    isDocker,
    isLocal,
  }
}

// Enhanced CORS middleware with environment detection
export const corsMiddleware: RequestHandler = cors(
  getCurrentConfig().cors as CorsOptions as CorsOptionsDelegate
)

// Enhanced Helmet middleware with environment detection
const helmetOptions: HelmetOptions = getCurrentConfig().helmet as HelmetOptions
export const helmetMiddleware: RequestHandler = helmet(helmetOptions)

// Security headers middleware
export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const config = getCurrentConfig()

  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Environment-specific headers
  if (isDevelopment) {
    res.setHeader('X-Environment', 'development')
    res.setHeader('X-Deployment', config.deployment)
  }

  // Remove server information in production
  if (isProduction) {
    res.setHeader('Server', 'TapeTennis API')
  }

  next()
}

// Request validation middleware (renamed to avoid conflicts)
export const validateSecurityRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate content type for POST/PUT/PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type']

    // Allow multipart/form-data for file upload routes
    const isFileUploadRoute =
      req.path.includes('/profile/setup') ||
      req.path.includes('/profile') ||
      req.path.includes('/tournaments') ||
      req.path.includes('/upload')

    if (!contentType) {
      return sendError(res, 'Content-Type header is required.', 400, {
        environment: getCurrentConfig().environment,
      })
    }

    // Allow both application/json and multipart/form-data
    if (
      !contentType.includes('application/json') &&
      !contentType.includes('multipart/form-data')
    ) {
      return sendError(
        res,
        'Invalid content type. Only application/json or multipart/form-data is allowed.',
        400,
        { environment: getCurrentConfig().environment }
      )
    }
  }

  // Validate request size
  const contentLength = parseInt(req.headers['content-length'] || '0')
  const maxSize = isDevelopment ? 10 * 1024 * 1024 : 5 * 1024 * 1024 // 10MB dev, 5MB prod

  if (contentLength > maxSize) {
    return sendError(res, 'Request entity too large', 413, {
      maxSize: `${maxSize / (1024 * 1024)}MB`,
      environment: getCurrentConfig().environment,
    })
  }

  next()
}

// Environment info middleware
export const environmentInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const config = getCurrentConfig()

  // Add environment info to response headers in development
  if (isDevelopment) {
    res.setHeader('X-Environment', config.environment)
    res.setHeader('X-Deployment', config.deployment)
    res.setHeader('X-Service', req.path.split('/')[1] || 'api-gateway')
  }

  next()
}

// Export default security middleware
export const securityMiddleware: RequestHandler[] = [
  helmetMiddleware,
  corsMiddleware,
  securityHeaders,
  validateSecurityRequest,
  environmentInfo,
]
