import { prisma } from "@/utils/client";
import { generateUniqueId } from "@/utils";
import type { User, UserRole } from "@prisma/client";

export class AuthRepository {
  async create(userData: {
    email: string;
    phoneNumber?: string;
    name: string;
    username: string;
    role: UserRole;
    passwordHash: string;
    profilePicture?: string;
    location?: string;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        id: await generateUniqueId(prisma.user),
        ...userData,
      },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { phoneNumber },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  // async findByZitadelId(zitadelId: string): Promise<User | null> {
  //   return prisma.user.findUnique({
  //     where: { zitadelId },
  //     include: {
  //       organizer: true,
  //       manager: true,
  //       playerProfile: true,
  //     },
  //   });
  // }

  // async createWithZitadel(userData: {
  //   id: string;
  //   email: string;
  //   name: string;
  //   zitadelId: string;
  //   profilePicture?: string;
  //   isVerified?: boolean;
  // }): Promise<User> {
  //   // Generate a unique username from email if not provided
  //   const baseUsername = userData.email.split("@")[0];
  //   let username = baseUsername;

  //   // Check if username exists and make it unique if needed
  //   let counter = 1;
  //   while (await prisma.user.findUnique({ where: { username } })) {
  //     username = `${baseUsername}${counter}`;
  //     counter++;
  //   }

  //   return prisma.user.create({
  //     data: {
  //       id: userData?.id,
  //       email: userData.email,
  //       name: userData.name,
  //       username: username,
  //       passwordHash: "",
  //       zitadelId: userData.zitadelId,
  //       profilePicture: userData.profilePicture,
  //       isVerified: userData.isVerified || true,
  //       role: "PLAYER",
  //       coins: 0,
  //     },
  //     include: {
  //       organizer: true,
  //       manager: true,
  //       playerProfile: true,
  //     },
  //   });
  // }

  // Keep your existing methods, just update createWithZitadel:

  async findByZitadelId(zitadelId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { zitadelId },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  async createWithZitadel(userData: {
    id: string;
    email: string;
    name: string;
    zitadelId: string;
    role: string;
    profilePicture?: string;
    isVerified?: boolean;
  }): Promise<User> {
    // Generate a unique username from email if not provided
    const baseUsername = userData.email.split("@")[0];
    let username = baseUsername;

    // Check if username exists and make it unique if needed
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return prisma.user.create({
      data: {
        id: userData?.id,
        email: userData.email,
        name: userData.name,
        username: username,
        passwordHash: "",
        zitadelId: userData.zitadelId,
        profilePicture: userData.profilePicture,
        isVerified: userData.isVerified || true,
        role: null,
        coins: 0,
      },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  // ADD: New method for updating user role
  // In your auth.repository.ts, fix the updateUserRole method:

  async updateUserRole(userId: string, role: string): Promise<User> {
    console.log("Updating user role:", { userId, role }); // Debug log

    if (!userId) {
      throw new Error("User ID is required");
    }

    return prisma.user.update({
      where: {
        id: userId, // Make sure userId is properly passed here
      },
      data: {
        role: role as UserRole, // Type cast to UserRole enum
        // Optional: Add timestamp for when role was assigned
        updatedAt: new Date(),
      },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
      include: {
        organizer: true,
        manager: true,
        playerProfile: true,
      },
    });
  }

  async getExistingUsernames(): Promise<string[]> {
    const users = await prisma.user.findMany({
      select: {
        username: true,
      },
    });
    return users.map((user) => user.username);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async blockUser(blockerId: string, blockedId: string) {
    return prisma.userBlock.create({
      data: {
        id: await generateUniqueId(prisma.userBlock),
        blockerId,
        blockedId,
      },
    });
  }

  async unblockUser(blockerId: string, blockedId: string) {
    return prisma.userBlock.delete({
      where: {
        blockerId_blockedId: {
          blockerId,
          blockedId,
        },
      },
    });
  }

  async getBlockedUsers(userId: string) {
    return prisma.userBlock.findMany({
      where: { blockerId: userId },
      include: {
        blocked: {
          select: {
            id: true,
            name: true,
            phoneNumber: true,
            profilePicture: true,
          },
        },
      },
    });
  }

  async searchUsers(query: string, userId: string) {
    return prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phoneNumber: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
        ],
        NOT: { id: userId },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        username: true,
        profilePicture: true,
        role: true,
      },
      take: 20,
    });
  }

  async getUserStats() {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: {
        updatedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    return {
      totalUsers,
      activeUsers,
      userGrowth: {
        thisMonth: await prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
        lastMonth: await prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                1
              ),
              lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
      },
    };
  }

  async getLeaderboard() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        profilePicture: true,
        role: true,
        coins: true,
        organizer: {
          select: {
            _count: {
              select: {
                tournaments: true,
              },
            },
          },
        },
        manager: {
          select: {
            _count: {
              select: {
                teams: true,
              },
            },
          },
        },
        playerProfile: {
          select: {
            _count: {
              select: {
                teams: true,
              },
            },
          },
        },
      },
      orderBy: [{ coins: "desc" }, { createdAt: "asc" }],
      take: 10,
    });
  }
}
