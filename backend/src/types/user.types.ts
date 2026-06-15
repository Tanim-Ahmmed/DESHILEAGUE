import { UserRole } from "@prisma/client"
import { BaseEntity } from "./common.types"

// User entity types
export interface User extends BaseEntity {
  email: string
  phoneNumber?: string
  name: string
  username: string
  role: UserRole
  coins: number
  isVerified: boolean
  isBanned?: boolean
  profilePicture?: string
  location?: string
  passwordHash: string
}

export interface UserResponse extends Omit<User, 'passwordHash'> {
  // Excludes passwordHash for security
}

// User creation and update types
export interface CreateUserRequest {
  email: string
  password: string
  name: string
  // Note: username is auto-generated from email, not required in user creation
  role: UserRole
  phoneNumber?: string
  profilePicture?: string
  location?: string
}

export interface UpdateUserRequest {
  name?: string
  username?: string
  phoneNumber?: string
  profilePicture?: string
  location?: string
}

// User search and filter types
export interface UserSearchParams {
  query?: string
  role?: UserRole
  isVerified?: boolean
  isBanned?: boolean
  location?: string
}

export interface UserFilters {
  role?: UserRole[]
  isVerified?: boolean
  isBanned?: boolean
  hasProfilePicture?: boolean
  minCoins?: number
  maxCoins?: number
}

// User statistics types
export interface UserStats {
  totalUsers: number
  verifiedUsers: number
  bannedUsers: number
  usersByRole: Record<UserRole, number>
  averageCoins: number
}

// User verification types
export interface UserVerification {
  userId: string
  documentType: 'ID_CARD' | 'PASSPORT' | 'DRIVERS_LICENSE'
  documentNumber: string
  documentImage: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  verifiedBy?: string
  verifiedAt?: Date
  rejectionReason?: string
}

// User preferences types
export interface UserPreferences {
  userId: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    tournamentUpdates: boolean
    matchUpdates: boolean
    paymentUpdates: boolean
  }
  privacy: {
    profileVisibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS_ONLY'
    showLocation: boolean
    showCoins: boolean
    allowFriendRequests: boolean
  }
  language: string
  timezone: string
}

// User activity types
export interface UserActivity {
  userId: string
  action: 'LOGIN' | 'LOGOUT' | 'PROFILE_UPDATE' | 'PASSWORD_CHANGE' | 'TOURNAMENT_JOIN' | 'MATCH_PARTICIPATE'
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  metadata?: Record<string, any>
}

// User relationships types
export interface UserRelationship {
  id: string
  userId: string
  relatedUserId: string
  type: 'FRIEND' | 'BLOCKED' | 'FOLLOWING'
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  createdAt: Date
  updatedAt: Date
}

// User achievements types
export interface UserAchievement {
  id: string
  userId: string
  achievementType: 'TOURNAMENT_WIN' | 'MATCH_WIN' | 'PERFECT_GAME' | 'STREAK' | 'COINS_EARNED'
  title: string
  description: string
  icon: string
  earnedAt: Date
  metadata?: Record<string, any>
}

// User leaderboard types
export interface UserLeaderboardEntry {
  userId: string
  name: string
  profilePicture?: string
  score: number
  rank: number
  category: 'TOURNAMENTS_WON' | 'MATCHES_WON' | 'COINS_EARNED' | 'PERFECT_GAMES'
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME' | 'ALL_TIME'
}
