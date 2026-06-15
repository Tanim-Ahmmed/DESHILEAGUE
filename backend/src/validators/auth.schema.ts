import { z } from 'zod'

export const sendOTPSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\+88)?01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
})

export const verifyOTPSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\+88)?01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username too long')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  role: z
    .string({
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
    })
    .transform((val) => val.toUpperCase())
    .refine((val) => ['ORGANIZER', 'MANAGER', 'PLAYER'].includes(val), {
      message: 'Role must be one of ORGANIZER, MANAGER, or PLAYER',
    }),
  phoneNumber: z
    .string()
    .regex(/^(\+88)?01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number')
    .optional(),
  profilePicture: z.string().url().optional(),
  location: z
    .string({ message: 'We need your location' })
    .min(2, 'We need your location')
    .max(100)
    .optional(),
})

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
})

export const googleSignupSchema = z.object({
  accessToken: z.string({
    required_error: 'Access token is required',
    invalid_type_error: 'Access token must be a string',
  }),
  role: z
    .string({
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
    })
    .transform((val) => val.toUpperCase())
    .refine((val) => ['ORGANIZER', 'MANAGER', 'PLAYER'].includes(val), {
      message: 'Role must be one of ORGANIZER, MANAGER, or PLAYER',
    }),
})

export const googleLoginSchema = z.object({
  accessToken: z.string({
    required_error: 'Access token is required',
    invalid_type_error: 'Access token must be a string',
  }),
})



export const refreshTokenSchema = z.object({
  refreshToken: z
    .string({
      required_error: 'Refresh token is required',
      invalid_type_error: 'Refresh token must be a string',
    })
    .min(1, 'Refresh token cannot be empty'),
})
