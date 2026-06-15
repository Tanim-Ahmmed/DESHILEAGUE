import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type JWTPayload, sendError } from '../utils'

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Access token required' })
    }

    // Use your verifyToken function
    const decoded = verifyToken(token)

    // FIXED: Keep original structure - set req.user to decoded directly
    ;(req as any).user = decoded

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(403).json({
      success: false,
      message: 'Invalid token',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401)
    }
    if (!allowedRoles.includes(req.user.role)) {
      return sendError(res, 'Insufficient permissions', 403)
    }
    next()
  }
}
