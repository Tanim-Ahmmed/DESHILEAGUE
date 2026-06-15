import type { Request, Response, NextFunction } from "express"
import { type ZodSchema, ZodError, z } from "zod"
import { sendError } from '../utils';

export const validateRequest = (schemas: {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body if schema provided
      if (schemas.body) {
        // Check if the schema expects a nested structure by looking at the schema shape
        const schemaShape = (schemas.body as any).shape;
        const schemaKeys = Object.keys(schemaShape || {});
        const expectsNested = schemaKeys.includes('body');

        if (expectsNested) {
          // Schema expects nested structure like { body: { email: string, password: string } }
          const validatedBody = schemas.body.parse({ body: req.body })
          req.body = validatedBody.body
        } else {
          // Schema expects direct structure like { email: string, password: string }
          const validatedBody = schemas.body.parse(req.body)
          req.body = validatedBody
        }
      }
      
      // Validate query if schema provided
      if (schemas.query) {
        console.log('Original query:', req.query);
        
        // Transform query parameters to proper types
        const transformedQuery: any = {}
        for (const [key, value] of Object.entries(req.query)) {
          if (value !== undefined && value !== null) {
            // Only convert to number if the key suggests it should be numeric
            if (typeof value === 'string' && !isNaN(Number(value)) && 
                (key === 'page' || key === 'limit' || key === 'maxTeamSize' || 
                 key === 'minTeamSize' || key === 'maxTournamentTeams' || 
                 key === 'minTournamentTeams' || key === 'defaultEntryFee')) {
              transformedQuery[key] = Number(value)
              console.log(`Converting ${key} from "${value}" to ${Number(value)}`);
            }
            // Convert string booleans to actual booleans
            else if (typeof value === 'string' && (value === 'true' || value === 'false')) {
              transformedQuery[key] = value === 'true'
              console.log(`Converting ${key} from "${value}" to ${value === 'true'}`);
            }
            // Handle arrays
            else if (Array.isArray(value)) {
              transformedQuery[key] = value.map(v => {
                if (typeof v === 'string' && !isNaN(Number(v))) {
                  return Number(v)
                }
                return v
              })
            }
            else {
              transformedQuery[key] = value
              console.log(`Keeping ${key} as "${value}" (${typeof value})`);
            }
          }
        }

        console.log('Transformed query:', transformedQuery);

        // Check if the schema expects a nested structure by looking at the schema shape
        const schemaShape = (schemas.query as any).shape;
        const schemaKeys = Object.keys(schemaShape || {});
        const expectsNested = schemaKeys.includes('query');

        if (expectsNested) {
          // Schema expects nested structure, always use that
          const validatedQuery = schemas.query.parse({ query: transformedQuery })
          req.query = validatedQuery.query
          console.log('Validated query (nested):', req.query);
        } else {
          // Schema expects direct structure
          const validatedQuery = schemas.query.parse(transformedQuery)
          req.query = validatedQuery
          console.log('Validated query (direct):', req.query);
        }
      }
      
      // Validate params if schema provided
      if (schemas.params) {
        // Check if the schema expects a nested structure by looking at the schema shape
        const schemaShape = (schemas.params as any).shape;
        const schemaKeys = Object.keys(schemaShape || {});
        const expectsNested = schemaKeys.includes('params');

        if (expectsNested) {
          // Schema expects nested structure like { params: { id: string } }
          const validatedParams = schemas.params.parse({ params: req.params })
          req.params = validatedParams.params
        } else {
          // Schema expects direct structure like { id: string }
          const validatedParams = schemas.params.parse(req.params)
          req.params = validatedParams
        }
      }
      
      next()
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return sendError(
          res,
          "Validation failed \n" + error.errors.map((err) => err.message).join(", "),
          400,
          error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          }))
        );
      }
      next(error)
    }
  }
}
