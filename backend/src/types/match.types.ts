import { BaseEntity, Location } from "./common.types"

// Match entity types
export interface Match extends BaseEntity {
  tournamentId?: string
  team1Id: string
  team2Id: string
  matchNumber: number
  round: number
  stage: MatchStage
  scheduledDate: Date
  actualStartDate?: Date
  actualEndDate?: Date
  venue: string
  location: Location
  tossWinner?: string
  tossDecision?: TossDecision
  status: MatchStatus
  result?: MatchResult
  highlights: MatchHighlight[]
  statistics: MatchStatistics
  umpires: Umpire[]
  commentators: Commentator[]
  streamUrl?: string
  isLive: boolean
  currentInnings?: number
  currentOver?: number
  currentBall?: number
}

export interface MatchResponse extends Match {
  team1: TeamInfo
  team2: TeamInfo
  tournament?: TournamentInfo
  liveScore?: LiveScore
  commentary: Commentary[]
}

// Match status and types
export type MatchStage = 'GROUP' | 'QUARTER_FINAL' | 'SEMI_FINAL' | 'FINAL' | 'CONSOLATION' | 'FRIENDLY'
export type MatchStatus = 'SCHEDULED' | 'TOSS' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ABANDONED' | 'DRAWN'
export type TossDecision = 'BAT' | 'BOWL'

// Team information
export interface TeamInfo {
  id: string
  name: string
  captain: PlayerInfo
  players: PlayerInfo[]
  logoUrl?: string
  jerseyColor?: string
  score?: TeamScore
  battingOrder: number[]
  bowlingOrder: number[]
}

export interface PlayerInfo {
  id: string
  name: string
  role: PlayerRole
  jerseyNumber: number
  isCaptain: boolean
  isViceCaptain: boolean
  isPlaying: boolean
  statistics?: PlayerMatchStatistics
}

export type PlayerRole = 'BATSMAN' | 'BOWLER' | 'ALL_ROUNDER' | 'WICKET_KEEPER' | 'CAPTAIN'

// Tournament information
export interface TournamentInfo {
  id: string
  name: string
  type: string
  format: string
}

// Match result types
export interface MatchResult {
  winnerId?: string
  winningMargin: number
  winningType: WinningType
  team1Score: TeamScore
  team2Score: TeamScore
  playerOfTheMatch?: string
  highlights: string[]
  summary: string
  keyMoments: KeyMoment[]
}

export type WinningType = 'RUNS' | 'WICKETS' | 'SUPER_OVER' | 'DLS' | 'FORFEIT' | 'DRAW'

export interface TeamScore {
  runs: number
  wickets: number
  overs: number
  extras: {
    wides: number
    noBalls: number
    byes: number
    legByes: number
  }
  runRate: number
  requiredRunRate?: number
  target?: number
  battingOrder: BattingOrder[]
  bowlingOrder: BowlingOrder[]
}

// Batting and bowling order
export interface BattingOrder {
  playerId: string
  position: number
  runs: number
  balls: number
  fours: number
  sixes: number
  strikeRate: number
  dismissalType?: DismissalType
  dismissedBy?: string
  caughtBy?: string
  runOutBy?: string
  stumpedBy?: string
  lbwBy?: string
  bowledBy?: string
  hitWicketBy?: string
  obstructingTheField?: boolean
  handledTheBall?: boolean
  hitTheBallTwice?: boolean
  timedOut?: boolean
  retiredOut?: boolean
  retiredHurt?: boolean
  notOut?: boolean
}

export interface BowlingOrder {
  playerId: string
  overs: number
  maidens: number
  runs: number
  wickets: number
  economyRate: number
  extras: {
    wides: number
    noBalls: number
  }
  bowlingFigures: BowlingFigure[]
}

export interface BowlingFigure {
  over: number
  balls: number
  runs: number
  wickets: number
  extras: number
  dots: number
  fours: number
  sixes: number
}

export type DismissalType = 
  | 'CAUGHT'
  | 'BOWLED'
  | 'LBW'
  | 'RUN_OUT'
  | 'STUMPED'
  | 'HIT_WICKET'
  | 'OBSTRUCTING_THE_FIELD'
  | 'HANDLED_THE_BALL'
  | 'HIT_THE_BALL_TWICE'
  | 'TIMED_OUT'
  | 'RETIRED_OUT'
  | 'RETIRED_HURT'
  | 'NOT_OUT'

