import { BaseEntity } from "./common.types"

// Chat room entity types
export interface ChatRoom extends BaseEntity {
  name: string
  type: ChatRoomType
  description?: string
  imageUrl?: string
  createdBy: string
  participants: ChatParticipant[]
  lastMessage?: ChatMessage
  unreadCount: number
  isActive: boolean
  isPrivate: boolean
  maxParticipants?: number
  metadata?: Record<string, any>
}

export interface ChatRoomResponse extends ChatRoom {
  creator: {
    id: string
    name: string
    profilePicture?: string
  }
  participants: ChatParticipantResponse[]
  lastMessage?: ChatMessageResponse
}

// Chat room types
export type ChatRoomType = 'PRIVATE' | 'GROUP' | 'TOURNAMENT' | 'TEAM' | 'MATCH' | 'SUPPORT' | 'ANNOUNCEMENT'

// Chat participant types
export interface ChatParticipant extends BaseEntity {
  roomId: string
  userId: string
  role: ParticipantRole
  joinedAt: Date
  leftAt?: Date
  isActive: boolean
  lastReadAt?: Date
  unreadCount: number
  isMuted: boolean
  isBlocked: boolean
  metadata?: Record<string, any>
}

export interface ChatParticipantResponse extends ChatParticipant {
  user: {
    id: string
    name: string
    profilePicture?: string
    isOnline: boolean
    lastSeen?: Date
  }
}

export type ParticipantRole = 'ADMIN' | 'MODERATOR' | 'MEMBER' | 'VIEWER'

// Chat message types
export interface ChatMessage extends BaseEntity {
  roomId: string
  senderId: string
  content: string
  messageType: MessageType
  status: MessageStatus
  replyTo?: string
  editedAt?: Date
  deletedAt?: Date
  metadata?: Record<string, any>
  reactions: MessageReaction[]
  attachments: MessageAttachment[]
  mentions: string[]
  hashtags: string[]
}

export interface ChatMessageResponse extends ChatMessage {
  sender: {
    id: string
    name: string
    profilePicture?: string
  }
  replyToMessage?: ChatMessageResponse
  reactions: MessageReactionResponse[]
  attachments: MessageAttachmentResponse[]
}

// Message types and status
export type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE' | 'LOCATION' | 'CONTACT' | 'STICKER' | 'GIF' | 'POLL'
export type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'PENDING'

// Message reaction types
export interface MessageReaction {
  id: string
  messageId: string
  userId: string
  emoji: string
  createdAt: Date
}

export interface MessageReactionResponse extends MessageReaction {
  user: {
    id: string
    name: string
    profilePicture?: string
  }
}

// Message attachment types
export interface MessageAttachment {
  id: string
  messageId: string
  type: AttachmentType
  url: string
  filename: string
  size: number
  mimeType: string
  duration?: number
  width?: number
  height?: number
  thumbnailUrl?: string
  metadata?: Record<string, any>
}

export interface MessageAttachmentResponse extends MessageAttachment {
  // Additional response fields if needed
}

export type AttachmentType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE' | 'DOCUMENT' | 'LOCATION' | 'CONTACT'

// Notification types
export interface Notification extends BaseEntity {
  userId: string
  type: NotificationType
  title: string
  body: string
  data?: Record<string, any>
  imageUrl?: string
  actionUrl?: string
  priority: NotificationPriority
  status: NotificationStatus
  readAt?: Date
  deliveredAt?: Date
  scheduledAt?: Date
  expiresAt?: Date
  metadata?: Record<string, any>
}

export interface NotificationResponse extends Notification {
  user: {
    id: string
    name: string
    email: string
  }
}

