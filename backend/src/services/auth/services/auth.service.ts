import { UserRole } from "@prisma/client";
import { AuthRepository } from "../repositories/auth.repository";

import {
  generateOTP,
  sendOTP,
  hashPassword,
  comparePassword,
  generateRandomPassword,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  emailToUsername,
  JWTPayload,
} from "@/utils";
import { OAuth2Client } from "google-auth-library";
import redis from '@/utils/redis';

interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  name: string;
  username?: string;
  role: UserRole;
  coins: number;
  isVerified: boolean;
  isBanned?: boolean;
  profilePicture?: string;
  passwordHash: string;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  profilePicture?: string;
  location?: string;
}

type SuccessResult<T = undefined> = { success: true } & (T extends undefined
  ? {}
  : T);
type ErrorResult = { success: false; message: string };

type SignupResult =
  | SuccessResult<{
      user: Omit<User, "passwordHash">;
      accessToken: string;
      refreshToken: string;
    }>
  | ErrorResult;
type LoginResult =
  | SuccessResult<{
      user: Omit<User, "passwordHash">;
      accessToken: string;
      refreshToken: string;
    }>
  | ErrorResult;
type RefreshTokenResult =
  | SuccessResult<{ accessToken: string; refreshToken: string }>
  | ErrorResult;
type OTPResult = SuccessResult<{ message: string }> | ErrorResult;
type VerifyOTPResult = SuccessResult<{ message: string }> | ErrorResult;
type GoogleSignupResult =
  | SuccessResult<{
      user: Omit<User, "passwordHash">;
      accessToken: string;
      refreshToken: string;
    }>
  | ErrorResult;
type GoogleLoginResult =
  | SuccessResult<{
      user: Omit<User, "passwordHash">;
      accessToken: string;
      refreshToken: string;
    }>
  | ErrorResult;

export class AuthService {
  private authRepository = new AuthRepository();

  async sendOTP(phoneNumber: string): Promise<OTPResult> {
    try {
      const otp = generateOTP();

      // Store OTP in Redis with 5 minutes expiry
      await redis.setex(`otp:${phoneNumber}`, 300, otp);

      // Send OTP via SMS (mock implementation)
      const sent = await sendOTP(phoneNumber, otp);

      if (!sent) {
        return { success: false, message: "Failed to send OTP" };
      }

      return { success: true, message: "OTP sent successfully" };
    } catch (error) {
      return { success: false, message: "Failed to send OTP" };
    }
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<VerifyOTPResult> {
    try {
      const storedOTP = await redis.get(`otp:${phoneNumber}`);

      if (!storedOTP || storedOTP !== otp) {
        return { success: false, message: "Invalid or expired OTP" };
      }

      // Mark OTP as verified
      await redis.setex(`otp_verified:${phoneNumber}`, 600, "true"); // 10 minutes
      await redis.del(`otp:${phoneNumber}`);

      return { success: true, message: "OTP verified successfully" };
    } catch (error) {
      return { success: false, message: "OTP verification failed" };
    }
  }

  async signup(data: SignupData): Promise<SignupResult> {
    try {
      const existingUserByEmail = await this.authRepository.findByEmail(
        data.email
      );
      if (existingUserByEmail) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }

      const existingUserByUsername = await this.authRepository.findByUsername(
        data.username
      );
      if (existingUserByUsername) {
        return { success: false, message: "Username already taken" };
      }

      const existingUserByPhone = data.phoneNumber
        ? await this.authRepository.findByPhoneNumber(data.phoneNumber)
        : null;
      if (existingUserByPhone) {
        return {
          success: false,
          message: "User with this phone number already exists",
        };
      }

      const passwordHash = await hashPassword(data.password);

      const user = await this.authRepository.create({
        email: data.email,
        username: data.username,
        name: data.name || "Mahdi",
        role: data.role,
        phoneNumber: data.phoneNumber || undefined,
        passwordHash,
        profilePicture: data.profilePicture,
        location: data.location,
      });

      // Generate tokens
      const accessToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber || undefined,
          name: user.name,
          username: user.username,
          role: user.role!,
          coins: user.coins || 0,
          isVerified: user.isVerified,
          profilePicture: user.profilePicture || undefined,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Signup failed" };
    }
  }

  async googleSignup(
    googleAccessToken: string,
    role: UserRole
  ): Promise<GoogleSignupResult> {
    try {
      const client = new OAuth2Client();
      client.setCredentials({ access_token: googleAccessToken });
      const url = "https://www.googleapis.com/oauth2/v3/userinfo";
      const response = await client.request({ url });
      const googleUser = response.data as {
        email?: string;
        name?: string;
        picture?: string;
        given_name?: string;
        family_name?: string;
      };

      if (!googleUser) {
        return { success: false, message: "Invalid Google access token" };
      }

      if (!googleUser.email) {
        return {
          success: false,
          message: "Google account does not have an email",
        };
      }

      const existingUser = await this.authRepository.findByEmail(
        googleUser.email
      );

      if (existingUser) {
        return {
          success: false,
          message: "User already exists. Please use Google login instead.",
        };
      }

      const tempPassword = generateRandomPassword();
      const passwordHash = await hashPassword(tempPassword);

      // Generate unique username from Google user's name or email
      const existingUsernames =
        await this.authRepository.getExistingUsernames();
      const baseName = googleUser.name || googleUser.email.split("@")[0];
      const username = emailToUsername(googleUser.email, existingUsernames);

      // Extract Google profile picture URL
      const profilePicture = googleUser.picture || undefined;

      const user = await this.authRepository.create({
        email: googleUser.email,
        name: baseName,
        username,
        role,
        phoneNumber: undefined,
        passwordHash,
        profilePicture,
      });

      // Generate tokens
      const accessToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber || undefined,
          name: user.name,
          username: user.username,
          role: user.role!,
          coins: user.coins || 0,
          isVerified: user.isVerified,
          profilePicture: user.profilePicture || undefined,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return { success: false, message: "Google signup failed: " + error };
    }
  }