// Match highlight types
export interface MatchHighlight {
  id: string
  type: HighlightType
  description: string
  timestamp: Date
  playerId?: string
  teamId?: string
  over: number
  ball: number
  runs: number
  wickets: number
  extras?: number
  dismissalType?: DismissalType
  dismissedPlayer?: string
  dismissedBy?: string
  caughtBy?: string
  runOutBy?: string
  stumpedBy?: string
  lbwBy?: string
  bowledBy?: string
  hitWicketBy?: string
  videoUrl?: string
  imageUrl?: string
}

export type HighlightType = 
  | 'FOUR'
  | 'SIX'
  | 'WICKET'
  | 'CATCH'
  | 'RUN_OUT'
  | 'STUMPED'
  | 'LBW'
  | 'BOWLED'
  | 'CATCH_OUT'
  | 'HAT_TRICK'
  | 'CENTURY'
  | 'FIFTY'
  | 'MAIDEN_OVER'
  | 'WIDE'
  | 'NO_BALL'
  | 'BYE'
  | 'LEG_BYE'
  | 'DOT_BALL'
  | 'SINGLE'
  | 'DOUBLE'
  | 'TRIPLE'

// Key moments
export interface KeyMoment {
  id: string
  type: KeyMomentType
  description: string
  timestamp: Date
  over: number
  ball: number
  playerId?: string
  teamId?: string
  runs?: number
  wickets?: number
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
}

export type KeyMomentType = 
  | 'CENTURY'
  | 'FIFTY'
  | 'HAT_TRICK'
  | 'MAIDEN_OVER'
  | 'WICKET'
  | 'CATCH'
  | 'SIX'
  | 'FOUR'
  | 'RUN_OUT'
  | 'STUMPED'
  | 'LBW'
  | 'BOWLED'
  | 'TOSS'
  | 'MATCH_START'
  | 'MATCH_END'
  | 'INNINGS_BREAK'
  | 'DRINKS_BREAK'
  | 'RAIN_DELAY'
  | 'LIGHT_DELAY'

// Live score types
export interface LiveScore {
  currentInnings: number
  currentOver: number
  currentBall: number
  battingTeam: string
  bowlingTeam: string
  striker: string
  nonStriker: string
  bowler: string
  runs: number
  wickets: number
  overs: number
  runRate: number
  requiredRunRate?: number
  target?: number
  lastBall: BallResult | null
  thisOver: BallResult[]
  recentOvers: OverResult[]
  partnership: Partnership
  requiredRuns?: number
  requiredBalls?: number
  matchStatus: string
}

export interface BallResult {
  ball: number
  runs: number
  extras?: number
  wicket?: boolean
  dismissalType?: DismissalType
  dismissedPlayer?: string
  dismissedBy?: string
  caughtBy?: string
  runOutBy?: string
  stumpedBy?: string
  lbwBy?: string
  bowledBy?: string
  hitWicketBy?: string
  wide?: boolean
  noBall?: boolean
  bye?: boolean
  legBye?: boolean
  dot?: boolean
  four?: boolean
  six?: boolean
  single?: boolean
  double?: boolean
  triple?: boolean
  commentary: string
}

export interface OverResult {
  over: number
  runs: number
  wickets: number
  extras: number
  dots: number
  fours: number
  sixes: number
  balls: BallResult[]
}

export interface Partnership {
  runs: number
  balls: number
  players: string[]
  startTime: Date
}

// Commentary types
export interface Commentary {
  id: string
  timestamp: Date
  over: number
  ball: number
  runs: number
  wickets: number
  extras?: number
  commentary: string
  playerId?: string
  teamId?: string
  dismissalType?: DismissalType
  dismissedPlayer?: string
  dismissedBy?: string
  caughtBy?: string
  runOutBy?: string
  stumpedBy?: string
  lbwBy?: string
  bowledBy?: string
  hitWicketBy?: string
  wide?: boolean
  noBall?: boolean
  bye?: boolean
  legBye?: boolean
  dot?: boolean
  four?: boolean
  six?: boolean
  single?: boolean
  double?: boolean
  triple?: boolean
  highlight?: boolean
  keyMoment?: boolean
}

