import { Tournament } from "@prisma/client";
import { generateUniqueId } from "@/utils";
import { prisma } from '@/utils/client';

export class PlayerRepository {
  async create(userId: string, profileData: any) {
    return prisma.playerProfile.create({
      data: {
        id: await generateUniqueId(prisma.playerProfile),
        userId,
        homeTown: profileData.homeTown,
        currentAddress: profileData.currentAddress,
        battingStyle: profileData.battingStyle,
        bowlingType: profileData.bowlingType,
        bowlingArm: profileData.bowlingArm || "Right",
        wicketkeeping: profileData.wicketkeeping || false,
        preferredPosition: profileData.preferredPosition || 1,
        battingPosition: profileData.battingPosition || 1,
      },
      include: {
        user: true,
        stats: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.playerProfile.findUnique({
      where: { userId },
      include: {
        user: true,
        stats: true,
        teams: {
          include: {
            team: {
              include: {
                tournament: true,
              },
            },
          },
        },
      },
    });
  }

async update(id: string, updateData: any) {
    return prisma.playerProfile.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        stats: true,
      },
    });
  }
  
  async getPlayerStats(playerId: string) {
    return prisma.playerStats.findUnique({
      where: { playerId },
    });
  }

  async getUpcomingMatches(playerId: string) {
    return prisma.match.findMany({
      where: {
        players: {
          some: {
            playerId,
          },
        },
        dateTime: {
          gt: new Date(),
        },
        status: "SCHEDULED",
      },
      include: {
        tournament: true,
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: {
        dateTime: "asc",
      },
      take: 5,
    });
  }

  async getRecentMatches(playerId: string) {
    return prisma.match.findMany({
      where: {
        players: {
          some: {
            playerId,
          },
        },
        status: "COMPLETED",
      },
      include: {
        tournament: true,
        homeTeam: true,
        awayTeam: true,
        players: {
          where: {
            playerId,
          },
        },
      },
      orderBy: {
        dateTime: "desc",
      },
      take: 5,
    });
  }

  async getPendingHireRequests(playerId: string) {
    return prisma.hireRequest.findMany({
      where: {
        playerId,
        status: "PENDING",
      },
    });
  }

  async getHireRequests(
    playerId: string,
    status?: string,
    page = 1,
    limit = 10
  ) {
    const where: any = { playerId };
    if (status) {
      where.status = status;
    }

    const hireRequests = await prisma.hireRequest.findMany({
      where,
      include: {
        manager: {
          include: {
            user: true,
          },
        },
        tournament: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.hireRequest.count({ where });

    return {
      hireRequests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getHireRequest(requestId: string) {
    return prisma.hireRequest.findUnique({
      where: { id: requestId },
      include: {
        manager: {
          include: {
            user: true,
          },
        },
        tournament: true,
      },
    });
  }

  async acceptHireRequest(requestId: string) {
    return prisma.hireRequest.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
    });
  }

  async rejectHireRequest(requestId: string) {
    return prisma.hireRequest.update({
      where: { id: requestId },
      data: { status: "REJECTED" },
      include: {
        manager: {
          include: { user: true },
        },
        player: {
          include: { user: true },
        },
        tournament: true,
      },
    });
  }

  async getMatches(playerId: string, status?: string, page = 1, limit = 10) {
    const where: any = {
      players: {
        some: {
          playerId,
        },
      },
    };

    if (status) {
      where.status = status;
    }

    const matches = await prisma.match.findMany({
      where,
      include: {
        tournament: true,
        homeTeam: true,
        awayTeam: true,
        players: {
          where: {
            playerId,
          },
        },
        scorecards: true,
      },
      orderBy: {
        dateTime: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.match.count({ where });

    return {
      matches,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getMatch(matchId: string) {
    return prisma.match.findUnique({
      where: { id: matchId },
      include: {
        tournament: true,
        homeTeam: {
          include: {
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
        awayTeam: {
          include: {
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
        players: {
          include: {
            player: {
              include: {
                user: true,
              },
            },
          },
        },
        scorecards: true,
      },
    });
  }

  async isPlayerInMatch(playerId: string, matchId: string) {
    const matchPlayer = await prisma.matchPlayer.findUnique({
      where: {
        matchId_playerId: {
          matchId,
          playerId,
        },
      },
    });
    return !!matchPlayer;
  }

  async markAttendance(playerId: string, matchId: string) {
    // This would typically update an attendance field
    // For now, we'll just ensure the player record exists
    return prisma.matchPlayer.upsert({
      where: {
        matchId_playerId: {
          matchId,
          playerId,
        },
      },
      update: {},
      create: {
        id: await generateUniqueId(prisma.matchPlayer),
        matchId,
        playerId,
      },
    });
  }

  async getTournaments(
    playerId: string,
    status?: string,
    page = 1,
    limit = 10
  ): Promise<{
    tournaments: Tournament[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    const where: any = {
      teams: {
        some: {
          players: {
            some: { playerId },
          },
        },
      },
    };

    if (status) {
      where.status = status;
    }

    const tournaments = await prisma.tournament.findMany({
      where,
      include: {
        organizer: { include: { user: true } },
        teams: {
          where: { players: { some: { playerId } } },
          include: { manager: { include: { user: true } } },
        },
      },
      orderBy: { tournamentDateTime: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.tournament.count({ where });

    return {
      tournaments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
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
        matches: {
          include: {
            homeTeam: true,
            awayTeam: true,
            scorecards: true,
          },
        },
        fixtures: true,
      },
    });
  }

  async isPlayerInTournament(playerId: string, tournamentId: string) {
    const teamPlayer = await prisma.teamPlayer.findFirst({
      where: {
        playerId,
        team: {
          tournamentId,
        },
      },
    });
    return !!teamPlayer;
  }

  async getPerformanceStats(playerId: string) {
    const matches = await prisma.matchPlayer.findMany({
      where: { playerId },
      include: {
        match: {
          include: {
            tournament: true,
          },
        },
      },
    });

    const totalMatches = matches.length;
    const totalRuns = matches.reduce((sum, match) => sum + match.runs, 0);
    const totalWickets = matches.reduce(
      (sum, match) => sum + match.wicketsTaken,
      0
    );
    const totalBallsFaced = matches.reduce(
      (sum, match) => sum + match.ballsFaced,
      0
    );
    const totalOversBowled = matches.reduce(
      (sum, match) => sum + match.oversBowled,
      0
    );

    const battingAverage = totalBallsFaced > 0 ? totalRuns / totalMatches : 0;
    const bowlingAverage = totalWickets > 0 ? totalRuns / totalWickets : 0;
    const strikeRate =
      totalBallsFaced > 0 ? (totalRuns / totalBallsFaced) * 100 : 0;

    return {
      totalMatches,
      totalRuns,
      totalWickets,
      battingAverage: Math.round(battingAverage * 100) / 100,
      bowlingAverage: Math.round(bowlingAverage * 100) / 100,
      strikeRate: Math.round(strikeRate * 100) / 100,
      recentForm: matches.slice(-5).map((match) => ({
        runs: match.runs,
        wickets: match.wicketsTaken,
        tournament: match.match.tournament.gameType,
        date: match.match.dateTime,
      })),
    };
  }

  async getCreditHistory(playerId: string, page = 1, limit = 20) {
    const creditHistory = await prisma.creditHistory.findMany({
      where: { playerId },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.creditHistory.count({
      where: { playerId },
    });

    return {
      creditHistory,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async createAppeal(playerId: string, reason: string) {
    return prisma.appeal.create({
      data: {
        id: await generateUniqueId(prisma.appeal),
        playerId,
        reason,
        status: "PENDING",
      },
    });
  }

  async getPendingAppeal(playerId: string) {
    return prisma.appeal.findFirst({
      where: {
        playerId,
        status: "PENDING",
      },
    });
  }

  async getAppeals(playerId: string) {
    return prisma.appeal.findMany({
      where: { playerId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async requestWithdrawal(userId: string, amount: number, phoneNumber: string) {
    return prisma.withdrawalRequest.create({
      data: {
        id: await generateUniqueId(prisma.withdrawalRequest),
        userId,
        amount,
        phoneNumber,
        status: "PENDING",
      },
    });
  }

  async getWithdrawals(userId: string) {
    return prisma.withdrawalRequest.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createIdentityVerification(userId: string, verificationData: any) {
    return prisma.identityVerification.create({
      data: {
        id: await generateUniqueId(prisma.identityVerification),
        userId,
        fullName: verificationData.fullName,
        dob: new Date(verificationData.dob),
        frontImage: verificationData.frontImage,
        backImage: verificationData.backImage,
        faceImage: verificationData.faceImage,
      },
    });
  }

  async getIdentityVerification(userId: string) {
    return prisma.identityVerification.findUnique({
      where: { userId },
    });
  }
}
