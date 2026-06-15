import { Router, type IRouter } from 'express'
import {
  authMiddleware,
  authRateLimiter,
  validateRequest,
} from '../../../middlewares'
import {
  googleLoginSchema,
  googleSignupSchema,
  loginSchema,
  refreshTokenSchema,
  sendOTPSchema,
  signupSchema,
  verifyOTPSchema,
} from '../../../validators'
import { AuthController } from '../controllers/auth.controller'

const router: IRouter = Router()
const authController = new AuthController()

// send otp route
router.post(
  '/send-otp',
  authRateLimiter,
  validateRequest({ body: sendOTPSchema }),
  authController.sendOTP
)
// verify otp route
router.post(
  '/verify-otp',
  authRateLimiter,
  validateRequest({ body: verifyOTPSchema }),
  authController.verifyOTP
)

// signup route
router.post(
  '/signup',
  authRateLimiter,
  validateRequest({ body: signupSchema }),
  authController.signup
)

// Google signup route
router.post(
  '/google-signup',
  authRateLimiter,
  validateRequest({ body: googleSignupSchema }),
  authController.googleSignup
)
// Google login route
router.post(
  '/google-login',
  authRateLimiter,
  validateRequest({ body: googleLoginSchema }),
  authController.googleLogin
)

// login route
router.post(
  '/login',
  authRateLimiter,
  validateRequest({ body: loginSchema }),
  authController.login
)

// refresh token route
router.post(
  '/refresh-token',
  authRateLimiter,
  validateRequest({ body: refreshTokenSchema }),
  authController.refreshToken
)

// me route
router.get('/me', authMiddleware, authController.getMe)

export { router as authRoutes }
