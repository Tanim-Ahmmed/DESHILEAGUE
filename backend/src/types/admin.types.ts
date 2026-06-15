import { BaseEntity, ApiResult } from "./common.types"
import { UserRole } from "@prisma/client"

// Admin permissions enum
export enum AdminPermission {
  // User Management
  USERS_READ = "users:read",
  USERS_WRITE = "users:write",
  USERS_DELETE = "users:delete",
  USERS_BAN = "users:ban",
  USERS_UNBAN = "users:unban",
  USERS_VERIFY = "users:verify",

  // Tournament Management
  TOURNAMENTS_READ = "tournaments:read",
  TOURNAMENTS_WRITE = "tournaments:write",
  TOURNAMENTS_DELETE = "tournaments:delete",
  TOURNAMENTS_APPROVE = "tournaments:approve",
  TOURNAMENTS_CANCEL = "tournaments:cancel",

  // Match Management
  MATCHES_READ = "matches:read",
  MATCHES_WRITE = "matches:write",
  MATCHES_DELETE = "matches:delete",
  MATCHES_CONTROL = "matches:control",

  // Team Management
  TEAMS_READ = "teams:read",
  TEAMS_WRITE = "teams:write",
  TEAMS_DELETE = "teams:delete",

  // Player Management
  PLAYERS_READ = "players:read",
  PLAYERS_WRITE = "players:write",
  PLAYERS_DELETE = "players:delete",
  PLAYERS_BAN = "players:ban",
  PLAYERS_UNBAN = "players:unban",

  // Manager Management
  MANAGERS_READ = "managers:read",
  MANAGERS_WRITE = "managers:write",
  MANAGERS_DELETE = "managers:delete",
  MANAGERS_APPROVE = "managers:approve",

  // Organizer Management
  ORGANIZERS_READ = "organizers:read",
  ORGANIZERS_WRITE = "organizers:write",
  ORGANIZERS_DELETE = "organizers:delete",
  ORGANIZERS_APPROVE = "organizers:approve",

  // Payment Management
  PAYMENTS_READ = "payments:read",
  PAYMENTS_WRITE = "payments:write",
  PAYMENTS_DELETE = "payments:delete",
  WITHDRAWALS_APPROVE = "withdrawals:approve",
  WITHDRAWALS_REJECT = "withdrawals:reject",

  // Notification Management
  NOTIFICATIONS_READ = "notifications:read",
  NOTIFICATIONS_WRITE = "notifications:write",
  NOTIFICATIONS_DELETE = "notifications:delete",

  // Chat Management
  CHATS_READ = "chats:read",
  CHATS_WRITE = "chats:write",
  CHATS_DELETE = "chats:delete",

  // Appeal Management
  APPEALS_READ = "appeals:read",
  APPEALS_WRITE = "appeals:write",
  APPEALS_DELETE = "appeals:delete",
  APPEALS_APPROVE = "appeals:approve",
  APPEALS_REJECT = "appeals:reject",

  // Admin Management
  ADMINS_READ = "admins:read",
  ADMINS_WRITE = "admins:write",
  ADMINS_DELETE = "admins:delete",
  ADMINS_CREATE = "admins:create",

  // System Management
  SYSTEM_READ = "system:read",
  SYSTEM_WRITE = "system:write",
  SYSTEM_DELETE = "system:delete",
  SYSTEM_CONFIG = "system:config",

  // Analytics & Reports
  ANALYTICS_READ = "analytics:read",
  REPORTS_READ = "reports:read",
  REPORTS_GENERATE = "reports:generate",

  // Content Management
  CONTENT_READ = "content:read",
  CONTENT_WRITE = "content:write",
  CONTENT_DELETE = "content:delete",
}

// Admin entity
export interface Admin extends BaseEntity {
  id: string
  userId: string
  permissions: AdminPermission[]
  isSuperAdmin: boolean
  createdBy?: string
  user?: {
    id: string
    name: string
    email: string
    role: UserRole
    isVerified: boolean
    isBanned: boolean
  }
}

// Admin creation request
export interface CreateAdminRequest {
  userId: string
  permissions: AdminPermission[]
  isSuperAdmin?: boolean
}

// Admin update request
export interface UpdateAdminRequest {
  permissions?: AdminPermission[]
  isSuperAdmin?: boolean
}

