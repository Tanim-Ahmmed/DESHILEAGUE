import { BaseEntity, Status } from "./common.types"

// Wallet entity types
export interface Wallet extends BaseEntity {
  userId: string
  balance: number
  currency: string
  isActive: boolean
  lastTransactionDate?: Date
  totalDeposits: number
  totalWithdrawals: number
  totalSpent: number
  totalEarned: number
}

export interface WalletResponse extends Wallet {
  user: {
    id: string
    name: string
    email: string
  }
  recentTransactions: Transaction[]
}

// Transaction entity types
export interface Transaction extends BaseEntity {
  walletId: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  description: string
  reference: string
  externalReference?: string
  paymentMethod?: PaymentMethod
  fee: number
  netAmount: number
  metadata?: Record<string, any>
  processedAt?: Date
  failedAt?: Date
  failureReason?: string
}

export interface TransactionResponse extends Transaction {
  wallet: {
    id: string
    userId: string
    balance: number
  }
  user: {
    id: string
    name: string
    email: string
  }
}

// Transaction types and status
export type TransactionType = 
  | 'DEPOSIT'
  | 'WITHDRAWAL'
  | 'PAYMENT'
  | 'REFUND'
  | 'TRANSFER'
  | 'TOURNAMENT_ENTRY'
  | 'TOURNAMENT_WINNING'
  | 'MATCH_BETTING'
  | 'MATCH_WINNING'
  | 'BONUS'
  | 'PENALTY'
  | 'ADMIN_ADJUSTMENT'

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'

// Payment method types
export interface PaymentMethod {
  id: string
  userId: string
  type: PaymentMethodType
  provider: PaymentProvider
  accountNumber?: string
  cardNumber?: string
  cardBrand?: string
  cardLast4?: string
  cardExpiryMonth?: number
  cardExpiryYear?: number
  bankName?: string
  bankCode?: string
  accountName?: string
  isDefault: boolean
  isVerified: boolean
  metadata?: Record<string, any>
}

export type PaymentMethodType = 'CARD' | 'BANK_ACCOUNT' | 'WALLET' | 'UPI' | 'PAYTM' | 'GOOGLE_PAY' | 'PHONE_PE'
export type PaymentProvider = 'STRIPE' | 'PAYPAL' | 'RAZORPAY' | 'PAYTM' | 'GOOGLE_PAY' | 'PHONE_PE' | 'BANK_TRANSFER'

// Payment intent types
export interface PaymentIntent {
  id: string
  userId: string
  amount: number
  currency: string
  status: PaymentIntentStatus
  paymentMethodId?: string
  description: string
  metadata?: Record<string, any>
  expiresAt: Date
  confirmedAt?: Date
  cancelledAt?: Date
  failureReason?: string
}

export type PaymentIntentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'FAILED'

// Tournament payment types
export interface TournamentPayment {
  id: string
  tournamentId: string
  teamId: string
  userId: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethodId?: string
  transactionId?: string
  paidAt?: Date
  refundedAt?: Date
  refundAmount?: number
  refundReason?: string
}

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED'

// Betting types
export interface Bet {
  id: string
  userId: string
  matchId: string
  tournamentId?: string
  type: BetType
  amount: number
  odds: number
  potentialWinnings: number
  status: BetStatus
  selection: BetSelection
  placedAt: Date
  settledAt?: Date
  wonAmount?: number
  lostAmount?: number
  cancelledAt?: Date
  cancellationReason?: string
}

export type BetType = 'MATCH_WINNER' | 'TOSS_WINNER' | 'TOTAL_RUNS' | 'TOTAL_WICKETS' | 'PLAYER_PERFORMANCE' | 'OVER_UNDER'
export type BetStatus = 'PENDING' | 'ACTIVE' | 'WON' | 'LOST' | 'CANCELLED' | 'VOID'
export type BetSelection = 'TEAM1' | 'TEAM2' | 'DRAW' | 'OVER' | 'UNDER' | 'PLAYER_SPECIFIC'

// Request/Response types
export interface CreateWalletRequest {
  userId: string
  currency: string
}

export interface UpdateWalletRequest {
  balance?: number
  isActive?: boolean
}

