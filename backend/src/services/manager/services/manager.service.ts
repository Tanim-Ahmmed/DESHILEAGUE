import { ManagerRepository } from "../repositories/manager.repository";
import { BaseService } from "@/utils";
import {

  BaseEntity,
  ApiResult,

} from "@/types";
import { HireStatus } from "@prisma/client";
import { createError } from "@/middlewares";
import { prisma } from '@/utils/client';

// Type definitions for manager service
interface Manager extends BaseEntity {
  userId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  areaLocation?: string;
  experience: number;
  specialization: string[];
  isVerified: boolean;
  isActive: boolean;
}

interface ManagerResponse {
  id: string;
  userId: string;
  areaLocation?: string;
  experience?: number;
  specialization?: string[];
  isVerified?: boolean;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string; // from user table
  email: string; // from user table
  teams: any[]; // you can replace `any` with your Team type
  stats: any; // replace with Statistics type
  recentActivity?: any[];
}

interface CreateManagerRequest {
  userId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  areaLocation?: string;
  experience: number;
  specialization: string[];
}

interface UpdateManagerRequest {
  name?: string;
  phoneNumber?: string;
  profilePicture?: string;
  location?: string;
  experience?: number;
  specialization?: string[];
}

interface ManagerFilters {
  name?: string;
  specialization?: string[];
  isVerified?: boolean;
  isActive?: boolean;
  location?: string;
}

interface ManagerStats {
  totalManagers: number;
  activeManagers: number;
  verifiedManagers: number;
  averageExperience: number;
  managersBySpecialization: Record<string, number>;
}

interface Team {
  id: string;
  managerId: string;
  name: string;
  logoUrl?: string;
  jerseyColor?: string;
  players: Player[];
  createdAt: Date;
  updatedAt: Date;
}

