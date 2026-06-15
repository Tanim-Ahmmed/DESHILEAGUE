import { BaseEntity } from "./common.types"

// Base service interface
export interface IBaseService<T extends BaseEntity, CreateDTO, UpdateDTO, FilterDTO = any> {
  create(data: CreateDTO): Promise<T>
  findById(id: string): Promise<T | null>
  findAll(filters?: FilterDTO): Promise<T[]>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<boolean>
  exists(id: string): Promise<boolean>
}

// Service result types
export interface ServiceResult<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedServiceResult<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  error?: string
  message?: string
}

// Service configuration
export interface ServiceConfig {
  name: string
  version: string
  environment: 'development' | 'staging' | 'production'
  logLevel: 'error' | 'warn' | 'info' | 'debug'
  timeout: number
  retries: number
}

// Service health check
export interface HealthCheck {
  service: string
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: Date
  uptime: number
  version: string
  checks: {
    database: boolean
    redis: boolean
    externalServices: Record<string, boolean>
  }
}

// Service metrics
export interface ServiceMetrics {
  service: string
  timestamp: Date
  requests: {
    total: number
    successful: number
    failed: number
    averageResponseTime: number
  }
  errors: {
    total: number
    byType: Record<string, number>
  }
  resources: {
    memory: number
    cpu: number
    disk: number
  }
}

// Service events
export interface ServiceEvent<T = any> {
  id: string
  type: string
  service: string
  timestamp: Date
  data: T
  metadata?: Record<string, any>
}

// Service middleware
export interface ServiceMiddleware {
  name: string
  execute(context: any, next: () => Promise<any>): Promise<any>
}

// Service validation
export interface ValidationRule {
  field: string
  type: 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom'
  value?: any
  message?: string
  validator?: (value: any) => boolean
}

export interface ValidationSchema {
  [key: string]: ValidationRule[]
}

// Service caching
export interface CacheConfig {
  ttl: number
  keyPrefix: string
  maxSize: number
}

export interface CacheService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
  exists(key: string): Promise<boolean>
}

// Service logging
export interface LogConfig {
  level: 'error' | 'warn' | 'info' | 'debug'
  format: 'json' | 'text'
  destination: 'console' | 'file' | 'remote'
  filePath?: string
  maxSize?: number
  maxFiles?: number
}

export interface Logger {
  error(message: string, meta?: any): void
  warn(message: string, meta?: any): void
  info(message: string, meta?: any): void
  debug(message: string, meta?: any): void
}

// Service rate limiting
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
  keyGenerator?: (req: any) => string
}

// Service authentication
export interface AuthConfig {
  secret: string
  expiresIn: string
  refreshExpiresIn: string
  issuer: string
  audience: string
}

// Service database
export interface DatabaseConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
  ssl?: boolean
  pool?: {
    min: number
    max: number
    acquire: number
    idle: number
  }
}

// Service external APIs
export interface ExternalApiConfig {
  baseUrl: string
  timeout: number
  retries: number
  headers: Record<string, string>
  auth?: {
    type: 'bearer' | 'basic' | 'api-key'
    token?: string
    username?: string
    password?: string
    apiKey?: string
  }
}

// Service queue
export interface QueueConfig {
  name: string
  concurrency: number
  retries: number
  backoff: 'fixed' | 'exponential'
  delay: number
}

export interface QueueJob<T = any> {
  id: string
  data: T
  attempts: number
  maxAttempts: number
  createdAt: Date
  processedAt?: Date
  failedAt?: Date
  error?: string
}

// Service websocket
export interface WebSocketConfig {
  port: number
  path: string
  cors?: {
    origin: string | string[]
    credentials: boolean
  }
}

export interface WebSocketMessage<T = any> {
  type: string
  data: T
  timestamp: Date
  userId?: string
  roomId?: string
}

// Service notification
export interface NotificationConfig {
  email?: {
    provider: 'smtp' | 'sendgrid' | 'aws-ses'
    host?: string
    port?: number
    username?: string
    password?: string
    apiKey?: string
  }
  sms?: {
    provider: 'twilio' | 'aws-sns'
    accountSid?: string
    authToken?: string
    apiKey?: string
  }
  push?: {
    provider: 'firebase' | 'aws-sns'
    serverKey?: string
    apiKey?: string
  }
}

// Service file upload
export interface FileUploadConfig {
  provider: 'local' | 'aws-s3' | 'google-cloud' | 'azure-blob'
  maxSize: number
  allowedTypes: string[]
  destination: string
  aws?: {
    bucket: string
    region: string
    accessKeyId: string
    secretAccessKey: string
  }
  google?: {
    bucket: string
    projectId: string
    keyFilename: string
  }
  azure?: {
    accountName: string
    accountKey: string
    containerName: string
  }
} 