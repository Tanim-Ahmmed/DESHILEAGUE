import { BaseEntity } from "./common.types"
import { PlayerRole } from "./match.types"

// Player entity types
export interface Player extends BaseEntity {
  userId: string
  battingStyle?: string
  bowlingType?: string
  bowlingArm?: string
  wicketkeeping: boolean
  preferredPosition?: string
  battingPosition?: number
  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL'
  age?: number
  height?: number
  weight?: number
  preferredRoles: PlayerRole[]
  isAvailable: boolean
  rating?: number
  user: {
    id: string
    name: string
    email: string
    phoneNumber?: string
    profilePicture?: string
    location?: string
    coins: number
    isVerified: boolean
    isBanned: boolean
  }
  stats?: PlayerStats
}

export interface PlayerResponse extends Player {
  // Additional response fields
  teams?: any[]
  achievements?: PlayerAchievement[]
  skills?: PlayerSkill[]
  availability?: PlayerAvailability
  performance?: PlayerPerformance
}

// Player creation and update types
export interface CreatePlayerRequest {
  userId: string
  name: string
  battingStyle?: string
  bowlingType?: string
  bowlingArm?: string
  wicketkeeping?: boolean
  preferredPosition?: string
  battingPosition?: number
  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL'
  age?: number
  height?: number
  weight?: number
  preferredRoles: PlayerRole[]
}

export interface UpdatePlayerRequest {
  battingStyle?: string
  bowlingType?: string
  bowlingArm?: string
  wicketkeeping?: boolean
  preferredPosition?: string
  battingPosition?: number
  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL'
  age?: number
  height?: number
  weight?: number
  preferredRoles?: PlayerRole[]
  isAvailable?: boolean
  rating?: number
}

// Player search and filter types
export interface PlayerFilters {
  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL'
  preferredRoles?: PlayerRole[]
  isAvailable?: boolean
  minRating?: number
  maxRating?: number
  minAge?: number
  maxAge?: number
  location?: string
  battingStyle?: string
  bowlingType?: string
  wicketkeeping?: boolean
}

// Player statistics types
export interface PlayerStats {
  playerId: string
  totalMatches: number
  totalRuns: number
  totalWickets: number
  battingAverage: number
  bowlingAverage: number
  strikeRate: number
  economyRate: number
  highestScore?: number
  bestBowling?: {
    wickets: number
    runs: number
  }
  catches: number
  stumpings: number
  runOuts: number
  fifties: number
  hundreds: number
  fiveWickets: number
  tenWickets: number
  manOfTheMatch: number
  tournamentsWon: number
  matchesWon: number
  winPercentage: number
}

// Player performance types
export interface PlayerPerformance {
  playerId: string
  period: string
  matches: number
  runs: number
  wickets: number
  average: number
  strikeRate: number
  economyRate: number
  form: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR'
  recentMatches: {
    matchId: string
    runs: number
    wickets: number
    result: 'WIN' | 'LOSS' | 'DRAW'
    date: Date
  }[]
}

// Player ranking types
export interface PlayerRanking {
  playerId: string
  name: string
  category: string
  rank: number
  score: number
  period: string
  previousRank?: number
  change?: number
}

// Player achievement types
export interface PlayerAchievement {
  id: string
  playerId: string
  achievementType: 'TOURNAMENT_WIN' | 'MATCH_WIN' | 'PERFECT_GAME' | 'STREAK' | 'COINS_EARNED' | 'CENTURY' | 'FIFTY' | 'HAT_TRICK' | 'FIVE_WICKETS' | 'MAN_OF_THE_MATCH'
  title: string
  description: string
  icon: string
  earnedAt: Date
  metadata?: Record<string, any>
}

// Player skill types
export interface PlayerSkill {
  id: string
  playerId: string
  skillType: 'BATTING' | 'BOWLING' | 'FIELDING' | 'WICKET_KEEPING' | 'LEADERSHIP' | 'STRATEGY'
  skillName: string
  level: number // 1-10
  description: string
  lastUpdated: Date
}

// Player availability types
export interface PlayerAvailability {
  playerId: string
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'INJURED' | 'SUSPENDED'
  reason?: string
  availableFrom?: Date
  availableUntil?: Date
  preferredDays?: string[]
  preferredTimes?: string[]
  maxMatchesPerWeek?: number
  lastUpdated: Date
} 