interface Player {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: string;
  experience: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TeamInvitation {
  id: string;
  teamId: string;
  playerId: string;
  managerId: string;
  message?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

interface TeamRequest {
  id: string;
  teamId: string;
  playerId: string;
  message?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateTeamResult {
  success: boolean;
  message: string;
  data?: any; // Add this field
}

type CreateManagerDTO = CreateManagerRequest;
type UpdateManagerDTO = UpdateManagerRequest;
type ManagerFilterDTO = ManagerFilters;

type CreateManagerResult = ApiResult<ManagerResponse>;
type UpdateManagerResult = ApiResult<ManagerResponse>;
type GetManagerResult = ApiResult<ManagerResponse>;
type GetManagersResult = ApiResult<ManagerResponse[]>;
type GetManagerStatsResult = ApiResult<ManagerStats>;
// type CreateTeamResult = ApiResult<{ teamId: string; message: string }>;
type InvitePlayerResult = ApiResult<{ invitationId: string; message: string }>;
type AcceptInvitationResult = ApiResult<{ message: string }>;
type RejectInvitationResult = ApiResult<{ message: string }>;
type GetTeamPlayersResult = ApiResult<Player[]>;

export class ManagerService extends BaseService<
  Manager,
  CreateManagerDTO,
  UpdateManagerDTO,
  ManagerFilterDTO
> {
  private managerRepository = new ManagerRepository();

  constructor() {
    super();
  }

  // Manager CRUD operations
  async create(data: CreateManagerDTO): Promise<Manager> {
    this.logOperation("create_manager", {
      name: data.name,
      userId: data.userId,
    });

    // Validate manager data
    await this.validateManagerData(data);

    // Check if manager already exists for this user
    await this.validateManagerNotExists(data.userId);

    // Create manager
    const manager = await this.managerRepository.create(data.userId, data);

    this.logOperation("manager_created", {
      id: manager.id,
      name: manager.user.name,
    });
    return manager as any;
  }

  async findById(id: string): Promise<Manager | null> {
    return (await this.managerRepository.findByUserId(id)) as any;
  }

  async findAll(filters?: ManagerFilterDTO): Promise<Manager[]> {
    return (await this.managerRepository.findAll(filters)) as any[];
  }

  async update(id: string, data: UpdateManagerDTO): Promise<Manager> {
    this.logOperation("update_manager", { id, updates: data });

    // Validate manager exists
    await this.validateEntityExists(id);

    // Update manager
    const manager = await this.managerRepository.update(id, data);

    this.logOperation("manager_updated", { id, name: manager.user.name });
    return manager as any;
  }

  async delete(id: string): Promise<boolean> {
    this.logOperation("delete_manager", { id });

    // Validate manager exists
    await this.validateEntityExists(id);

    // Check if manager can be deleted
    await this.validateManagerCanBeDeleted(id);

    await this.managerRepository.delete(id);

    this.logOperation("manager_deleted", { id, success: true });
    return true;
  }

  async exists(id: string): Promise<boolean> {
    return await this.managerRepository.exists(id);
  }

  async findByField(field: keyof Manager, value: any): Promise<Manager | null> {
    return (await this.managerRepository.findByField(field, value)) as any;
  }

  async count(filters?: ManagerFilterDTO): Promise<number> {
    return await this.managerRepository.count(filters);
  }

  // Implement abstract methods from BaseService
  protected mapToResponse(entity: Manager): ManagerResponse {
    return {
      id: entity.id,
      userId: entity.userId,
      name: entity.name,
      email: entity.email,
      areaLocation: entity.areaLocation,
      experience: entity.experience,
      specialization: entity.specialization,
      isVerified: entity.isVerified,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      teams: [],
      stats: {},
      recentActivity: [],
    };
  }

  protected async validateBusinessRules(
    data: CreateManagerDTO | UpdateManagerDTO
  ): Promise<void> {
    // Validate business rules for manager operations
    if ("userId" in data && !data.userId) {
      throw new Error("User ID is required");
    }

    if ("name" in data && (!data.name || data.name.trim().length < 2)) {
      throw new Error("Name must be at least 2 characters long");
    }

    if (
      "email" in data &&
      data.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      throw new Error("Invalid email format");
    }

    if (
      "experience" in data &&
      data.experience !== undefined &&
      data.experience < 0
    ) {
      throw new Error("Experience cannot be negative");
    }
  }

  // Manager-specific operations
  async createManager(
    data: CreateManagerRequest
  ): Promise<CreateManagerResult> {
    try {
      const manager = await this.create(data);
      const response = await this.mapToManagerResponse(manager);

      return {
        success: true,
        ...response,
      } as CreateManagerResult;
    } catch (error) {
      this.logError("create_manager_failed", error, data);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create manager",
      };
    }
  }

  async updateManager(
    id: string,
    data: UpdateManagerRequest
  ): Promise<UpdateManagerResult> {
    try {
      const manager = await this.update(id, data);
      const response = await this.mapToManagerResponse(manager);

      return {
        success: true,
        ...response,
      } as UpdateManagerResult;
    } catch (error) {
      this.logError("update_manager_failed", error, { id, data });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update manager",
      };
    }
  }

  async getManager(id: string): Promise<GetManagerResult> {
    try {
      const manager = await this.findById(id);
      if (!manager) {
        return {
          success: false,
          message: "Manager not found",
        };
      }

      const response = await this.mapToManagerResponse(manager);
      return {
        success: true,
        ...response,
      } as GetManagerResult;
    } catch (error) {
      this.logError("get_manager_failed", error, { id });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get manager",
      };
    }
  }

