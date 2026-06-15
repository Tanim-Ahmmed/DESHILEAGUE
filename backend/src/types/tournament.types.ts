import { BaseEntity, Location } from "./common.types"
import { MatchStage, MatchStatus, TossDecision, WinningType, TeamScore, MatchHighlight, HighlightType, MatchStatistics, PlayerRole, MatchResult } from "./match.types"
import { PaymentStatus } from "./transaction.types"

// Tournament entity types
export interface Tournament extends BaseEntity {
  name: string
  description: string
  organizerId: string
  startDate: Date
  endDate: Date
  registrationDeadline: Date
  maxTeams: number
  minTeams: number
  entryFee: number
  prizePool: number
  status: TournamentStatus
  type: TournamentType
  format: TournamentFormat
  location: Location
  rules: string
  isPublic: boolean
  allowSpectators: boolean
  maxPlayersPerTeam: number
  minPlayersPerTeam: number
  currentTeams: number
  currentPlayers: number
  imageUrl?: string
  bannerUrl?: string
  prizePoolDetails?: {
    total: number;
    winner: number;
    runnerUp: number;
    thirdPlace?: number;
  };
  fieldDetails?: string;
}

export interface TournamentResponse extends Tournament {
  organizer: {
    id: string
    name: string
    email: string
  }
  teams: TournamentTeam[]
  matches: TournamentMatch[]
  statistics: TournamentStatistics
}

// Tournament status and types
export type TournamentStatus = 'DRAFT' | 'PUBLISHED' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type TournamentType = 'KNOCKOUT' | 'LEAGUE' | 'ROUND_ROBIN' | 'SWISS' | 'CUSTOM'
export type TournamentFormat = 'T20' | 'T10' | 'ODI' | 'TEST' | 'CUSTOM'

// Tournament team types
export interface TournamentTeam extends BaseEntity {
  tournamentId: string
  name: string
  captainId: string
  managerId: string
  players: TournamentPlayer[]
  status: TeamStatus
  registrationDate: Date
  paymentStatus: PaymentStatus
  logoUrl?: string
  jerseyColor?: string
  totalMatches: number
  wins: number
  losses: number
  draws: number
  points: number
  netRunRate: number
}

export type TeamStatus = 'REGISTERED' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN' | 'DISQUALIFIED'

// Tournament player types
export interface TournamentPlayer extends BaseEntity {
  tournamentId: string
  teamId: string
  playerId: string
  role: PlayerRole
  jerseyNumber: number
  isCaptain: boolean
  isViceCaptain: boolean
  registrationDate: Date
  status: PlayerStatus
  statistics: PlayerStatistics
}


export type PlayerStatus = 'REGISTERED' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN' | 'INJURED'

// Tournament match types
export interface TournamentMatch extends BaseEntity {
  tournamentId: string
  team1Id: string
  team2Id: string
  matchNumber: number
  round: number
  stage: MatchStage
  scheduledDate: Date
  actualStartDate?: Date
  actualEndDate?: Date
  venue: string
  tossWinner?: string
  tossDecision?: TossDecision
  status: MatchStatus
  result: MatchResult | null
  highlights: MatchHighlight[]
  statistics: MatchStatistics
}





// Statistics types
export interface TournamentStatistics {
  totalMatches: number
  completedMatches: number
  totalRuns: number
  totalWickets: number
  highestScore: number
  lowestScore: number
  mostRuns: PlayerStatistics
  mostWickets: PlayerStatistics
  bestBatsman: PlayerStatistics
  bestBowler: PlayerStatistics
  playerOfTheTournament?: string
}

export interface PlayerStatistics {
  matches: number
  runs: number
  wickets: number
  catches: number
  stumpings: number
  runOuts: number
  highestScore: number
  bestBowling: {
    wickets: number;
    runs: number;
  };
  average: number;
  strikeRate: number;
  economyRate: number;
}

// Request/Response types
export interface CreateTournamentRequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxTeams: number;
  minTeams: number;
  entryFee: number;
  prizePool: number;
  type: TournamentType;
  format: TournamentFormat;
  location: Location;
  rules: string;
  isPublic: boolean;
  allowSpectators: boolean;
  maxPlayersPerTeam: number;
  minPlayersPerTeam: number;
  imageUrl?: string;
  bannerUrl?: string;
  prizePoolDetails?: {
    total: number;
    winner: number;
    runnerUp: number;
    thirdPlace?: number;
  };
  fieldDetails?: string;
}

export interface UpdateTournamentRequest {
  name?: string
  description?: string
  startDate?: Date
  endDate?: Date
  registrationDeadline?: Date
  maxTeams?: number
  minTeams?: number
  entryFee?: number
  prizePool?: number
  type?: TournamentType
  format?: TournamentFormat
  location?: Location
  rules?: string
  isPublic?: boolean
  allowSpectators?: boolean
  maxPlayersPerTeam?: number
  minPlayersPerTeam?: number
  imageUrl?: string
  bannerUrl?: string
  prizePoolDetails?: {
    total: number;
    winner: number;
    runnerUp: number;
    thirdPlace?: number;
  };
  fieldDetails?: string;
}

export interface TournamentFilters {
  status?: TournamentStatus[]
  type?: TournamentType[]
  format?: TournamentFormat[]
  organizerId?: string
  isPublic?: boolean
  startDate?: Date
  endDate?: Date
  minEntryFee?: number
  maxEntryFee?: number
  location?: string
}

export interface TournamentSearchParams {
  query?: string
  status?: TournamentStatus
  type?: TournamentType
  format?: TournamentFormat
  organizerId?: string
  isPublic?: boolean
  startDate?: Date
  endDate?: Date
  minEntryFee?: number
  maxEntryFee?: number
  location?: string
}

// Team registration types
export interface RegisterTeamRequest {
  tournamentId: string
  name: string
  captainId: string
  managerId: string
  players: RegisterPlayerRequest[]
  logoUrl?: string
  jerseyColor?: string
}

export interface RegisterPlayerRequest {
  playerId: string
  role: PlayerRole
  jerseyNumber: number
  isCaptain: boolean
  isViceCaptain: boolean
}

export interface UpdateTeamRequest {
  name?: string
  captainId?: string
  managerId?: string
  logoUrl?: string
  jerseyColor?: string
}



// Tournament statistics types
export interface TournamentStats {
  totalTournaments: number
  activeTournaments: number
  completedTournaments: number
  totalTeams: number
  totalPlayers: number
  totalMatches: number
  totalPrizeMoney: number
  averageEntryFee: number
  tournamentsByType: Record<TournamentType, number>
  tournamentsByStatus: Record<TournamentStatus, number>
}

// Tournament leaderboard types
export interface TournamentLeaderboardEntry {
  teamId: string
  teamName: string
  captainName: string
  matches: number
  wins: number
  losses: number
  draws: number
  points: number
  netRunRate: number
  rank: number
}

// Tournament notification types
export interface TournamentNotification {
  id: string
  tournamentId: string
  type: TournamentNotificationType
  title: string
  message: string
  data?: Record<string, any>
  createdAt: Date
  readBy: string[]
}

export interface UpdateTeamResult {
  success: boolean;
  message: string;
  data?: any; // Add this field
}

export type TournamentNotificationType = 
  | 'REGISTRATION_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'TOURNAMENT_STARTED'
  | 'TOURNAMENT_COMPLETED'
  | 'MATCH_SCHEDULED'
  | 'MATCH_RESULT'
  | 'TEAM_APPROVED'
  | 'TEAM_REJECTED'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_FAILED'