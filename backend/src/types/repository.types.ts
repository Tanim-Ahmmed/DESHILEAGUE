import { BaseEntity, ApiResult, PaginationParams, PaginatedResponse } from "./common.types"

// Base repository interface
export interface IBaseRepository<T extends BaseEntity, CreateDTO, UpdateDTO, FilterDTO = any> {
  // Basic CRUD operations
  create(data: CreateDTO): Promise<T>
  findById(id: string): Promise<T | null>
  findAll(filters?: FilterDTO): Promise<T[]>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<boolean>
  
  // Additional operations
  exists(id: string): Promise<boolean>
  findByField(field: keyof T, value: any): Promise<T | null>
  count(filters?: FilterDTO): Promise<number>
  
  // Pagination
  findPaginated(params: PaginationParams, filters?: FilterDTO): Promise<PaginatedResponse<T>>
  
  // Bulk operations
  createMany(data: CreateDTO[]): Promise<T[]>
  updateMany(ids: string[], data: UpdateDTO): Promise<T[]>
  deleteMany(ids: string[]): Promise<boolean>
  
  // Soft delete operations
  softDelete(id: string): Promise<boolean>
  restore(id: string): Promise<boolean>
  findDeleted(id: string): Promise<T | null>
  
  // Search operations
  search(query: string, filters?: FilterDTO): Promise<T[]>
  
  // Transaction support
  withTransaction<R>(fn: (repository: this) => Promise<R>): Promise<R>
}

// Repository result types
export type RepositoryResult<T> = ApiResult<T>
export type RepositoryListResult<T> = ApiResult<T[]>
export type RepositoryPaginatedResult<T> = ApiResult<PaginatedResponse<T>>

// Repository configuration
export interface RepositoryConfig {
  enableLogging?: boolean
  enableCaching?: boolean
  cacheTTL?: number
  maxQueryLimit?: number
  defaultPaginationLimit?: number
}

// Repository error types
export interface RepositoryError {
  code: 'NOT_FOUND' | 'DUPLICATE' | 'VALIDATION' | 'CONSTRAINT' | 'CONNECTION' | 'UNKNOWN'
  message: string
  field?: string
  value?: any
  details?: Record<string, any>
}

// Repository query options
export interface QueryOptions {
  include?: Record<string, boolean>
  select?: Record<string, boolean>
  orderBy?: Record<string, 'asc' | 'desc'>
  limit?: number
  offset?: number
}

// Repository filter interface
export interface BaseFilter {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Repository transaction interface
export interface DatabaseTransaction {
  commit(): Promise<void>
  rollback(): Promise<void>
  isActive(): boolean
}

// Repository connection interface
export interface RepositoryConnection {
  connect(): Promise<void>
  disconnect(): Promise<void>
  isConnected(): boolean
  getTransaction(): Promise<DatabaseTransaction>
}

// Repository metrics interface
export interface RepositoryMetrics {
  queryCount: number
  queryTime: number
  cacheHits: number
  cacheMisses: number
  errors: number
}

// Repository health check interface
export interface RepositoryHealth {
  isHealthy: boolean
  connectionStatus: 'connected' | 'disconnected' | 'error'
  lastCheck: Date
  metrics: RepositoryMetrics
} 