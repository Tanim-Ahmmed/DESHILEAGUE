import type { Response, NextFunction, Express } from "express";
import { PlayerService } from "../services/player.service";
import type { AuthenticatedRequest } from "@/middlewares";
import { createError } from "@/middlewares";
import {
  sendError,
  sendSuccess,
  uploadBufferToCloudinary,
} from "@/utils";

export class PlayerController {
  private playerService = new PlayerService();

  setupProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const profileData = req.body;
      const profilePicture = req.file?.path;

      const player = await this.playerService.setupProfile(userId, {
        ...profileData,
        profilePicture,
      });

      sendSuccess(res, "Player profile created successfully", { player });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const player = await this.playerService.getProfile(userId);

      if (!player) {
        throw createError("Player profile not found", 404);
      }

      sendSuccess(res, "Player profile retrieved successfully", { player });
    } catch (error) {
      next(error);
    }
  };

  // ✅ শুধু image upload করার endpoint
  uploadProfileImage = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        return sendError(res, "No file provided", 400);
      }

      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "player-profiles" // সব player এর ছবি এই folder এ যাবে
      );

      return sendSuccess(res, "Profile image uploaded successfully", {
        url: result.url,
        public_id: result.public_id,
      });
    } catch (error) {
      next(error);
    }
  };

  // ✅ player profile update endpoint
  updateProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const updateData: any = req.body;

      // Separate user-related updates
      const { profilePicture, name, location, ...playerFields } = updateData;

      const player = await this.playerService.updateProfile(userId, {
        ...playerFields,
        user: {
          update: {
            ...(profilePicture && { profilePicture }),
            ...(name && { name }),
            ...(location && { location }),
          },
        },
      });

      return sendSuccess(res, "Profile updated successfully", {
        player,
        url: player.user?.profilePicture || null,
      });
    } catch (error) {
      next(error);
    }
  };

  getDashboard = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const dashboard = await this.playerService.getDashboard(userId);

      sendSuccess(res, "Dashboard retrieved successfully", { dashboard });
    } catch (error) {
      next(error);
    }
  };

  getHireRequests = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { status, page = 1, limit = 10 } = req.query;

      const hireRequests = await this.playerService.getHireRequests(
        userId,
        status as string,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Hire requests retrieved successfully", {
        hireRequests,
      });
    } catch (error) {
      next(error);
    }
  };

  acceptHireRequest = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const requestId = req.params.id;

      const updatedHireRequest = await this.playerService.acceptHireRequest(
        userId,
        requestId
      );

      sendSuccess(res, "Hire request accepted successfully", {
        hireRequest: updatedHireRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  rejectHireRequest = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const requestId = req.params.id;

      const updatedHireRequest = await this.playerService.rejectHireRequest(
        userId,
        requestId
      );

      sendSuccess(res, "Hire request rejected successfully", {
        hireRequest: updatedHireRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  getMatches = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { status, page = 1, limit = 10 } = req.query;

      const matches = await this.playerService.getMatches(
        userId,
        status as string,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Matches retrieved successfully", { matches });
    } catch (error) {
      next(error);
    }
  };

  getMatch = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const matchId = req.params.id;

      const match = await this.playerService.getMatch(userId, matchId);

      if (!match) {
        throw createError("Match not found", 404);
      }

      sendSuccess(res, "Match retrieved successfully", { match });
    } catch (error) {
      next(error);
    }
  };

  markAttendance = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const matchId = req.params.id;

      await this.playerService.markAttendance(userId, matchId);

      sendSuccess(res, "Attendance marked successfully");
    } catch (error) {
      next(error);
    }
  };

  getTournaments = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { status, page = 1, limit = 10 } = req.query;

      const tournaments = await this.playerService.getTournaments(
        userId,
        status as string,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Tournaments retrieved successfully", { tournaments });
    } catch (error) {
      next(error);
    }
  };

  getTournament = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const tournamentId = req.params.id;

      const tournament = await this.playerService.getTournament(
        userId,
        tournamentId
      );

      if (!tournament) {
        throw createError("Tournament not found", 404);
      }

      sendSuccess(res, "Tournament retrieved successfully", { tournament });
    } catch (error) {
      next(error);
    }
  };

  getPerformance = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const performance = await this.playerService.getPerformance(userId);

      sendSuccess(res, "Performance retrieved successfully", { performance });
    } catch (error) {
      next(error);
    }
  };

  getStats = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const stats = await this.playerService.getStats(userId);

      sendSuccess(res, "Stats retrieved successfully", { stats });
    } catch (error) {
      next(error);
    }
  };

  getCreditHistory = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { page = 1, limit = 20 } = req.query;

      const creditHistory = await this.playerService.getCreditHistory(
        userId,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Credit history retrieved successfully", {
        creditHistory,
      });
    } catch (error) {
      next(error);
    }
  };

  createAppeal = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { reason } = req.body;

      const appeal = await this.playerService.createAppeal(userId, reason);

      sendSuccess(res, "Appeal submitted successfully", { appeal });
    } catch (error) {
      next(error);
    }
  };

  getAppeals = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const appeals = await this.playerService.getAppeals(userId);

      sendSuccess(res, "Appeals retrieved successfully", { appeals });
    } catch (error) {
      next(error);
    }
  };

  requestWithdrawal = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { amount, phoneNumber } = req.body;

      const withdrawal = await this.playerService.requestWithdrawal(
        userId,
        amount,
        phoneNumber
      );

      sendSuccess(res, "Withdrawal request submitted successfully", {
        withdrawal,
      });
    } catch (error) {
      next(error);
    }
  };

  getWithdrawals = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const withdrawals = await this.playerService.getWithdrawals(userId);

      sendSuccess(res, "Withdrawals retrieved successfully", { withdrawals });
    } catch (error) {
      next(error);
    }
  };

  verifyIdentity = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const { fullName, dob } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files.frontImage || !files.backImage || !files.faceImage) {
        throw createError("All identity images are required", 400);
      }

      const verification = await this.playerService.verifyIdentity(userId, {
        fullName,
        dob,
        frontImage: files.frontImage[0].path,
        backImage: files.backImage[0].path,
        faceImage: files.faceImage[0].path,
      });

      sendSuccess(res, "Identity verification submitted successfully", {
        verification,
      });
    } catch (error) {
      next(error);
    }
  };

  getVerificationStatus = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const verification = await this.playerService.getVerificationStatus(
        userId
      );

      sendSuccess(res, "Verification status retrieved successfully", {
        verification,
      });
    } catch (error) {
      next(error);
    }
  };
}