// Umpire and commentator types
export interface Umpire {
  id: string
  name: string
  role: UmpireRole
  country: string
  experience: number
}

export type UmpireRole = 'ON_FIELD' | 'THIRD_UMPIRE' | 'FOURTH_UMPIRE' | 'MATCH_REFEREE'

export interface Commentator {
  id: string
  name: string
  role: CommentatorRole
  country: string
  experience: number
}

export type CommentatorRole = 'PLAY_BY_PLAY' | 'COLOR_COMMENTATOR' | 'EXPERT_ANALYST'

// Statistics types
export interface MatchStatistics {
  totalRuns: number
  totalWickets: number
  totalOvers: number
  extras: number
  boundaries: number
  sixes: number
  runRate: number
  requiredRunRate?: number
  highestPartnership: number
  mostRuns: PlayerMatchStatistics
  mostWickets: PlayerMatchStatistics
  playerOfTheMatch?: string
  keyStatistics: KeyStatistic[]
}

export interface PlayerMatchStatistics {
  playerId: string
  name: string
  runs: number
  balls: number
  fours: number
  sixes: number
  strikeRate: number
  wickets: number
  overs: number
  maidens: number
  runsConceded: number
  economyRate: number
  catches: number
  stumpings: number
  runOuts: number
  highestScore?: number
  bestBowling?: {
    wickets: number
    runs: number
  }
}

export interface KeyStatistic {
  type: string
  value: number
  description: string
  playerId?: string
  teamId?: string
}

// Request/Response types
export interface CreateMatchRequest {
  tournamentId?: string
  team1Id: string
  team2Id: string
  scheduledDate: Date
  venue: string
  location: Location
  round: number
  stage: MatchStage
  umpires: string[]
  commentators: string[]
  streamUrl?: string
}

export interface UpdateMatchRequest {
  scheduledDate?: Date
  venue?: string
  location?: Location
  status?: MatchStatus
  tossWinner?: string
  tossDecision?: TossDecision
  umpires?: string[]
  commentators?: string[]
  streamUrl?: string
}

export interface MatchFilters {
  tournamentId?: string
  teamId?: string
  status?: MatchStatus[]
  stage?: MatchStage[]
  scheduledDate?: Date
  venue?: string
  isLive?: boolean
}

export interface MatchSearchParams {
  query?: string
  tournamentId?: string
  teamId?: string
  status?: MatchStatus
  stage?: MatchStage
  scheduledDate?: Date
  venue?: string
  isLive?: boolean
}

// Live match updates
export interface LiveMatchUpdate {
  matchId: string
  type: LiveUpdateType
  data: any
  timestamp: Date
}

export type LiveUpdateType = 
  | 'BALL_UPDATE'
  | 'WICKET_UPDATE'
  | 'OVER_UPDATE'
  | 'INNINGS_UPDATE'
  | 'MATCH_STATUS_UPDATE'
  | 'COMMENTARY_UPDATE'
  | 'HIGHLIGHT_UPDATE'
  | 'KEY_MOMENT_UPDATE'

// Match notification types
export interface MatchNotification {
  id: string
  matchId: string
  type: MatchNotificationType
  title: string
  message: string
  data?: Record<string, any>
  createdAt: Date
  readBy: string[]
}

export type MatchNotificationType = 
  | 'MATCH_STARTED'
  | 'MATCH_COMPLETED'
  | 'WICKET_FALLEN'
  | 'CENTURY_SCORED'
  | 'FIFTY_SCORED'
  | 'HAT_TRICK'
  | 'MAIDEN_OVER'
  | 'SIX_HIT'
  | 'FOUR_HIT'
  | 'CATCH_TAKEN'
  | 'RUN_OUT'
  | 'STUMPED'
  | 'LBW'
  | 'BOWLED'
  | 'TOSS_RESULT'
  | 'INNINGS_BREAK'
  | 'DRINKS_BREAK'
  | 'RAIN_DELAY'
  | 'LIGHT_DELAY'
