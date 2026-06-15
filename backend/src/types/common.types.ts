// Common response types
export type SuccessResult<T = undefined> = { success: true } & (T extends undefined ? {} : T)
export type ErrorResult = { success: false; message: string }

// Generic result types
export type ApiResult<T = undefined> = SuccessResult<T> | ErrorResult

// Pagination types
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// File upload types
export interface FileUpload {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  destination: string
  filename: string
  path: string
}

// Location types
export interface Location {
  latitude?: number
  longitude?: number
  address?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
}

// Base entity types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface SoftDeleteEntity extends BaseEntity {
  deletedAt?: Date
}

// Audit types
export interface AuditInfo {
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

// Status types
export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'CANCELLED'
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'

// Notification types
export interface NotificationData {
  title: string
  body: string
  data?: Record<string, any>
  image?: string
}

// Cache types
export interface CacheOptions {
  ttl?: number
  key?: string
}

// Search types
export interface SearchParams {
  query?: string
  filters?: Record<string, any>
  sort?: Record<string, 'asc' | 'desc'>
}

// API Error types
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

// Validation types
export interface ValidationError {
  field: string
  message: string
  value?: any
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Logging types
export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug'
  message: string
  timestamp: Date
  userId?: string
  requestId?: string
  metadata?: Record<string, any>
}

// Redis types
export interface RedisConfig {
  host: string
  port: number
  password?: string
  db?: number
  keyPrefix?: string
}

// JWT types
export interface JwtPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// Email types
export interface EmailTemplate {
  subject: string
  html: string
  text?: string
}

export interface EmailData {
  to: string
  from?: string
  subject: string
  html?: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

// SMS types
export interface SmsData {
  to: string
  message: string
  from?: string
}



// Tournament specific types
export interface TournamentSettings {
  maxTeams: number
  maxPlayersPerTeam: number
  entryFee: number
  prizePool: number
  isPublic: boolean
  allowSpectators: boolean
}

// Match specific types
export interface MatchSettings {
  overs: number
  playersPerTeam: number
  isTossRequired: boolean
  allowSubstitutes: boolean
}

// Chat types
 