// Notification types and status
export type NotificationType = 
  | 'TOURNAMENT_INVITE'
  | 'TOURNAMENT_STARTED'
  | 'TOURNAMENT_COMPLETED'
  | 'MATCH_SCHEDULED'
  | 'MATCH_STARTED'
  | 'MATCH_COMPLETED'
  | 'TEAM_INVITE'
  | 'TEAM_JOINED'
  | 'TEAM_LEFT'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'WITHDRAWAL_SUCCESS'
  | 'WITHDRAWAL_FAILED'
  | 'BET_PLACED'
  | 'BET_WON'
  | 'BET_LOST'
  | 'CHAT_MESSAGE'
  | 'MENTION'
  | 'REACTION'
  | 'FRIEND_REQUEST'
  | 'FRIEND_ACCEPTED'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'LEVEL_UP'
  | 'SYSTEM_ANNOUNCEMENT'
  | 'SECURITY_ALERT'
  | 'VERIFICATION_REQUIRED'
  | 'ACCOUNT_SUSPENDED'
  | 'PASSWORD_CHANGED'
  | 'LOGIN_ALERT'

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
export type NotificationStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'CANCELLED'

// Push notification types
export interface PushNotification {
  id: string
  userId: string
  deviceToken: string
  platform: PushPlatform
  title: string
  body: string
  data?: Record<string, any>
  imageUrl?: string
  actionUrl?: string
  priority: NotificationPriority
  status: PushNotificationStatus
  sentAt?: Date
  deliveredAt?: Date
  failedAt?: Date
  failureReason?: string
  retryCount: number
  maxRetries: number
}

export type PushPlatform = 'IOS' | 'ANDROID' | 'WEB'
export type PushNotificationStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'CANCELLED'

// Email notification types
export interface EmailNotification {
  id: string
  userId: string
  to: string
  subject: string
  htmlBody: string
  textBody?: string
  attachments?: EmailAttachment[]
  status: EmailNotificationStatus
  sentAt?: Date
  deliveredAt?: Date
  failedAt?: Date
  failureReason?: string
  retryCount: number
  maxRetries: number
}

export interface EmailAttachment {
  filename: string
  content: Buffer | string
  contentType: string
}

export type EmailNotificationStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'CANCELLED'

// SMS notification types
export interface SmsNotification {
  id: string
  userId: string
  to: string
  message: string
  status: SmsNotificationStatus
  sentAt?: Date
  deliveredAt?: Date
  failedAt?: Date
  failureReason?: string
  retryCount: number
  maxRetries: number
}

export type SmsNotificationStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'CANCELLED'

// Request/Response types
export interface CreateChatRoomRequest {
  name: string
  type: ChatRoomType
  description?: string
  imageUrl?: string
  participants: string[]
  isPrivate?: boolean
  maxParticipants?: number
  metadata?: Record<string, any>
}

export interface UpdateChatRoomRequest {
  name?: string
  description?: string
  imageUrl?: string
  isPrivate?: boolean
  maxParticipants?: number
  metadata?: Record<string, any>
}

export interface ChatRoomFilters {
  type?: ChatRoomType[]
  createdBy?: string
  participants?: string[]
  isActive?: boolean
  isPrivate?: boolean
  hasUnreadMessages?: boolean
}

export interface AddParticipantRequest {
  roomId: string
  userId: string
  role?: ParticipantRole
}

export interface RemoveParticipantRequest {
  roomId: string
  userId: string
}

export interface UpdateParticipantRequest {
  roomId: string
  userId: string
  role?: ParticipantRole
  isMuted?: boolean
  isBlocked?: boolean
}

export interface SendMessageRequest {
  roomId: string
  content: string
  messageType: MessageType
  replyTo?: string
  mentions?: string[]
  hashtags?: string[]
  attachments?: CreateAttachmentRequest[]
  metadata?: Record<string, any>
}

export interface CreateAttachmentRequest {
  type: AttachmentType
  url: string
  filename: string
  size: number
  mimeType: string
  duration?: number
  width?: number
  height?: number
  thumbnailUrl?: string
  metadata?: Record<string, any>
}

export interface UpdateMessageRequest {
  content?: string
  metadata?: Record<string, any>
}

export interface ReactToMessageRequest {
  messageId: string
  emoji: string
}

export interface RemoveReactionRequest {
  messageId: string
  emoji: string
}

