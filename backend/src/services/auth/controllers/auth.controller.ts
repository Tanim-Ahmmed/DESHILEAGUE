import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { sendSuccess, sendError } from "../../../utils";

export class AuthController {
  private authService = new AuthService();

  sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phoneNumber } = req.body;
      const result = await this.authService.sendOTP(phoneNumber);

      if (!result.success) {
        return sendError(res, result.message || "Failed to send OTP", 400);
      }

      sendSuccess(res, "OTP sent successfully", { expiresIn: "5 minutes" });
    } catch (error) {
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phoneNumber, otp } = req.body;
      const result = await this.authService.verifyOTP(phoneNumber, otp);

      if (!result.success) {
        return sendError(res, result.message || "OTP verification failed", 400);
      }

      sendSuccess(res, "OTP verified successfully", { verified: true });
    } catch (error) {
      next(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        email,
        password,
        username,
        name,
        role,
        phoneNumber,
        profilePicture,
        location,
      } = req.body;
      console.log("Request Body:", req.body);

      const result = await this.authService.signup({
        email,
        password,
        username,
        name,
        role,
        phoneNumber,
        profilePicture,
        location,
      });

      if (!result.success) {
        return sendError(res, result.message || "Signup failed", 400);
      }

      sendSuccess(res, "User created successfully", {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  googleSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, role } = req.body;
      const result = await this.authService.googleSignup(accessToken, role);

      if (!result.success) {
        return sendError(res, result.message || "Google signup failed", 400);
      }

      sendSuccess(res, "User signed up with Google successfully", {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      sendError(
        res,
        error instanceof Error
          ? error.message
          : "Failed to sign up with Google",
        400
      );
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.body;
      const result = await this.authService.googleLogin(accessToken);

      if (!result.success) {
        return sendError(res, result.message || "Google login failed", 400);
      }

      sendSuccess(res, "User logged in with Google successfully", {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Failed to log in with Google",
        400
      );
    }
  };

  

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { emailOrUsername, password } = req.body;
      const result = await this.authService.login(emailOrUsername, password);

      if (!result.success) {
        return sendError(res, result.message || "Login failed", 401);
      }

      sendSuccess(res, "Login successful", {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return sendError(res, "Refresh token required", 400);
      }

      const result = await this.authService.refreshToken(refreshToken);

      if (!result.success) {
        return sendError(res, result.message, 401);
      }

      sendSuccess(res, "Token refreshed successfully", {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;

      if (!user || !user.userId) {
        return sendError(res, "User not authenticated", 401);
      }

      const result = await this.authService.getMe(user.userId);

      if (!result.success) {
        return sendError(res, result.message || "User not found", 404);
      }

      sendSuccess(res, "User retrieved successfully", { user: result.user });
    } catch (error) {
      next(error);
    }
  };
}
