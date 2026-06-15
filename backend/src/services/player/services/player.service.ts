import { PlayerRepository } from "../repositories/player.repository";
import { createError } from "@/middlewares";

export class PlayerService {
  private playerRepository = new PlayerRepository();

  async setupProfile(userId: string, profileData: any) {
    const existingProfile = await this.playerRepository.findByUserId(userId);
    if (existingProfile) {
      throw createError("Player profile already exists", 400);
    }

    return this.playerRepository.create(userId, profileData);
  }

  async getProfile(userId: string) {
    return this.playerRepository.findByUserId(userId);
  }

  async updateProfile(userId: string, updateData: any) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.update(player.id, updateData);
  }

  async getDashboard(userId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    const stats = await this.playerRepository.getPlayerStats(player.id);
    const upcomingMatches = await this.playerRepository.getUpcomingMatches(
      player.id
    );
    const recentMatches = await this.playerRepository.getRecentMatches(
      player.id
    );
    const hireRequests = await this.playerRepository.getPendingHireRequests(
      player.id
    );

    return {
      player,
      stats,
      upcomingMatches,
      recentMatches,
      pendingHireRequests: hireRequests.length,
      creditScore: player.creditScore,
    };
  }

  async getHireRequests(userId: string, status?: string, page = 1, limit = 10) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.getHireRequests(
      player.id,
      status,
      page,
      limit
    );
  }

  async acceptHireRequest(userId: string, requestId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    const hireRequest = await this.playerRepository.getHireRequest(requestId);
    if (!hireRequest || hireRequest.playerId !== player.id) {
      throw createError("Hire request not found", 404);
    }

    if (hireRequest.status !== "PENDING") {
      throw createError("Hire request already processed", 400);
    }

    // Return the updated hire request
    return this.playerRepository.acceptHireRequest(requestId);
  }

  // Service method - add status validation
  async rejectHireRequest(
    userId: string,
    requestId: string,
    requestBody?: { status: string }
  ) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    const hireRequest = await this.playerRepository.getHireRequest(requestId);
    if (!hireRequest || hireRequest.playerId !== player.id) {
      throw createError("Hire request not found", 404);
    }

    if (hireRequest.status !== "PENDING") {
      throw createError("Hire request already processed", 400);
    }

    // Validate status if provided
    if (requestBody?.status && requestBody.status !== "REJECTED") {
      throw createError("Invalid status for reject operation", 400);
    }

    return this.playerRepository.rejectHireRequest(requestId);
  }

  async getMatches(userId: string, status?: string, page = 1, limit = 10) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.getMatches(player.id, status, page, limit);
  }

  async getMatch(userId: string, matchId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    const match = await this.playerRepository.getMatch(matchId);
    if (!match) {
      return null;
    }

    // Check if player is part of this match
    const playerInMatch = await this.playerRepository.isPlayerInMatch(
      player.id,
      matchId
    );
    if (!playerInMatch) {
      throw createError("You are not part of this match", 403);
    }

    return match;
  }

  async markAttendance(userId: string, matchId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    const match = await this.playerRepository.getMatch(matchId);
    if (!match) {
      throw createError("Match not found", 404);
    }

    // Check if player is part of this match
    const playerInMatch = await this.playerRepository.isPlayerInMatch(
      player.id,
      matchId
    );
    if (!playerInMatch) {
      throw createError("You are not part of this match", 403);
    }

    // Check if match is today
    const today = new Date();
    const matchDate = new Date(match.dateTime);
    const isSameDay = today.toDateString() === matchDate.toDateString();

    if (!isSameDay) {
      throw createError("Can only mark attendance on match day", 400);
    }

    return this.playerRepository.markAttendance(player.id, matchId);
  }

  async getTournaments(userId: string, status?: string, page = 1, limit = 10) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) throw createError("Player profile not found", 404);
    return this.playerRepository.getTournaments(player.id, status, page, limit);
  }

  async getTournament(userId: string, tournamentId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    const tournament = await this.playerRepository.getTournament(tournamentId);
    if (!tournament) {
      return null;
    }

    // Check if player is part of this tournament
    const playerInTournament = await this.playerRepository.isPlayerInTournament(
      player.id,
      tournamentId
    );
    if (!playerInTournament) {
      throw createError("You are not part of this tournament", 403);
    }

    return tournament;
  }

  async getPerformance(userId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.getPerformanceStats(player.id);
  }

  async getStats(userId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.getPlayerStats(player.id);
  }

  async getCreditHistory(userId: string, page = 1, limit = 20) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.getCreditHistory(player.id, page, limit);
  }

  async createAppeal(userId: string, reason: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    // Check if player has pending appeal
    const pendingAppeal = await this.playerRepository.getPendingAppeal(
      player.id
    );
    if (pendingAppeal) {
      throw createError("You already have a pending appeal", 400);
    }

    return this.playerRepository.createAppeal(player.id, reason);
  }

  async getAppeals(userId: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    return this.playerRepository.getAppeals(player.id);
  }

  async requestWithdrawal(userId: string, amount: number, phoneNumber: string) {
    const player = await this.playerRepository.findByUserId(userId);
    if (!player) {
      throw createError("Player profile not found", 404);
    }

    if (player?.user?.coins || 0 < amount) {
      throw createError("Insufficient balance", 400);
    }

    if (amount < 100) {
      throw createError("Minimum withdrawal amount is 100 coins", 400);
    }

    return this.playerRepository.requestWithdrawal(userId, amount, phoneNumber);
  }

  async getWithdrawals(userId: string) {
    return this.playerRepository.getWithdrawals(userId);
  }

  async verifyIdentity(userId: string, verificationData: any) {
    const existingVerification =
      await this.playerRepository.getIdentityVerification(userId);
    if (existingVerification) {
      throw createError("Identity verification already submitted", 400);
    }

    return this.playerRepository.createIdentityVerification(
      userId,
      verificationData
    );
  }

  async getVerificationStatus(userId: string) {
    return this.playerRepository.getIdentityVerification(userId);
  }
}
