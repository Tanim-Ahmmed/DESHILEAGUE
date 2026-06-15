import { Request, Response, NextFunction } from "express"
import { ValidationError } from "./error.middleware"

export interface ValidationRule {
  required?: boolean
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array'
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  enum?: any[]
  custom?: (value: any) => boolean | string
  transform?: (value: any) => any
}

export interface ValidationSchema {
  [field: string]: ValidationRule
}

/**
 * Validate request body against schema
 */
export const validateBody = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: string[] = []
      const sanitizedData: any = {}

      for (const [field, rules] of Object.entries(schema)) {
        const value = req.body[field]

        // Check if required
        if (rules.required && (value === undefined || value === null || value === '')) {
          errors.push(`${field} is required`)
          continue
        }

        // Skip validation if value is not provided and not required
        if (value === undefined || value === null) {
          continue
        }

        // Type validation
        if (rules.type && typeof value !== rules.type) {
          errors.push(`${field} must be of type ${rules.type}`)
          continue
        }

        // String validations
        if (typeof value === 'string') {
          if (rules.minLength && value.length < rules.minLength) {
            errors.push(`${field} must be at least ${rules.minLength} characters long`)
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`${field} must be at most ${rules.maxLength} characters long`)
          }
          if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(`${field} format is invalid`)
          }
        }

        // Number validations
        if (typeof value === 'number') {
          if (rules.min !== undefined && value < rules.min) {
            errors.push(`${field} must be at least ${rules.min}`)
          }
          if (rules.max !== undefined && value > rules.max) {
            errors.push(`${field} must be at most ${rules.max}`)
          }
        }

        // Enum validation
        if (rules.enum && !rules.enum.includes(value)) {
          errors.push(`${field} must be one of: ${rules.enum.join(', ')}`)
        }

        // Custom validation
        if (rules.custom) {
          const customResult = rules.custom(value)
          if (typeof customResult === 'string') {
            errors.push(customResult)
          } else if (customResult === false) {
            errors.push(`${field} is invalid`)
          }
        }

        // Transform value if needed
        if (rules.transform) {
          sanitizedData[field] = rules.transform(value)
        } else {
          sanitizedData[field] = value
        }
      }

      if (errors.length > 0) {
        throw new ValidationError('Validation failed', { errors, field: errors.join(', ') })
      }

      // Replace body with sanitized data
      req.body = sanitizedData
      next()
    } catch (error) {
      next(error)
    }
  }
}

/**
 * Validate request parameters against schema
 */
export const validateParams = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: string[] = []
      const sanitizedParams: any = {}

      for (const [field, rules] of Object.entries(schema)) {
        const value = req.params[field]

        // Check if required
        if (rules.required && (value === undefined || value === null || value === '')) {
          errors.push(`${field} parameter is required`)
          continue
        }

        // Skip validation if value is not provided and not required
        if (value === undefined || value === null) {
          continue
        }

        // Type validation
        if (rules.type && typeof value !== rules.type) {
          errors.push(`${field} parameter must be of type ${rules.type}`)
          continue
        }

        // String validations
        if (typeof value === 'string') {
          if (rules.minLength && value.length < rules.minLength) {
            errors.push(`${field} parameter must be at least ${rules.minLength} characters long`)
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`${field} parameter must be at most ${rules.maxLength} characters long`)
          }
          if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(`${field} parameter format is invalid`)
          }
        }

        // Number validations
        if (typeof value === 'number') {
          if (rules.min !== undefined && value < rules.min) {
            errors.push(`${field} parameter must be at least ${rules.min}`)
          }
          if (rules.max !== undefined && value > rules.max) {
            errors.push(`${field} parameter must be at most ${rules.max}`)
          }
        }

        // Enum validation
        if (rules.enum && !rules.enum.includes(value)) {
          errors.push(`${field} parameter must be one of: ${rules.enum.join(', ')}`)
        }

        // Custom validation
        if (rules.custom) {
          const customResult = rules.custom(value)
          if (typeof customResult === 'string') {
            errors.push(customResult)
          } else if (customResult === false) {
            errors.push(`${field} parameter is invalid`)
          }
        }

        // Transform value if needed
        if (rules.transform) {
          sanitizedParams[field] = rules.transform(value)
        } else {
          sanitizedParams[field] = value
        }
      }

      if (errors.length > 0) {
        throw new ValidationError('Parameter validation failed', { errors, field: errors.join(', ') })
      }

      // Replace params with sanitized data
      req.params = sanitizedParams
      next()
    } catch (error) {
      next(error)
    }
  }
}

