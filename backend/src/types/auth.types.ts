import { UserRole } from "@prisma/client"
import { BaseEntity, ApiResult, JwtPayload } from "./common.types"
import { User, UserResponse } from "./user.types"

// Authentication request types
export interface SignupRequest {
  email: string
  password: string
  username: string
  role: UserRole
  phoneNumber?: string
  profilePicture?: string
  location?: string
}

export interface LoginRequest {
  emailOrUsername: string // Can be email or username
  password: string
}

export interface PhoneLoginRequest {
  phoneNumber: string
  otp: string
}

export interface OTPRequest {
  phoneNumber: string
}

export interface VerifyOTPRequest {
  phoneNumber: string
  otp: string
}

export interface GoogleSignInRequest {
  accessToken: string
  role: UserRole
}

export interface RefreshTokenRequest {
  refreshToken: string
}

// Authentication response types
export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: UserResponse
  tokens: AuthTokens
}

// Authentication result types
export type SignupResult = ApiResult<AuthResponse>
export type LoginResult = ApiResult<AuthResponse>
export type PhoneLoginResult = ApiResult<AuthResponse>
export type GoogleSignInResult = ApiResult<AuthResponse>
export type RefreshTokenResult = ApiResult<AuthTokens>
export type OTPResult = ApiResult<{ message: string }>
export type VerifyOTPResult = ApiResult<{ message: string }>

// Token payload types
export interface AccessTokenPayload extends JwtPayload {
  type: 'access'
}

export interface RefreshTokenPayload extends JwtPayload {
  type: 'refresh'
}

// Google OAuth types
export interface GoogleUserInfo {
  email: string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
  locale?: string
} 