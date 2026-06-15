const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10d'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  adminId?: string
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  })
}

export const verifyToken = (token: string): JWTPayload => {
  const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
  return decoded
}

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
}

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.decode(token) as JWTPayload
    return decoded
  } catch {
    console.log('Failed to decode token')
    return null
  }
}