export interface CreateNotificationRequest {
  userId: string
  type: NotificationType
  title: string
  body: string
  data?: Record<string, any>
  imageUrl?: string
  actionUrl?: string
  priority?: NotificationPriority
  scheduledAt?: Date
  expiresAt?: Date
  metadata?: Record<string, any>
}

export interface UpdateNotificationRequest {
  status?: NotificationStatus
  readAt?: Date
  deliveredAt?: Date
}

export interface NotificationFilters {
  userId?: string
  type?: NotificationType[]
  status?: NotificationStatus[]
  priority?: NotificationPriority[]
  unreadOnly?: boolean
  startDate?: Date
  endDate?: Date
}

export interface CreatePushNotificationRequest {
  userId: string
  deviceToken: string
  platform: PushPlatform
  title: string
  body: string
  data?: Record<string, any>
  imageUrl?: string
  actionUrl?: string
  priority?: NotificationPriority
  scheduledAt?: Date
}

export interface CreateEmailNotificationRequest {
  userId: string
  to: string
  subject: string
  htmlBody: string
  textBody?: string
  attachments?: EmailAttachment[]
  scheduledAt?: Date
}

export interface CreateSmsNotificationRequest {
  userId: string
  to: string
  message: string
  scheduledAt?: Date
}

// Chat statistics types
export interface ChatStatistics {
  totalRooms: number
  activeRooms: number
  totalMessages: number
  totalParticipants: number
  messagesByType: Record<MessageType, number>
  roomsByType: Record<ChatRoomType, number>
  averageMessagesPerRoom: number
  averageParticipantsPerRoom: number
}

export interface NotificationStatistics {
  totalNotifications: number
  sentNotifications: number
  deliveredNotifications: number
  readNotifications: number
  failedNotifications: number
  notificationsByType: Record<NotificationType, number>
  notificationsByPriority: Record<NotificationPriority, number>
  averageDeliveryTime: number
}

// WebSocket message types
export interface ChatWebSocketMessage<T = any> {
  id: string
  type: WebSocketMessageType
  roomId?: string
  userId?: string
  data: T
  timestamp: Date
}

export type WebSocketMessageType = 
  | 'MESSAGE_SENT'
  | 'MESSAGE_DELIVERED'
  | 'MESSAGE_READ'
  | 'TYPING_START'
  | 'TYPING_STOP'
  | 'USER_JOINED'
  | 'USER_LEFT'
  | 'USER_ONLINE'
  | 'USER_OFFLINE'
  | 'REACTION_ADDED'
  | 'REACTION_REMOVED'
  | 'ROOM_CREATED'
  | 'ROOM_UPDATED'
  | 'ROOM_DELETED'
  | 'NOTIFICATION_RECEIVED'
  | 'NOTIFICATION_READ'
  | 'PUSH_NOTIFICATION_SENT'
  | 'EMAIL_NOTIFICATION_SENT'
  | 'SMS_NOTIFICATION_SENT'

// Chat search types
export interface ChatSearchParams {
  query?: string
  roomId?: string
  senderId?: string
  messageType?: MessageType[]
  startDate?: Date
  endDate?: Date
  hasAttachments?: boolean
  hasReactions?: boolean
  isEdited?: boolean
  isDeleted?: boolean
}

// Notification template types
export interface NotificationTemplate {
  id: string
  name: string
  type: NotificationType
  title: string
  body: string
  variables: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NotificationTemplateResponse extends NotificationTemplate {
  // Additional response fields if needed
}

// Notification preference types
export interface NotificationPreference {
  id: string
  userId: string
  type: NotificationType
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NotificationPreferenceResponse extends NotificationPreference {
  // Additional response fields if needed
}

// Device registration types
export interface DeviceRegistration {
  id: string
  userId: string
  deviceToken: string
  platform: PushPlatform
  deviceId: string
  deviceName?: string
  deviceModel?: string
  osVersion?: string
  appVersion?: string
  isActive: boolean
  lastSeen: Date
  createdAt: Date
  updatedAt: Date
}

export interface DeviceRegistrationResponse extends DeviceRegistration {
  // Additional response fields if needed
}
