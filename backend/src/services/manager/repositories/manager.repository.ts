import { prisma } from '@/utils/client';
import { HireStatus, TournamentStatus } from "@prisma/client";
import { generateUniqueId } from "@/utils";

export class ManagerRepository {
  async create(userId: string, profileData: any) {
    const manager = await prisma.manager.create({
      data: {
        id: await generateUniqueId(prisma.manager),
        userId,
        areaLocation: profileData.areaLocation,
      },
      include: {
        user: true,
      },
    });

    return {
      ...manager,
      name: manager.user.name,
      email: manager.user.email,
    };
  }

  async findByUserId(userId: string) {
    return prisma.manager.findUnique({
      where: { userId },
      include: {
        user: true,
        teams: {
          include: {
            tournament: true,
            players: {
              include: {
                player: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, updateData: any) {
    return prisma.manager.update({
      where: { id },
      data: {
        areaLocation: updateData.areaLocation,
        user: {
          update: {
            name: updateData.name,
            email: updateData.email,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.manager.delete({
      where: { id },
    });
  }

  async exists(id: string) {
    const manager = await prisma.manager.findUnique({
      where: { id },
    });
    return !!manager;
  }

  async findByField(field: string, value: any) {
    return prisma.manager.findFirst({
      where: { [field]: value },
      include: {
        user: true,
      },
    });
  }

  async findAll(filters?: any) {
    const where: any = {};

    if (filters?.name) {
      where.user = {
        name: {
          contains: filters.name,
          mode: "insensitive",
        },
      };
    }

    if (filters?.location) {
      where.areaLocation = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    if (filters?.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    return prisma.manager.findMany({
      where,
      include: {
        user: true,
      },
    });
  }

  async count(filters?: any) {
    const where: any = {};

    if (filters?.name) {
      where.user = {
        name: {
          contains: filters.name,
          mode: "insensitive",
        },
      };
    }

    if (filters?.location) {
      where.areaLocation = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    if (filters?.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    return prisma.manager.count({ where });
  }

  async getStatistics(managerId: string) {
    const manager = await prisma.manager.findUnique({
      where: { id: managerId },
      include: {
        teams: {
          include: {
            tournament: true,
          },
        },
      },
    });

    if (!manager) {
      throw new Error("Manager not found");
    }

    const totalTournaments = manager.teams.length;
    const wonTournaments = manager.teams.filter(
      (team) => team.tournament.winnerTeamId === team.id
    ).length;
    const activeTeams = manager.teams.filter(
      (team) => team.tournament.status === "ACTIVE"
    ).length;

    return {
      totalTournaments,
      wonTournaments,
      activeTeams,
      winRate:
        totalTournaments > 0 ? (wonTournaments / totalTournaments) * 100 : 0,
    };
  }

  async getRecentActivity(managerId: string) {
    const teams = await prisma.team.findMany({
      where: { managerId },
      include: {
        tournament: true,
        players: {
          include: {
            player: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return teams.map((team) => ({
      type: "TEAM_CREATED",
      team: team.name,
      tournament: team.tournament.location, // Use location instead of name
      date: team.createdAt,
    }));
  }

  async getActiveTeams(managerId: string) {
    return prisma.team.findMany({
      where: {
        managerId,
        tournament: {
          status: "ACTIVE",
        },
      },
    });
  }

  async getPendingInvitations(managerId: string) {
    return prisma.hireRequest.findMany({
      where: {
        managerId,
        status: "PENDING",
      },
    });
  }

  async getInvitation(playerId: string, teamId: string) {
    // Since there's no teamInvitation model, we'll use hireRequest
    // This is a simplified implementation
    const teams = await prisma.team.findMany({
      where: { id: teamId },
      select: { managerId: true },
    });

    const managerIds = teams.map((t) => t.managerId);

    return prisma.hireRequest.findFirst({
      where: {
        playerId,
        managerId: {
          in: managerIds,
        },
      },
    });
  }

  async invitePlayer(
    managerId: string,
    playerId: string,
    teamId: string,
    message?: string
  ) {
    // Get tournament ID from team
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { tournamentId: true },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    return prisma.hireRequest.create({
      data: {
        id: await generateUniqueId(prisma.hireRequest),
        managerId,
        playerId,
        tournamentId: team.tournamentId,
        status: "PENDING",
        message,
      },
    });
  }

  async getTeamInvitations(teamId: string) {
    // Get manager ID from team
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { managerId: true },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    return prisma.hireRequest.findMany({
      where: {
        managerId: team.managerId,
        status: "PENDING",
      },
      include: {
        player: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async acceptInvitation(invitationId: string, playerId: string) {
    return prisma.$transaction(async (tx) => {
      const invitation = await tx.hireRequest.findUnique({
        where: { id: invitationId },
      });

      if (!invitation) {
        throw new Error("Invitation not found");
      }

      // Get team ID from tournament and manager
      const team = await tx.team.findFirst({
        where: {
          managerId: invitation.managerId,
          tournamentId: invitation.tournamentId,
        },
      });

      if (!team) {
        throw new Error("Team not found");
      }

      // Add player to team
      await tx.teamPlayer.create({
        data: {
          id: await generateUniqueId(tx.teamPlayer),
          teamId: team.id,
          playerId: invitation.playerId,
        },
      });

      // Update invitation status
      await tx.hireRequest.update({
        where: { id: invitationId },
        data: { status: "ACCEPTED" },
      });
    });
  }

  async rejectInvitation(invitationId: string, playerId: string) {
    return prisma.hireRequest.update({
      where: { id: invitationId },
      data: { status: "REJECTED" },
    });
  }

  async searchPlayers(query: string, filters?: any) {
    const where: any = {
      user: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    };

    if (filters?.area) {
      where.user.location = {
        contains: filters.area,
        mode: "insensitive",
      };
    }

    if (filters?.role) {
      if (filters.role === "batsman") {
        where.battingStyle = { not: null };
      } else if (filters.role === "bowler") {
        where.bowlingType = { not: null };
      } else if (filters.role === "wicketkeeper") {
        where.wicketkeeping = true;
      }
    }

    return prisma.playerProfile.findMany({
      where,
      include: {
        user: true,
        stats: true,
      },
      take: 20,
    });
  }

  async getRecommendedPlayers(teamId: string, criteria: any) {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: {
          include: {
            player: true,
          },
        },
      },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    // Get players with similar skills to existing team members
    const existingPlayerIds = team.players.map((tp) => tp.playerId);

    return prisma.playerProfile.findMany({
      where: {
        id: { notIn: existingPlayerIds },
        isTemporarilyBanned: false,
        isPermanentlyBanned: false,
      },
      include: {
        user: true,
        stats: true,
      },
      orderBy: {
        creditScore: "desc",
      },
      take: 10,
    });
  }

  async getTeamStats(teamId: string) {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: {
          include: {
            player: {
              include: {
                stats: true,
              },
            },
          },
        },
        tournament: true,
      },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    const totalPlayers = team.players.length;
    const averageRating =
      team.players.reduce((sum, tp) => sum + (tp.player.stats?.stars || 0), 0) /
      totalPlayers;

    return {
      totalPlayers,
      averageRating,
      tournament: team.tournament.location,
      teamName: team.name,
    };
  }

  async getTournaments(filters: any, page: number, limit: number) {
    const where: any = {
      OR: [
        {
          status: TournamentStatus.PENDING,
          tournamentDateTime: { gt: new Date() },
        },
        {
          status: TournamentStatus.ACTIVE,
        },
      ],
    };

    if (filters.area) {
      where.location = {
        contains: filters.area,
        mode: "insensitive",
      };
    }

    if (filters.overs) {
      where.matchOvers = filters.overs;
    }

    if (filters.gameType) {
      where.gameType = filters.gameType;
    }

    if (filters.entryFee) {
      where.entryFee = filters.entryFee;
    }

    const tournaments = await prisma.tournament.findMany({
      where,
      include: {
        organizer: { include: { user: true } },
        teams: {
          include: {
            manager: { include: { user: true } },
          },
        },
      },
      orderBy: { tournamentDateTime: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.tournament.count({ where });

    return {
      tournaments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getTournament(tournamentId: string) {
    return prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        organizer: {
          include: {
            user: true,
          },
        },
        teams: {
          include: {
            manager: {
              include: {
                user: true,
              },
            },
            players: {
              include: {
                player: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        fixtures: {
          include: {
            match: {
              include: {
                homeTeam: true,
                awayTeam: true,
              },
            },
          },
        },
      },
    });
  }

  async joinTournament(
    managerId: string,
    tournamentId: string,
    teamStatus: HireStatus,
    teamName: string,
    entryFee: number
  ) {
    return prisma.$transaction(async (tx) => {
      // Get manager to validate existence
      const manager = await tx.manager.findUnique({
        where: { id: managerId },
      });

      if (!manager) {
        throw new Error("Manager not found");
      }

      // Create team only (skip coin operations)
      const team = await tx.team.create({
        data: {
          id: await generateUniqueId(tx.team),
          name: teamName,
          status: teamStatus,
          managerId,
          tournamentId,
        },
      });

      return team;
    });
  }

  async getMyTournaments(managerId: string) {
    return prisma.team.findMany({
      where: { managerId },
      include: {
        tournament: {
          include: {
            organizer: {
              include: {
                user: true,
              },
            },
          },
        },
        players: {
          include: {
            player: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        tournament: {
          tournamentDateTime: "desc",
        },
      },
    });
  }

  async getMyTournament(managerId: string, tournamentId: string) {
    return prisma.team.findFirst({
      where: {
        managerId,
        tournamentId,
      },
      include: {
        tournament: {
          include: {
            organizer: {
              include: {
                user: true,
              },
            },
            teams: {
              include: {
                manager: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            fixtures: {
              include: {
                match: {
                  include: {
                    homeTeam: true,
                    awayTeam: true,
                    scorecards: true,
                  },
                },
              },
            },
          },
        },
        players: {
          include: {
            player: {
              include: {
                user: true,
                stats: true,
              },
            },
          },
        },
      },
    });
  }

  async findTeamInTournament(managerId: string, tournamentId: string) {
    return prisma.team.findFirst({
      where: {
        managerId,
        tournamentId,
      },
    });
  }

  async getTournamentTeams(tournamentId: string) {
    return prisma.team.findMany({
      where: { tournamentId },
    });
  }

  async leaveTournament(teamId: string, entryFee: number, userId: string) {
    return prisma.$transaction(async (tx) => {
      // Delete team
      await tx.team.delete({
        where: { id: teamId },
      });

      // Refund entry fee
      await tx.user.update({
        where: { id: userId },
        data: {
          coins: {
            increment: entryFee,
          },
        },
      });

      // Create transaction record
      await tx.coinTransaction.create({
        data: {
          id: await generateUniqueId(tx.coinTransaction),
          userId,
          amount: entryFee,
          type: "BUY", // Refund
        },
      });
    });
  }

  async createTeam(managerId: string, teamData: any) {
    return prisma.$transaction(async (tx) => {
      // Create team
      const team = await tx.team.create({
        data: {
          id: await generateUniqueId(tx.team),
          name: teamData.name,
          logo: teamData.logo,
          jersey: teamData.jersey,
          status: teamData.status,
          managerId,
          tournamentId: teamData.tournamentId,
        },
      });
      // Create group chat for the team
      const manager = await tx.manager.findUnique({
        where: { id: managerId },
        include: { user: true },
      });
      const chatGroup = await tx.chatGroup.create({
        data: {
          id: await generateUniqueId(tx.chatGroup),
          name: `${team.name} Team Chat`,
          teamId: team.id,
          creatorId: manager!.userId,
        },
      });
      // Add manager as group member
      await tx.chatGroupMember.create({
        data: {
          id: await generateUniqueId(tx.chatGroupMember),
          groupId: chatGroup.id,
          userId: manager!.userId,
        },
      });
      return team;
    });
  }

  async getTeams(managerId: string) {
    // Optional: Validate manager exists
    const manager = await prisma.manager.findUnique({
      where: { id: managerId },
    });

    if (!manager) {
      throw new Error("Manager not found");
    }

    return prisma.team.findMany({
      where: { managerId },
      include: {
        tournament: true,
        players: {
          include: {
            player: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }

  async getTeam(teamId: string) {
    return prisma.team.findUnique({
      where: { id: teamId },
      include: {
        tournament: true,
        manager: {
          include: {
            user: true,
          },
        },
        players: {
          include: {
            player: {
              include: {
                user: true,
                stats: true,
              },
            },
          },
        },
      },
    });
  }

  async updateTeam(teamId: string, teamData: any) {
    return prisma.team.update({
      where: { id: teamId },
      data: teamData,
      include: {
        tournament: true,
        players: {
          include: {
            player: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteTeam(teamId: string) {
    return prisma.team.delete({
      where: { id: teamId },
    });
  }

  async getPlayers(filters: any, page: number, limit: number) {
    const where: any = {
      isTemporarilyBanned: false,
      isPermanentlyBanned: false,
    };

    if (filters.area) {
      where.user = {
        location: {
          contains: filters.area,
          mode: "insensitive",
        },
      };
    }

    if (filters.role) {
      if (filters.role === "batsman") {
        where.battingStyle = { not: null };
      } else if (filters.role === "bowler") {
        where.bowlingType = { not: null };
      } else if (filters.role === "wicketkeeper") {
        where.wicketkeeping = true;
      }
    }

    // Add name/keyword search support
    if (filters.name) {
      where.user = {
        ...(where.user || {}),
        name: {
          contains: filters.name,
          mode: "insensitive",
        },
      };
    }

    const players = await prisma.playerProfile.findMany({
      where,
      include: {
        user: true,
        stats: true,
      },
      orderBy: {
        creditScore: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.playerProfile.count({ where });

    return {
      players,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getPlayer(playerId: string) {
    return prisma.playerProfile.findUnique({
      where: { id: playerId },
      include: {
        user: true,
        stats: true,
        matches: {
          include: {
            match: {
              include: {
                tournament: true,
              },
            },
          },
          orderBy: {
            match: {
              dateTime: "desc",
            },
          },
          take: 10,
        },
      },
    });
  }

  async createHireRequest(
    managerId: string,
    playerId: string,
    tournamentId: string,
    message?: string
  ) {
    return prisma.hireRequest.create({
      data: {
        id: await generateUniqueId(prisma.hireRequest),
        managerId,
        playerId,
        tournamentId,
        status: "PENDING",
        message,
      },
    });
  }

  async findHireRequest(
    managerId: string,
    playerId: string,
    tournamentId: string
  ) {
    return prisma.hireRequest.findFirst({
      where: {
        managerId,
        playerId,
        tournamentId,
      },
    });
  }

  async addPlayerToTeam(teamId: string, playerId: string) {
    return prisma.teamPlayer.create({
      data: {
        id: await generateUniqueId(prisma.teamPlayer),
        teamId,
        playerId,
      },
      include: {
        team: { select: { id: true, name: true } },
        player: { select: { id: true, userId: true } },
      },
    });
  }

  async removePlayerFromTeam(teamId: string, playerId: string) {
    return prisma.teamPlayer.delete({
      where: {
        teamId_playerId: {
          teamId,
          playerId,
        },
      },
    });
  }

  async findPlayerInTeam(teamId: string, playerId: string) {
    return prisma.teamPlayer.findUnique({
      where: {
        teamId_playerId: {
          teamId,
          playerId,
        },
      },
    });
  }

  async getTeamPlayers(teamId: string) {
    return prisma.teamPlayer.findMany({
      where: { teamId },
      include: {
        player: {
          include: {
            user: true,
            stats: true,
          },
        },
      },
    });
  }

  async setCaptain(teamId: string, playerId: string) {
    return prisma.$transaction(async (tx) => {
      // Remove captain from all players in team
      await tx.teamPlayer.updateMany({
        where: { teamId },
        data: { isCaptain: false },
      });

      // Set new captain
      await tx.teamPlayer.update({
        where: {
          teamId_playerId: {
            teamId,
            playerId,
          },
        },
        data: { isCaptain: true },
      });
    });
  }

  async getManagerStats(managerId: string) {
    const teams = await prisma.team.findMany({
      where: { managerId },
      include: {
        tournament: true,
      },
    });

    const totalTournaments = teams.length;
    const wonTournaments = teams.filter(
      (team) => team.tournament.winnerTeamId === team.id
    ).length;
    const totalEarnings = 0; // Calculate based on winnings

    return {
      totalTournaments,
      wonTournaments,
      totalEarnings,
      winRate:
        totalTournaments > 0 ? (wonTournaments / totalTournaments) * 100 : 0,
    };
  }

  async getLeaderboard(type: string, page: number, limit: number) {
    if (type === "managers") {
      // Get top managers by tournaments won
      const managers = await prisma.manager.findMany({
        include: {
          user: true,
          teams: {
            include: {
              tournament: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      const leaderboard = managers.map((manager) => {
        const wonTournaments = manager.teams.filter(
          (team) => team.tournament.winnerTeamId === team.id
        ).length;
        return {
          ...manager,
          wonTournaments,
          totalTournaments: manager.teams.length,
        };
      });

      return {
        leaderboard: leaderboard.sort(
          (a, b) => b.wonTournaments - a.wonTournaments
        ),
        pagination: {
          page,
          limit,
          total: managers.length,
          pages: Math.ceil(managers.length / limit),
        },
      };
    }

    if (type === "players") {
      const players = await prisma.playerProfile.findMany({
        include: {
          user: true,
          stats: true,
        },
        orderBy: {
          stats: {
            stars: "desc",
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await prisma.playerProfile.count();

      return {
        leaderboard: players,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    }

    return { leaderboard: [], pagination: { page, limit, total: 0, pages: 0 } };
  }
}
