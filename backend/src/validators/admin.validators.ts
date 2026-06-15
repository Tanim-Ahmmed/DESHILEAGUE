import { z } from "zod"
import { AdminPermission } from "@/types"

// Admin login schema
export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

// Admin creation schema
export const createAdminSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  permissions: z.array(z.nativeEnum(AdminPermission)).min(1, "At least one permission is required"),
  isSuperAdmin: z.boolean().optional().default(false),
})

// Admin update schema
export const updateAdminSchema = z.object({
  permissions: z.array(z.nativeEnum(AdminPermission)).optional(),
  isSuperAdmin: z.boolean().optional(),
})

// Admin filters schema
export const adminFiltersSchema = z.object({
  isSuperAdmin: z.boolean().optional(),
  permissions: z.array(z.nativeEnum(AdminPermission)).optional(),
  createdBy: z.string().optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
})

// User filters schema
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  role: z.enum(["USER", "PLAYER", "MANAGER", "ORGANIZER"]).optional(),
  status: z.enum(["verified", "unverified", "banned", "active"]).optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
})

// User management schemas
export const banUserSchema = z.object({
  reason: z.string().min(1, "Ban reason is required"),
  duration: z.number().min(1, "Duration in days is required"),
})

export const unbanUserSchema = z.object({
  reason: z.string().optional(),
})

export const verifyUserSchema = z.object({
  verificationNotes: z.string().optional(),
})

// Tournament management schemas
export const approveTournamentSchema = z.object({
  approvalNotes: z.string().optional(),
})

export const cancelTournamentSchema = z.object({
  reason: z.string().min(1, "Cancellation reason is required"),
})

// Match management schemas
export const controlMatchSchema = z.object({
  action: z.enum(["start", "pause", "resume", "end"]),
  reason: z.string().optional(),
})

// Withdrawal management schemas
export const approveWithdrawalSchema = z.object({
  approvalNotes: z.string().optional(),
})

export const rejectWithdrawalSchema = z.object({
  reason: z.string().min(1, "Rejection reason is required"),
})

// Appeal management schemas
export const approveAppealSchema = z.object({
  approvalNotes: z.string().optional(),
})

export const rejectAppealSchema = z.object({
  reason: z.string().min(1, "Rejection reason is required"),
})

// System configuration schema
export const systemConfigSchema = z.object({
  maintenanceMode: z.boolean().optional(),
  registrationEnabled: z.boolean().optional(),
  tournamentCreationEnabled: z.boolean().optional(),
  withdrawalEnabled: z.boolean().optional(),
  maxTeamSize: z.number().min(1).optional(),
  minTeamSize: z.number().min(1).optional(),
  maxTournamentTeams: z.number().min(1).optional(),
  minTournamentTeams: z.number().min(1).optional(),
  defaultEntryFee: z.number().min(0).optional(),
  adminContactEmail: z.string().email().optional(),
  supportPhoneNumber: z.string().optional(),
})

// Analytics filters schema
export const analyticsFiltersSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(["day", "week", "month"]).optional().default("day"),
})

// Report generation schema
export const generateReportSchema = z.object({
  reportType: z.enum([
    "user_activity",
    "tournament_performance",
    "financial_summary",
    "player_statistics",
    "organizer_performance",
  ]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  format: z.enum(["pdf", "csv", "json"]).optional().default("pdf"),
})

// Content management schemas
export const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  type: z.enum(["announcement", "news", "help", "terms"]),
  isPublished: z.boolean().optional().default(false),
})

export const updateContentSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  type: z.enum(["announcement", "news", "help", "terms"]).optional(),
  isPublished: z.boolean().optional(),
})

// Bulk operations schema
export const bulkOperationSchema = z.object({
  userIds: z.array(z.string()).min(1, "At least one user ID is required"),
  action: z.enum(["ban", "unban", "verify", "delete"]),
  reason: z.string().optional(),
})

// Admin dashboard filters schema
export const dashboardFiltersSchema = z.object({
  period: z.enum(["today", "week", "month", "year"]).optional().default("month"),
  includeStats: z.boolean().optional().default(true),
  includeCharts: z.boolean().optional().default(true),
})

// Match filters schema
export const matchFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["pending", "active", "completed", "cancelled"]).optional(),
  tournamentId: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
})

// Payment filters schema
export const paymentFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["pending", "completed", "failed", "cancelled"]).optional(),
  type: z.enum(["deposit", "withdrawal", "entry_fee", "prize"]).optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
})

// Appeal filters schema
export const appealFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  type: z.enum(["tournament", "match", "payment", "other"]).optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
})

// Export types
export type CreateAdminRequest = z.infer<typeof createAdminSchema>
export type UpdateAdminRequest = z.infer<typeof updateAdminSchema>
export type AdminFilters = z.infer<typeof adminFiltersSchema>
export type BanUserRequest = z.infer<typeof banUserSchema>
export type UnbanUserRequest = z.infer<typeof unbanUserSchema>
export type VerifyUserRequest = z.infer<typeof verifyUserSchema>
export type ApproveTournamentRequest = z.infer<typeof approveTournamentSchema>
export type CancelTournamentRequest = z.infer<typeof cancelTournamentSchema>
export type ControlMatchRequest = z.infer<typeof controlMatchSchema>
export type ApproveWithdrawalRequest = z.infer<typeof approveWithdrawalSchema>
export type RejectWithdrawalRequest = z.infer<typeof rejectWithdrawalSchema>
export type ApproveAppealRequest = z.infer<typeof approveAppealSchema>
export type RejectAppealRequest = z.infer<typeof rejectAppealSchema>
export type SystemConfigRequest = z.infer<typeof systemConfigSchema>
export type AnalyticsFilters = z.infer<typeof analyticsFiltersSchema>
export type GenerateReportRequest = z.infer<typeof generateReportSchema>
export type CreateContentRequest = z.infer<typeof createContentSchema>
export type UpdateContentRequest = z.infer<typeof updateContentSchema>
export type BulkOperationRequest = z.infer<typeof bulkOperationSchema>
export type DashboardFilters = z.infer<typeof dashboardFiltersSchema>
export type UserFilters = z.infer<typeof userFiltersSchema>
export type MatchFilters = z.infer<typeof matchFiltersSchema>
export type PaymentFilters = z.infer<typeof paymentFiltersSchema>
export type AppealFilters = z.infer<typeof appealFiltersSchema> 