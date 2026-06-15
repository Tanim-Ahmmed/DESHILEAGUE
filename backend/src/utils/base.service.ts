import {
  BaseEntity,
  IBaseService,
  Logger,
  PaginatedResponse,
  PaginationParams,
  ServiceResult
} from '../types'

/**
 * Base service class that provides common functionality for all services
 */
export abstract class BaseService<
  T extends BaseEntity,
  CreateDTO,
  UpdateDTO,
  FilterDTO = any
> implements IBaseService<T, CreateDTO, UpdateDTO, FilterDTO>
{
  protected logger: Logger

  constructor(logger?: Logger) {
    this.logger = logger || {
      error: (message: string, meta?: any) => console.error(message, meta),
      warn: (message: string, meta?: any) => console.warn(message, meta),
      info: (message: string, meta?: any) => console.info(message, meta),
      debug: (message: string, meta?: any) => console.debug(message, meta),
    }
  }

  /**
   * Create a new entity
   */
  abstract create(data: CreateDTO): Promise<T>

  /**
   * Find entity by ID
   */
  abstract findById(id: string): Promise<T | null>

  /**
   * Find all entities with optional filters
   */
  abstract findAll(filters?: FilterDTO): Promise<T[]>

  /**
   * Update entity by ID
   */
  abstract update(id: string, data: UpdateDTO): Promise<T>

  /**
   * Delete entity by ID
   */
  abstract delete(id: string): Promise<boolean>

  /**
   * Check if entity exists by ID
   */
  abstract exists(id: string): Promise<boolean>

  /**
   * Find entity by field
   */
  abstract findByField(field: keyof T, value: any): Promise<T | null>

  /**
   * Count entities with optional filters
   */
  abstract count(filters?: FilterDTO): Promise<number>

  /**
   * Map entity to response DTO
   */
  protected mapToResponse(entity: T): any {
    return entity
  }

  /**
   * Validate business rules
   */
  protected async validateBusinessRules(
    data: CreateDTO | UpdateDTO
  ): Promise<void> {
    // Default implementation - override in child classes if needed
  }

  /**
   * Get paginated results
   */
  async findPaginated(
    params: PaginationParams,
    filters?: FilterDTO
  ): Promise<PaginatedResponse<T>> {
    const { page = 1, limit = 10, sortBy, sortOrder = 'desc' } = params

    const offset = (page - 1) * limit
    const total = await this.count(filters)
    const totalPages = Math.ceil(total / limit)

    // Get paginated data (implementation depends on repository)
    const data = await this.findAll(filters)

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  }

  /**
   * Create with result wrapper
   */
  async createWithResult(data: CreateDTO): Promise<ServiceResult<T>> {
    try {
      const result = await this.create(data)
      return {
        success: true,
        data: result,
        message: 'Entity created successfully',
      }
    } catch (error) {
      this.logger.error('Failed to create entity', { error, data })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Find by ID with result wrapper
   */
  async findByIdWithResult(id: string): Promise<ServiceResult<T>> {
    try {
      const result = await this.findById(id)
      if (!result) {
        return {
          success: false,
          error: 'Entity not found',
        }
      }
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      this.logger.error('Failed to find entity by ID', { error, id })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Update with result wrapper
   */
  async updateWithResult(
    id: string,
    data: UpdateDTO
  ): Promise<ServiceResult<T>> {
    try {
      const result = await this.update(id, data)
      return {
        success: true,
        data: result,
        message: 'Entity updated successfully',
      }
    } catch (error) {
      this.logger.error('Failed to update entity', { error, id, data })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Delete with result wrapper
   */
  async deleteWithResult(id: string): Promise<ServiceResult<boolean>> {
    try {
      const result = await this.delete(id)
      return {
        success: true,
        data: result,
        message: result ? 'Entity deleted successfully' : 'Entity not found',
      }
    } catch (error) {
      this.logger.error('Failed to delete entity', { error, id })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Validate entity exists
   */
  protected async validateEntityExists(id: string): Promise<boolean> {
    const exists = await this.exists(id)
    if (!exists) {
      throw new Error(`Entity with ID ${id} does not exist`)
    }
    return true
  }

  /**
   * Validate entity doesn't exist by field
   */
  public async validateEntityNotExists(
    field: keyof T,
    value: any
  ): Promise<boolean> {
    const existing = await this.findByField(field, value)
    if (existing) {
      throw new Error(`Entity with ${String(field)} ${value} already exists`)
    }
    return true
  }

  /**
   * Log service operation
   */
  protected logOperation(operation: string, data?: any): void {
    this.logger.info(`Service operation: ${operation}`, { data })
  }

  /**
   * Log service error
   */
  protected logError(operation: string, error: any, data?: any): void {
    this.logger.error(`Service operation failed: ${operation}`, { error, data })
  }
}