  async getManagers(filters?: ManagerFilters): Promise<GetManagersResult> {
    try {
      const managers = await this.findAll(filters);
      const responses = await Promise.all(
        managers.map((manager) => this.mapToManagerResponse(manager))
      );

      return {
        success: true,
        data: responses,
      } as any;
    } catch (error) {
      this.logError("get_managers_failed", error, { filters });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get managers",
      };
    }
  }

  async getManagerStats(managerId: string): Promise<GetManagerStatsResult> {
    try {
      // Validate manager exists
      await this.validateEntityExists(managerId);

      const stats = await this.managerRepository.getStatistics(managerId);
      return {
        success: true,
        totalManagers: 1,
        activeManagers: 1,
        verifiedManagers: 1,
        averageExperience: 0,
        managersBySpecialization: {},
        ...stats,
      } as any;
    } catch (error) {
      this.logError("get_manager_stats_failed", error, { managerId });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get manager statistics",
      };
    }
  }

  // Team management
  async createTeam(userId: string, teamData: any): Promise<any> {
    try {
      // Get managerId from userId
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) {
        throw new Error("Manager profile not found");
      }

      // Set default status if not provided
      const teamPayload = {
        ...teamData,
        status: teamData.status || "PENDING",
      };

      // Create team using managerId
      const team = await this.managerRepository.createTeam(
        manager.id,
        teamPayload
      );

      return team;
    } catch (error) {
      throw error;
    }
  }

  async getTeams(userId: string): Promise<ApiResult<Team[]>> {
    try {
      // Get manager from userId instead of validating managerId directly
      const manager = await this.managerRepository.findByUserId(userId);
      console.log("managerId", manager?.id);
      if (!manager?.id) {
        return {
          success: false,
          message: "Manager profile not found for this user",
        };
      }

      const teams = await this.managerRepository.getTeams(manager?.id);
      return {
        success: true,
        data: teams,
      } as any;
    } catch (error) {
      this.logError("get_teams_failed", error, { userId });
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to get teams",
      };
    }
  }

  async updateTeam(teamId: string, teamData: any): Promise<UpdateTeamResult> {
    try {
      this.logOperation("update_team", { teamId, updates: teamData });

      // Get the updated team data from repository
      const updatedTeam = await this.managerRepository.updateTeam(
        teamId,
        teamData
      );

      this.logOperation("team_updated", { teamId });
      return {
        success: true,
        data: updatedTeam, // Add the updated team data
        message: "Team updated successfully",
      };
    } catch (error) {
      this.logError("update_team_failed", error, { teamId, teamData });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update team",
      };
    }
  }

  // Player recruitment
  async invitePlayer(
    managerId: string,
    playerId: string,
    teamId: string,
    message?: string
  ): Promise<InvitePlayerResult> {
    try {
      this.logOperation("invite_player", { managerId, playerId, teamId });

      // Validate manager exists
      await this.validateEntityExists(managerId);

      // Validate team belongs to manager
      await this.validateTeamBelongsToManager(managerId, teamId);

      // Check if invitation already exists
      await this.validateInvitationNotExists(playerId, teamId);

      // Send invitation
      const invitation = await this.managerRepository.invitePlayer(
        managerId,
        playerId,
        teamId,
        message
      );

      this.logOperation("player_invited", {
        invitationId: invitation.id,
        playerId,
        teamId,
      });
      return {
        success: true,
        invitationId: invitation.id,
        message: "Player invited successfully",
      };
    } catch (error) {
      this.logError("invite_player_failed", error, {
        managerId,
        playerId,
        teamId,
      });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to invite player",
      };
    }
  }

  async getTeamPlayers(teamId: string): Promise<GetTeamPlayersResult> {
    try {
      const players = await this.managerRepository.getTeamPlayers(teamId);
      return {
        success: true,
        data: players,
      } as any;
    } catch (error) {
      this.logError("get_team_players_failed", error, { teamId });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get team players",
      };
    }
  }

  async getTeamInvitations(
    teamId: string
  ): Promise<ApiResult<TeamInvitation[]>> {
    try {
      const invitations = await this.managerRepository.getTeamInvitations(
        teamId
      );
      return {
        success: true,
        data: invitations,
      } as any;
    } catch (error) {
      this.logError("get_team_invitations_failed", error, { teamId });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get team invitations",
      };
    }
  }

  // Player response to invitations
  async acceptInvitation(
    invitationId: string,
    playerId: string
  ): Promise<AcceptInvitationResult> {
    try {
      this.logOperation("accept_invitation", { invitationId, playerId });

      await this.managerRepository.acceptInvitation(invitationId, playerId);

      this.logOperation("invitation_accepted", { invitationId, playerId });
      return {
        success: true,
        message: "Invitation accepted successfully",
      };
    } catch (error) {
      this.logError("accept_invitation_failed", error, {
        invitationId,
        playerId,
      });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to accept invitation",
      };
    }
  }

  async rejectInvitation(
    invitationId: string,
    playerId: string
  ): Promise<RejectInvitationResult> {
    try {
      this.logOperation("reject_invitation", { invitationId, playerId });

      await this.managerRepository.rejectInvitation(invitationId, playerId);

      this.logOperation("invitation_rejected", { invitationId, playerId });
      return {
        success: true,
        message: "Invitation rejected successfully",
      };
    } catch (error) {
      this.logError("reject_invitation_failed", error, {
        invitationId,
        playerId,
      });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to reject invitation",
      };
    }
  }

  // Player search and recommendations
  async searchPlayers(
    query: string,
    filters?: any
  ): Promise<ApiResult<Player[]>> {
    try {
      const players = await this.managerRepository.searchPlayers(
        query,
        filters
      );
      return {
        success: true,
        data: players,
      } as any;
    } catch (error) {
      this.logError("search_players_failed", error, { query, filters });
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to search players",
      };
    }
  }

  async getRecommendedPlayers(
    teamId: string,
    criteria: any
  ): Promise<ApiResult<Player[]>> {
    try {
      const players = await this.managerRepository.getRecommendedPlayers(
        teamId,
        criteria
      );
      return {
        success: true,
        data: players,
      } as any;
    } catch (error) {
      this.logError("get_recommended_players_failed", error, {
        teamId,
        criteria,
      });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get recommended players",
      };
    }
  }

  // Team statistics
  async getTeamStats(teamId: string): Promise<ApiResult<any>> {
    try {
      const stats = await this.managerRepository.getTeamStats(teamId);
      return {
        success: true,
        data: stats,
      } as any;
    } catch (error) {
      this.logError("get_team_stats_failed", error, { teamId });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get team statistics",
      };
    }
  }

  async setupProfile(userId: string, profileData: any) {
    const existingProfile = await this.managerRepository.findByUserId(userId);
    if (existingProfile) {
      throw createError("Manager profile already exists", 400);
    }

    const manager = await this.managerRepository.create(userId, profileData);

    return this.mapToManagerResponse(manager);
  }

  async getProfile(userId: string): Promise<any> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) return null;
      return await this.mapToManagerResponse(manager as any);
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId: string, updateData: any): Promise<any> {
    // 1. Separate the user and manager data from the incoming payload
    const { user, ...managerFields } = updateData;
    const userUpdateData = user?.update;

    // 2. Find the manager profile to ensure it exists
    const manager = await this.managerRepository.findByUserId(userId);
    if (!manager) {
      throw createError("Manager profile not found");
    }

    // 3. If there's user data in the payload, update the User model directly
    if (userUpdateData && Object.keys(userUpdateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: userUpdateData,
      });
    }

    // 4. If there are manager-specific fields, update the Manager model
    if (Object.keys(managerFields).length > 0) {
      await this.managerRepository.update(manager.id, managerFields);
    }

    // 5. Re-fetch the manager with all updated data (including the user) and return it
    return this.managerRepository.findByUserId(userId);
  }

  async getDashboard(userId: string): Promise<any> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      const teams = await this.managerRepository.getTeams(manager.id);
      const stats = await this.managerRepository.getManagerStats(manager.id);

      return {
        manager: await this.mapToManagerResponse(manager as any),
        teams,
        stats,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTournaments(
    filters: any,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      return await this.managerRepository.getTournaments(filters, page, limit);
    } catch (error) {
      throw error;
    }
  }

  async getTournament(tournamentId: string): Promise<any> {
    try {
      return await this.managerRepository.getTournament(tournamentId);
    } catch (error) {
      throw error;
    }
  }

  async joinTournament(
    userId: string,
    tournamentId: string,
    teamStatus: HireStatus,
    teamName: string
  ): Promise<any> {
    try {
      console.log("Service called with:", {
        userId,
        tournamentId,
        teamStatus,
        teamName,
      });

      const manager = await this.managerRepository.findByUserId(userId);
      console.log("Manager found:", !!manager);

      if (!manager) throw new Error("Manager not found");

      const tournament = await this.managerRepository.getTournament(
        tournamentId
      );

      if (!tournament) throw new Error("Tournament not found");

      const team = await this.managerRepository.joinTournament(
        manager.id,
        tournamentId,
        teamStatus,
        teamName,
        tournament.entryFee
      );
      return team;
    } catch (error) {
      console.error("Service error:", error);
      throw error;
    }
  }

  async getMyTournaments(userId: string): Promise<any> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      return await this.managerRepository.getMyTournaments(manager.id);
    } catch (error) {
      throw error;
    }
  }

  async getMyTournament(userId: string, tournamentId: string): Promise<any> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      return await this.managerRepository.getMyTournament(
        manager.id,
        tournamentId
      );
    } catch (error) {
      throw error;
    }
  }

  async leaveTournament(userId: string, tournamentId: string): Promise<void> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      const team = await this.managerRepository.findTeamInTournament(
        manager.id,
        tournamentId
      );
      if (!team) throw new Error("Team not found in tournament");

      const tournament = await this.managerRepository.getTournament(
        tournamentId
      );
      if (!tournament) throw new Error("Tournament not found");

      await this.managerRepository.leaveTournament(
        team.id,
        tournament.entryFee,
        manager.userId
      );
    } catch (error) {
      throw error;
    }
  }

  async getTeam(userId: string, teamId: string): Promise<any> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      const team = await this.managerRepository.getTeam(teamId);
      if (!team || team.managerId !== manager.id)
        throw new Error("Team not found");

      return team;
    } catch (error) {
      throw error;
    }
  }

  async deleteTeam(userId: string, teamId: string): Promise<void> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      const team = await this.managerRepository.getTeam(teamId);
      if (!team || team.managerId !== manager.id)
        throw new Error("Team not found");

      await this.managerRepository.deleteTeam(teamId);
    } catch (error) {
      throw error;
    }
  }

  async getPlayers(filters: any, page: number, limit: number): Promise<any> {
    try {
      return await this.managerRepository.getPlayers(filters, page, limit);
    } catch (error) {
      throw error;
    }
  }

  async getPlayer(playerId: string): Promise<any> {
    try {
      return await this.managerRepository.getPlayer(playerId);
    } catch (error) {
      throw error;
    }
  }

  async hirePlayer(
    userId: string,
    playerId: string,
    tournamentId: string,
    message?: string
  ): Promise<any> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      return await this.managerRepository.createHireRequest(
        manager.id,
        playerId,
        tournamentId,
        message
      );
    } catch (error) {
      throw error;
    }
  }

  async addPlayerToTeam(userId: string, teamId: string, playerId: string) {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");
      const team = await this.managerRepository.getTeam(teamId);
      if (!team || team.managerId !== manager.id)
        throw new Error("Team not found");
      return await this.managerRepository.addPlayerToTeam(teamId, playerId);
    } catch (error) {
      throw error;
    }
  }

  async removePlayerFromTeam(
    userId: string,
    teamId: string,
    playerId: string
  ): Promise<void> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      const team = await this.managerRepository.getTeam(teamId);
      if (!team || team.managerId !== manager.id)
        throw new Error("Team not found");

      await this.managerRepository.removePlayerFromTeam(teamId, playerId);
    } catch (error) {
      throw error;
    }
  }

  async setCaptain(
    userId: string,
    teamId: string,
    playerId: string
  ): Promise<void> {
    try {
      const manager = await this.managerRepository.findByUserId(userId);
      if (!manager) throw new Error("Manager not found");

      const team = await this.managerRepository.getTeam(teamId);
      if (!team || team.managerId !== manager.id)
        throw new Error("Team not found");

      await this.managerRepository.setCaptain(teamId, playerId);
    } catch (error) {
      throw error;
    }
  }

  async getLeaderboard(
    type: string,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      return await this.managerRepository.getLeaderboard(type, page, limit);
    } catch (error) {
      throw error;
    }
  }

  // Private helper methods
  private async validateManagerData(data: CreateManagerRequest): Promise<void> {
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
      throw new Error("Manager name must be at least 2 characters long");
    }

    // Validate experience
    if (data.experience && data.experience < 0) {
      throw new Error("Experience cannot be negative");
    }

    // Validate specialization
    if (data.specialization && !Array.isArray(data.specialization)) {
      throw new Error("Specialization must be an array");
    }

    if (data.specialization && data.specialization.length > 0) {
      const validSpecializations = [
        "BATTING",
        "BOWLING",
        "ALL_ROUND",
        "WICKET_KEEPING",
        "COACHING",
      ];
      for (const spec of data.specialization) {
        if (!validSpecializations.includes(spec)) {
          throw new Error(`Invalid specialization: ${spec}`);
        }
      }
    }
  }

  private async validateManagerNotExists(userId: string): Promise<void> {
    const existingManager = await this.managerRepository.findByUserId(userId);
    if (existingManager) {
      throw new Error("Manager profile already exists for this user");
    }
  }

  private async validateManagerCanBeDeleted(managerId: string): Promise<void> {
    const manager = await this.findById(managerId);
    if (!manager) {
      throw new Error("Manager not found");
    }

    // Check if manager has active teams
    const activeTeams = await this.managerRepository.getActiveTeams(managerId);
    if (activeTeams.length > 0) {
      throw new Error("Cannot delete manager with active teams");
    }

    // Check if manager has pending invitations
    const pendingInvitations =
      await this.managerRepository.getPendingInvitations(managerId);
    if (pendingInvitations.length > 0) {
      throw new Error("Cannot delete manager with pending invitations");
    }
  }

  private async validateTeamData(teamData: any): Promise<void> {
    // Validate team name
    if (!teamData.name || teamData.name.trim().length < 2) {
      throw new Error("Team name must be at least 2 characters long");
    }

    // Validate team type
    if (
      teamData.type &&
      !["COMPETITIVE", "CASUAL", "PROFESSIONAL", "ACADEMY"].includes(
        teamData.type
      )
    ) {
      throw new Error("Invalid team type");
    }

    // Validate max players
    if (
      teamData.maxPlayers &&
      (teamData.maxPlayers < 5 || teamData.maxPlayers > 25)
    ) {
      throw new Error("Team must have between 5 and 25 players");
    }
  }

  private async validateTeamBelongsToManager(
    managerId: string,
    teamId: string
  ): Promise<void> {
    const team = await this.managerRepository.getTeam(teamId);
    if (!team || team.managerId !== managerId) {
      throw new Error("Team does not belong to this manager");
    }
  }

  private async validateInvitationNotExists(
    playerId: string,
    teamId: string
  ): Promise<void> {
    const existingInvitation = await this.managerRepository.getInvitation(
      playerId,
      teamId
    );
    if (existingInvitation) {
      throw new Error("Invitation already exists for this player and team");
    }
  }

  private async mapToManagerResponse(manager: any): Promise<ManagerResponse> {
    const teams = await this.managerRepository.getTeams(manager.id);
    const stats = await this.managerRepository.getStatistics(manager.id);
    const recentActivity = await this.managerRepository.getRecentActivity(
      manager.id
    );

    return {
      id: manager.id,
      userId: manager.userId,
      areaLocation: manager.areaLocation,
      createdAt: manager.createdAt,
      updatedAt: manager.updatedAt,
      name: manager.user.name, // ✅ user relation flattened
      email: manager.user.email, // ✅ user relation flattened
      teams,
      stats,
      recentActivity,
    };
  }
}