// Admin response
export interface AdminResponse {
  id: string
  userId: string
  permissions: AdminPermission[]
  isSuperAdmin: boolean
  createdBy?: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
    role: UserRole
    isVerified: boolean
    isBanned: boolean
  }
}

// Admin list filters
export interface AdminFilters {
  isSuperAdmin?: boolean
  permissions?: AdminPermission[]
  createdBy?: string
  search?: string
  page?: number
  limit?: number
}

// User management request types
export interface BanUserRequest {
  reason: string
  duration: number
}

export interface UnbanUserRequest {
  reason?: string
}

export interface VerifyUserRequest {
  verificationNotes?: string
}

// Tournament management request types
export interface ApproveTournamentRequest {
  approvalNotes?: string
}

export interface CancelTournamentRequest {
  reason: string
}

// Match management request types
export interface ControlMatchRequest {
  action: "start" | "pause" | "resume" | "end"
  reason?: string
}

// Withdrawal management request types
export interface ApproveWithdrawalRequest {
  approvalNotes?: string
}

export interface RejectWithdrawalRequest {
  reason: string
}

// Appeal management request types
export interface ApproveAppealRequest {
  approvalNotes?: string
}

export interface RejectAppealRequest {
  reason: string
}

// Bulk operation request types
export interface BulkOperationRequest {
  userIds: string[]
  action: "ban" | "unban" | "verify" | "delete"
  reason?: string
}

// Analytics and dashboard filters
export interface AnalyticsFilters {
  startDate?: string
  endDate?: string
  groupBy?: "day" | "week" | "month" | "year"
}

export interface DashboardFilters {
  period?: "today" | "week" | "month" | "year"
}

// Report generation request types
export interface GenerateReportRequest {
  reportType: "users" | "tournaments" | "matches" | "revenue" | "analytics"
  startDate: string
  endDate: string
  format?: "pdf" | "csv" | "json"
}

// Admin dashboard data
export interface AdminDashboardData {
  totalUsers: number
  totalAdmins: number
  totalOrganizers: number
  totalManagers: number
  totalPlayers: number
  totalTournaments: number
  totalMatches: number
  totalTeams: number
  pendingWithdrawals: number
  pendingAppeals: number
  systemStats: {
    totalRevenue: number
    activeUsers: number
    completedTournaments: number
  }
}

// Admin analytics data
export interface AdminAnalyticsData {
  userGrowth: {
    date: string
    count: number
  }[]
  tournamentStats: {
    total: number
    active: number
    completed: number
    cancelled: number
  }
  revenueStats: {
    total: number
    monthly: number
    weekly: number
  }
  topPlayers: {
    id: string
    name: string
    matchesPlayed: number
    runsScored: number
    wicketsTaken: number
  }[]
  topOrganizers: {
    id: string
    name: string
    tournamentsOrganized: number
    totalEarnings: number
  }[]
}

// Admin system config
export interface SystemConfig {
  maintenanceMode: boolean
  registrationEnabled: boolean
  tournamentCreationEnabled: boolean
  withdrawalEnabled: boolean
  maxTeamSize: number
  minTeamSize: number
  maxTournamentTeams: number
  minTournamentTeams: number
  defaultEntryFee: number
  adminContactEmail: string
  supportPhoneNumber: string
}

// Admin result types
export type CreateAdminResult = ApiResult<AdminResponse>
export type UpdateAdminResult = ApiResult<AdminResponse>
export type DeleteAdminResult = ApiResult<{ message: string }>
export type GetAdminResult = ApiResult<AdminResponse>
export type GetAdminsResult = ApiResult<{
  admins: AdminResponse[]
  total: number
  page: number
  limit: number
}>
export type GetAdminDashboardResult = ApiResult<AdminDashboardData>
export type GetAdminAnalyticsResult = ApiResult<AdminAnalyticsData>
export type UpdateSystemConfigResult = ApiResult<SystemConfig>
export type GetSystemConfigResult = ApiResult<SystemConfig>

// Permission check interface
export interface PermissionCheck {
  hasPermission: (permission: AdminPermission) => boolean
  hasAnyPermission: (permissions: AdminPermission[]) => boolean
  hasAllPermissions: (permissions: AdminPermission[]) => boolean
  isSuperAdmin: () => boolean
}

// Admin middleware types
export interface AdminRequest {
  admin: {
    id: string
    userId: string
    permissions: AdminPermission[]
    isSuperAdmin: boolean
  }
} 