export interface WalletFilters {
  userId?: string
  isActive?: boolean
  minBalance?: number
  maxBalance?: number
  currency?: string
}

export interface CreateTransactionRequest {
  walletId: string
  type: TransactionType
  amount: number
  currency: string
  description: string
  reference: string
  externalReference?: string
  paymentMethodId?: string
  metadata?: Record<string, any>
}

export interface UpdateTransactionRequest {
  status?: TransactionStatus
  processedAt?: Date
  failedAt?: Date
  failureReason?: string
}

export interface TransactionFilters {
  walletId?: string
  userId?: string
  type?: TransactionType[]
  status?: TransactionStatus[]
  minAmount?: number
  maxAmount?: number
  startDate?: Date
  endDate?: Date
  currency?: string
}

export interface CreatePaymentMethodRequest {
  userId: string
  type: PaymentMethodType
  provider: PaymentProvider
  accountNumber?: string
  cardNumber?: string
  cardBrand?: string
  cardExpiryMonth?: number
  cardExpiryYear?: number
  bankName?: string
  bankCode?: string
  accountName?: string
  isDefault?: boolean
  metadata?: Record<string, any>
}

export interface UpdatePaymentMethodRequest {
  isDefault?: boolean
  isVerified?: boolean
  metadata?: Record<string, any>
}

export interface PaymentMethodFilters {
  userId?: string
  type?: PaymentMethodType[]
  provider?: PaymentProvider[]
  isDefault?: boolean
  isVerified?: boolean
}

export interface CreatePaymentIntentRequest {
  userId: string
  amount: number
  currency: string
  description: string
  paymentMethodId?: string
  metadata?: Record<string, any>
  expiresInMinutes?: number
}

export interface ConfirmPaymentIntentRequest {
  paymentIntentId: string
  paymentMethodId: string
  metadata?: Record<string, any>
}

export interface PaymentIntentFilters {
  userId?: string
  status?: PaymentIntentStatus[]
  minAmount?: number
  maxAmount?: number
  startDate?: Date
  endDate?: Date
  currency?: string
}

export interface CreateTournamentPaymentRequest {
  tournamentId: string
  teamId: string
  userId: string
  amount: number
  currency: string
  paymentMethodId?: string
}

export interface UpdateTournamentPaymentRequest {
  status?: PaymentStatus
  paidAt?: Date
  refundedAt?: Date
  refundAmount?: number
  refundReason?: string
}

export interface TournamentPaymentFilters {
  tournamentId?: string
  teamId?: string
  userId?: string
  status?: PaymentStatus[]
  minAmount?: number
  maxAmount?: number
  startDate?: Date
  endDate?: Date
}

export interface CreateBetRequest {
  userId: string
  matchId: string
  tournamentId?: string
  type: BetType
  amount: number
  odds: number
  selection: BetSelection
  metadata?: Record<string, any>
}

export interface UpdateBetRequest {
  status?: BetStatus
  settledAt?: Date
  wonAmount?: number
  lostAmount?: number
  cancelledAt?: Date
  cancellationReason?: string
}

export interface BetFilters {
  userId?: string
  matchId?: string
  tournamentId?: string
  type?: BetType[]
  status?: BetStatus[]
  minAmount?: number
  maxAmount?: number
  startDate?: Date
  endDate?: Date
}

// Statistics types
export interface WalletStatistics {
  totalWallets: number
  activeWallets: number
  totalBalance: number
  averageBalance: number
  totalTransactions: number
  totalDeposits: number
  totalWithdrawals: number
  totalSpent: number
  totalEarned: number
  currencyBreakdown: Record<string, number>
}

export interface TransactionStatistics {
  totalTransactions: number
  completedTransactions: number
  failedTransactions: number
  pendingTransactions: number
  totalAmount: number
  averageAmount: number
  transactionsByType: Record<TransactionType, number>
  transactionsByStatus: Record<TransactionStatus, number>
  transactionsByCurrency: Record<string, number>
}

export interface PaymentStatistics {
  totalPayments: number
  successfulPayments: number
  failedPayments: number
  totalAmount: number
  averageAmount: number
  paymentsByMethod: Record<PaymentMethodType, number>
  paymentsByProvider: Record<PaymentProvider, number>
  paymentsByStatus: Record<PaymentStatus, number>
}

