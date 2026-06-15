import type { Response, NextFunction, Request } from "express";
import { ManagerService } from "../services/manager.service";
import type { AuthenticatedRequest } from "@/middlewares";
import { createError } from "@/middlewares";
import {
  sendSuccess,
  sendError,
  uploadBufferToCloudinary,
} from "@/utils";

export class ManagerController {
  private managerService = new ManagerService();

  setupProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const profileData = req.body;
      const manager = await this.managerService.setupProfile(
        userId,
        profileData
      );
      sendSuccess(res, "Manager profile created successfully", { manager });
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
      const userId = req.user!.userId;
      const manager = await this.managerService.getProfile(userId);

      if (!manager) {
        throw createError("Manager profile not found", 404);
      }

      sendSuccess(res, "Manager profile retrieved successfully", { manager });
    } catch (error) {
      next(error);
    }
  };

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
        "manager-profiles" // Dedicated folder for manager profile images
      );

      // Return the URL and public_id for the frontend
      return sendSuccess(res, "Profile image uploaded successfully", {
        url: result.url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.error("Upload manager profile image error:", error);
      next(error);
    }
  };

  // This endpoint handles updates for both Manager and User models
  updateProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = String(req.user!.userId);
      const updateData: any = req.body;

      // Separate user-related fields from manager-related fields
      const { profilePicture, name, location, ...managerFields } = updateData;

      // Prepare payload for service layer, allowing nested updates
      const updatePayload: any = { ...managerFields };

      const userUpdateData: any = {};
      if (profilePicture) userUpdateData.profilePicture = profilePicture;
      if (name) userUpdateData.name = name;
      if (location) userUpdateData.location = location;

      // Add user updates if present
      if (Object.keys(userUpdateData).length > 0) {
        updatePayload.user = {
          update: userUpdateData,
        };
      }

      const manager = await this.managerService.updateProfile(
        userId,
        updatePayload
      );

      return sendSuccess(res, "Profile updated successfully", {
        manager,
        // Include updated profile picture URL
        url: manager.user?.profilePicture || null,
      });
    } catch (error) {
      console.error("Update manager profile error:", error);
      next(error);
    }
  };

  getDashboard = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const dashboard = await this.managerService.getDashboard(userId);

      sendSuccess(res, "Dashboard retrieved successfully", { dashboard });
    } catch (error) {
      next(error);
    }
  };

  getTournaments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        area,
        overs,
        entryFee,
        gameType,
        page = 1,
        limit = 10,
      } = req.query;

      const filters = {
        area: area as string | undefined,
        overs: overs ? Number.parseInt(overs as string) : undefined,
        entryFee: entryFee ? Number.parseInt(entryFee as string) : undefined,
        gameType: gameType as string | undefined,
      };

      const result = await this.managerService.getTournaments(
        filters,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Tournaments retrieved successfully", result);
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
      const tournamentId = req.params.id;
      const tournament = await this.managerService.getTournament(tournamentId);

      if (!tournament) {
        throw createError("Tournament not found", 404);
      }

      sendSuccess(res, "Tournament retrieved successfully", { tournament });
    } catch (error) {
      next(error);
    }
  };

  joinTournament = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const tournamentId = req.params.id;
      const { teamName } = req.body;

      const team = await this.managerService.joinTournament(
        userId,
        tournamentId,
        "PENDING",
        teamName
      );

      sendSuccess(res, "Successfully joined tournament", { team });
    } catch (error) {
      console.error("Controller error:", error);
      next(error);
    }
  };

  getMyTournaments = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const tournaments = await this.managerService.getMyTournaments(userId);

      sendSuccess(res, "My tournaments retrieved successfully", {
        tournaments,
      });
    } catch (error) {
      next(error);
    }
  };

  getMyTournament = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const tournamentId = req.params.id;
      const tournament = await this.managerService.getMyTournament(
        userId,
        tournamentId
      );

      if (!tournament) {
        throw createError("Tournament not found", 404);
      }

      sendSuccess(res, "My tournament retrieved successfully", { tournament });
    } catch (error) {
      next(error);
    }
  };

  leaveTournament = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const tournamentId = req.params.id;
      await this.managerService.leaveTournament(userId, tournamentId);

      sendSuccess(res, "Successfully left tournament");
    } catch (error) {
      next(error);
    }
  };

  getTeams = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teams = await this.managerService.getTeams(userId);

      sendSuccess(res, "Teams retrieved successfully", { teams });
    } catch (error) {
      next(error);
    }
  };

  createTeam = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamData = req.body;

      const team = await this.managerService.createTeam(userId, teamData);

      sendSuccess(res, "Team created successfully", { team });
    } catch (error) {
      next(error);
    }
  };

  getTeam = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.id;
      const team = await this.managerService.getTeam(userId, teamId);

      if (!team) {
        throw createError("Team not found", 404);
      }

      sendSuccess(res, "Team retrieved successfully", { team });
    } catch (error) {
      next(error);
    }
  };

  updateTeam = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.id;
      const updateData = req.body;
      const team = await this.managerService.updateTeam(teamId, updateData);

      sendSuccess(res, "Team updated successfully", { team });
    } catch (error) {
      next(error);
    }
  };

  deleteTeam = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.id;
      await this.managerService.deleteTeam(userId, teamId);

      sendSuccess(res, "Team deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  getPlayers = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        area,
        role,
        minRating,
        maxPrice,
        page = 1,
        limit = 20,
      } = req.query;

      const filters = {
        area: area as string,
        role: role as string,
        minRating: minRating ? Number.parseInt(minRating as string) : undefined,
        maxPrice: maxPrice ? Number.parseInt(maxPrice as string) : undefined,
      };

      const players = await this.managerService.getPlayers(
        filters,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Players retrieved successfully", { players });
    } catch (error) {
      next(error);
    }
  };

  getPlayer = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playerId = req.params.id;
      const player = await this.managerService.getPlayer(playerId);

      if (!player) {
        throw createError("Player not found", 404);
      }

      sendSuccess(res, "Player retrieved successfully", { player });
    } catch (error) {
      next(error);
    }
  };

  hirePlayer = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const playerId = req.params.id;
      const { tournamentId, message } = req.body;
      const hireRequest = await this.managerService.hirePlayer(
        userId,
        playerId,
        tournamentId,
        message
      );

      sendSuccess(res, "Hire request sent successfully", { hireRequest });
    } catch (error) {
      next(error);
    }
  };

  addPlayerToTeam = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.teamId;
      const playerId = req.params.playerId;
      const teamPlayer = await this.managerService.addPlayerToTeam(
        userId,
        teamId,
        playerId
      );
      sendSuccess(res, "Player added to team successfully", teamPlayer);
    } catch (error) {
      next(error);
    }
  };

  removePlayerFromTeam = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.teamId;
      const playerId = req.params.playerId;
      await this.managerService.removePlayerFromTeam(userId, teamId, playerId);

      sendSuccess(res, "Player removed from team successfully");
    } catch (error) {
      next(error);
    }
  };

  setCaptain = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.teamId;
      const playerId = req.params.playerId;
      await this.managerService.setCaptain(userId, teamId, playerId);

      sendSuccess(res, "Captain set successfully");
    } catch (error) {
      next(error);
    }
  };

  getLeaderboard = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type = "managers", page = 1, limit = 10 } = req.query;

      const leaderboard = await this.managerService.getLeaderboard(
        type as string,
        Number.parseInt(page as string),
        Number.parseInt(limit as string)
      );

      sendSuccess(res, "Leaderboard retrieved successfully", { leaderboard });
    } catch (error) {
      next(error);
    }
  };
}