/**
 * Validate request query parameters against schema
 */
export const validateQuery = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: string[] = []
      const sanitizedQuery: any = {}

      for (const [field, rules] of Object.entries(schema)) {
        const value = req.query[field]

        // Check if required
        if (rules.required && (value === undefined || value === null || value === '')) {
          errors.push(`${field} query parameter is required`)
          continue
        }

        // Skip validation if value is not provided and not required
        if (value === undefined || value === null) {
          continue
        }

        // Type validation
        if (rules.type && typeof value !== rules.type) {
          errors.push(`${field} query parameter must be of type ${rules.type}`)
          continue
        }

        // String validations
        if (typeof value === 'string') {
          if (rules.minLength && value.length < rules.minLength) {
            errors.push(`${field} query parameter must be at least ${rules.minLength} characters long`)
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`${field} query parameter must be at most ${rules.maxLength} characters long`)
          }
          if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(`${field} query parameter format is invalid`)
          }
        }

        // Number validations
        if (typeof value === 'number') {
          if (rules.min !== undefined && value < rules.min) {
            errors.push(`${field} query parameter must be at least ${rules.min}`)
          }
          if (rules.max !== undefined && value > rules.max) {
            errors.push(`${field} query parameter must be at most ${rules.max}`)
          }
        }

        // Enum validation
        if (rules.enum && !rules.enum.includes(value)) {
          errors.push(`${field} query parameter must be one of: ${rules.enum.join(', ')}`)
        }

        // Custom validation
        if (rules.custom) {
          const customResult = rules.custom(value)
          if (typeof customResult === 'string') {
            errors.push(customResult)
          } else if (customResult === false) {
            errors.push(`${field} query parameter is invalid`)
          }
        }

        // Transform value if needed
        if (rules.transform) {
          sanitizedQuery[field] = rules.transform(value)
        } else {
          sanitizedQuery[field] = value
        }
      }

      if (errors.length > 0) {
        throw new ValidationError('Query parameter validation failed', { errors, field: errors.join(', ') })
      }

      // Replace query with sanitized data
      req.query = sanitizedQuery
      next()
    } catch (error) {
      next(error)
    }
  }
}

/**
 * Common validation schemas
 */
export const commonSchemas = {
  // Pagination
  pagination: {
    page: { type: 'number', min: 1, transform: (v: any) => parseInt(v) },
    limit: { type: 'number', min: 1, max: 100, transform: (v: any) => parseInt(v) },
    sortBy: { type: 'string' },
    sortOrder: { type: 'string', enum: ['asc', 'desc'] }
  },

  // ID validation
  id: {
    id: { required: true, type: 'string', pattern: /^[a-zA-Z0-9_-]+$/ }
  },

  // Email validation
  email: {
    email: { required: true, type: 'string', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
  },

  // Password validation
  password: {
    password: { required: true, type: 'string', minLength: 8 }
  },

  // Phone number validation
  phoneNumber: {
    phoneNumber: { required: true, type: 'string', pattern: /^\+?[1-9]\d{1,14}$/ }
  },

  // Name validation
  name: {
    name: { required: true, type: 'string', minLength: 2, maxLength: 50 }
  },

  // Search query validation
  searchQuery: {
    query: { required: true, type: 'string', minLength: 1, maxLength: 100 }
  }
}

/**
 * Validate MongoDB ObjectId
 */
export const validateObjectId = (field: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[field] || req.body[field]
    
    if (!value || !/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new ValidationError(`Invalid ${field} format`)
    }
    
    next()
  }
}

/**
 * Validate UUID
 */
export const validateUUID = (field: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[field] || req.body[field]
    
    if (!value || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
      throw new ValidationError(`Invalid ${field} format`)
    }
    
    next()
  }
}

/**
 * Sanitize HTML content
 */
export const sanitizeHtml = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (req.body[field] && typeof req.body[field] === 'string') {
        // Basic HTML sanitization - in production, use a library like DOMPurify
        req.body[field] = req.body[field]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
          .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
          .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      }
    }
    next()
  }
} 