export interface BettingStatistics {
  totalBets: number
  activeBets: number
  wonBets: number
  lostBets: number
  totalAmount: number
  totalWinnings: number
  totalLosses: number
  averageOdds: number
  betsByType: Record<BetType, number>
  betsByStatus: Record<BetStatus, number>
}

// Notification types
export interface PaymentNotification {
  id: string
  userId: string
  type: PaymentNotificationType
  title: string
  message: string
  data?: Record<string, any>
  createdAt: Date
  readBy: string[]
}

export type PaymentNotificationType = 
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'WITHDRAWAL_SUCCESS'
  | 'WITHDRAWAL_FAILED'
  | 'DEPOSIT_SUCCESS'
  | 'DEPOSIT_FAILED'
  | 'REFUND_PROCESSED'
  | 'BET_PLACED'
  | 'BET_WON'
  | 'BET_LOST'
  | 'BET_CANCELLED'
  | 'LOW_BALANCE'
  | 'HIGH_BALANCE'
  | 'SUSPICIOUS_ACTIVITY'
  | 'PAYMENT_METHOD_ADDED'
  | 'PAYMENT_METHOD_VERIFIED'
  | 'PAYMENT_METHOD_REMOVED'

// Audit types
export interface PaymentAuditLog extends BaseEntity {
  userId: string
  action: PaymentAuditAction
  resourceType: 'WALLET' | 'TRANSACTION' | 'PAYMENT_METHOD' | 'PAYMENT_INTENT' | 'BET'
  resourceId: string
  oldValue?: any
  newValue?: any
  ipAddress?: string
  userAgent?: string
  metadata?: Record<string, any>
}

export type PaymentAuditAction = 
  | 'WALLET_CREATED'
  | 'WALLET_UPDATED'
  | 'TRANSACTION_CREATED'
  | 'TRANSACTION_UPDATED'
  | 'PAYMENT_METHOD_ADDED'
  | 'PAYMENT_METHOD_UPDATED'
  | 'PAYMENT_METHOD_REMOVED'
  | 'PAYMENT_INTENT_CREATED'
  | 'PAYMENT_INTENT_CONFIRMED'
  | 'PAYMENT_INTENT_CANCELLED'
  | 'BET_PLACED'
  | 'BET_SETTLED'
  | 'BET_CANCELLED'
  | 'REFUND_PROCESSED'
  | 'ADMIN_ADJUSTMENT'

// Fee structure types
export interface FeeStructure {
  id: string
  type: FeeType
  percentage: number
  fixedAmount: number
  minAmount: number
  maxAmount: number
  currency: string
  isActive: boolean
  applicableFrom: Date
  applicableTo?: Date
}

export type FeeType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'BETTING' | 'TOURNAMENT_ENTRY'

// Exchange rate types
export interface ExchangeRate {
  id: string
  fromCurrency: string
  toCurrency: string
  rate: number
  lastUpdated: Date
  source: string
  isActive: boolean
}

// KYC types
export interface KYCVerification {
  id: string
  userId: string
  type: KYCType
  status: KYCStatus
  documentType: DocumentType
  documentNumber: string
  documentImage: string
  submittedAt: Date
  verifiedAt?: Date
  verifiedBy?: string
  rejectedAt?: Date
  rejectionReason?: string
}

export type KYCType = 'IDENTITY' | 'ADDRESS' | 'INCOME' | 'BANK_ACCOUNT'
export type KYCStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'
export type DocumentType = 'AADHAR' | 'PAN' | 'PASSPORT' | 'DRIVERS_LICENSE' | 'VOTER_ID' | 'BANK_STATEMENT' | 'UTILITY_BILL'

// Compliance types
export interface ComplianceCheck {
  id: string
  userId: string
  type: ComplianceType
  status: ComplianceStatus
  riskScore: number
  checkDate: Date
  details: Record<string, any>
  flaggedAt?: Date
  resolvedAt?: Date
  resolutionNotes?: string
}

export type ComplianceType = 'AML' | 'KYC' | 'FRAUD' | 'LIMIT' | 'PATTERN'
export type ComplianceStatus = 'PASSED' | 'FAILED' | 'FLAGGED' | 'UNDER_REVIEW'