  async googleLogin(googleAccessToken: string): Promise<GoogleLoginResult> {
    try {
      const client = new OAuth2Client();
      client.setCredentials({ access_token: googleAccessToken });
      const url = "https://www.googleapis.com/oauth2/v3/userinfo";
      const response = await client.request({ url });
      const googleUser = response.data as {
        email?: string;
        name?: string;
        picture?: string;
      };

      if (!googleUser) {
        return { success: false, message: "Invalid Google access token" };
      }

      if (!googleUser.email) {
        return {
          success: false,
          message: "Google account does not have an email",
        };
      }

      const existingUser = await this.authRepository.findByEmail(
        googleUser.email
      );

      if (!existingUser) {
        return {
          success: false,
          message: "User not found. Please sign up first.",
        };
      }

      if (existingUser.isBanned) {
        return { success: false, message: "Account is banned" };
      }

      if (!existingUser.profilePicture && googleUser.picture) {
        await this.authRepository.update(existingUser.id, {
          profilePicture: googleUser.picture,
        });
        existingUser.profilePicture = googleUser.picture;
      }

      // Generate tokens
      const accessToken = generateToken({
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role!,
      });

      const refreshToken = generateRefreshToken({
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role!,
      });

      return {
        success: true,
        user: {
          id: existingUser.id,
          email: existingUser.email,
          phoneNumber: existingUser.phoneNumber || undefined,
          name: existingUser.name,
          username: existingUser.username,
          role: existingUser.role!,
          coins: existingUser.coins || 0,
          isVerified: existingUser.isVerified,
          isBanned: existingUser.isBanned || undefined,
          profilePicture: existingUser.profilePicture || undefined,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return { success: false, message: "Google login failed: " + error };
    }
  }

  

  // ADD: New method for setting user role (simplified)
  async setUserRole(
    userId: string,
    role: string
  ): Promise<{
    success: boolean;
    message?: string;
    user?: any;
    accessToken?: string;
    refreshToken?: string;
  }> {
    try {
      const validRoles = ["ORGANIZER", "MANAGER", "PLAYER"];
      if (!validRoles.includes(role)) {
        return { success: false, message: "Invalid role specified" };
      }

      const updatedUser = await this.authRepository.updateUserRole(
        userId,
        role
      );

      // IMPORTANT: Generate new tokens with the updated role
      const tokenPayload: JWTPayload = {
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role || "",
      };

      const accessToken = generateToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      return {
        success: true,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber || undefined,
          name: updatedUser.name,
          username: updatedUser.username,
          role: updatedUser.role,
          coins: updatedUser.coins || 0,
          isVerified: updatedUser.isVerified,
          isBanned: updatedUser.isBanned || undefined,
          profilePicture: updatedUser.profilePicture || undefined,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Set user role error:", error);
      return { success: false, message: "Failed to set user role" };
    }
  }

  async login(email: string, password: string): Promise<LoginResult> {
    try {
      // Try to find user by email first, then by username
      let user = await this.authRepository.findByEmail(email);
      if (!user) {
        // If not found by email, try to find by username
        user = await this.authRepository.findByUsername(email);
      }

      if (!user) {
        return {
          success: false,
          message: "Invalid email/username or password",
        };
      }

      if (user.isBanned) {
        return { success: false, message: "Account is banned" };
      }

      const isValidPassword = await comparePassword(
        password,
        user.passwordHash
      );
      if (!isValidPassword) {
        return {
          success: false,
          message: "Invalid email/username or password",
        };
      }

      // Generate tokens
      const accessToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber || undefined,
          name: user.name,
          username: user.username,
          role: user.role!,
          coins: user.coins || 0,
          isVerified: user.isVerified,
          isBanned: user.isBanned || undefined,
          profilePicture: user.profilePicture || undefined,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResult> {
    try {
      // Verify the refresh token
      const payload = verifyRefreshToken(refreshToken);

      // Check if user still exists and is not banned
      const user = await this.authRepository.findByEmail(payload.email);
      if (!user) {
        return { success: false, message: "User no longer exists" };
      }

      if (user.isBanned) {
        return { success: false, message: "Account is banned" };
      }

      // Generate new tokens
      const newAccessToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      const newRefreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role!,
      });

      return {
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof Error && error.name === "JsonWebTokenError") {
        return { success: false, message: "Invalid refresh token" };
      }
      if (error instanceof Error && error.name === "TokenExpiredError") {
        return { success: false, message: "Refresh token has expired" };
      }
      return { success: false, message: "Failed to refresh token" };
    }
  }

  async getMe(userId: string): Promise<
    | SuccessResult<{ user: Omit<User, "passwordHash"> }>
    | ErrorResult
  > {
    try {
      const user = await this.authRepository.findById(userId);

      if (!user) {
        return { success: false, message: "User not found" };
      }

      if (user.isBanned) {
        return { success: false, message: "Account is banned" };
      }

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber || undefined,
          name: user.name,
          username: user.username,
          role: user.role!,
          coins: user.coins || 0,
          isVerified: user.isVerified,
          isBanned: user.isBanned || undefined,
          profilePicture: user.profilePicture || undefined,
        },
      };
    } catch (error) {
      return { success: false, message: "Failed to retrieve user" };
    }
  }
}


