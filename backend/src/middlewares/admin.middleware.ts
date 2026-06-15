import type { NextFunction, Request, Response } from 'express'

import { AdminAccessError } from './error.middleware'

import { AdminPermission } from '@/types'
import { sendError } from '@/utils'
import { prisma } from '@/utils/client'

// Extended request interface for admin
export interface AdminRequest extends Request {
  user?: {
    userId: string
    [key: string]: any
  }
  admin?: {
    id: string
    userId: string
    permissions: AdminPermission[]
    isSuperAdmin: boolean
  }
}

// Admin authentication middleware
export const adminAuthMiddleware = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return sendError(res, 'Authentication required', 401)
    }

    // Check if user is an admin
    const admin = await prisma.admin.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isVerified: true,
            isBanned: true,
          },
        },
      },
    })

    if (!admin) {
      const error = new AdminAccessError('Admin access required')
      return next(error)
    }

    if (admin.user?.isBanned) {
      return sendError(res, 'Account is banned', 403)
    }

    req.admin = {
      id: admin.id,
      userId: admin.userId,
      permissions: admin.permissions as AdminPermission[],
      isSuperAdmin: admin.isSuperAdmin,
    }

    next()
  } catch (error) {
    next(error)
  }
}

// Permission check middleware
export const permissionMiddleware = (requiredPermission: AdminPermission) => {
  return (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin authentication required', 401)
      }

      const { permissions, isSuperAdmin } = req.admin

      // Super admin has all permissions
      if (isSuperAdmin) {
        return next()
      }

      // Check if admin has the required permission
      if (!permissions.includes(requiredPermission)) {
        return sendError(res, 'Insufficient permissions', 403)
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

// Multiple permissions middleware (ANY)
export const anyPermissionMiddleware = (
  requiredPermissions: AdminPermission[]
) => {
  return (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin authentication required', 401)
      }

      const { permissions, isSuperAdmin } = req.admin

      // Super admin has all permissions
      if (isSuperAdmin) {
        return next()
      }

      // Check if admin has any of the required permissions
      const hasPermission = requiredPermissions.some((permission) =>
        permissions.includes(permission)
      )

      if (!hasPermission) {
        return sendError(res, 'Insufficient permissions', 403)
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

// Multiple permissions middleware (ALL)
export const allPermissionsMiddleware = (
  requiredPermissions: AdminPermission[]
) => {
  return (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin authentication required', 401)
      }

      const { permissions, isSuperAdmin } = req.admin

      // Super admin has all permissions
      if (isSuperAdmin) {
        return next()
      }

      // Check if admin has all required permissions
      const hasAllPermissions = requiredPermissions.every((permission) =>
        permissions.includes(permission)
      )

      if (!hasAllPermissions) {
        return sendError(res, 'Insufficient permissions', 403)
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

// Super admin middleware
export const superAdminMiddleware = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return sendError(res, 'Admin authentication required', 401)
    }

    if (!req.admin.isSuperAdmin) {
      return sendError(res, 'Super admin access required', 403)
    }

    next()
  } catch (error) {
    next(error)
  }
}

// Permission check utility
export const createPermissionCheck = (admin: {
  permissions: AdminPermission[]
  isSuperAdmin: boolean
}) => {
  return {
    hasPermission: (permission: AdminPermission): boolean => {
      return admin.isSuperAdmin || admin.permissions.includes(permission)
    },
    hasAnyPermission: (permissions: AdminPermission[]): boolean => {
      return (
        admin.isSuperAdmin ||
        permissions.some((permission) => admin.permissions.includes(permission))
      )
    },
    hasAllPermissions: (permissions: AdminPermission[]): boolean => {
      return (
        admin.isSuperAdmin ||
        permissions.every((permission) =>
          admin.permissions.includes(permission)
        )
      )
    },
    isSuperAdmin: (): boolean => {
      return admin.isSuperAdmin
    },
  }
}

// Admin role middleware (combines auth and admin check)
export const adminRoleMiddleware = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return sendError(res, 'Authentication required', 401)
    }

    // Check if user is an admin
    const admin = await prisma.admin.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isVerified: true,
            isBanned: true,
          },
        },
      },
    })

    if (!admin) {
      const error = new AdminAccessError('Admin access required')
      return next(error)
    }

    if (admin.user?.isBanned) {
      return sendError(res, 'Account is banned', 403)
    }

    req.admin = {
      id: admin.id,
      userId: admin.userId,
      permissions: admin.permissions as AdminPermission[],
      isSuperAdmin: admin.isSuperAdmin,
    }

    next()
  } catch (error) {
    next(error)
  }
}
