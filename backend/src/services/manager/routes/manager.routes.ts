import { Router, type IRouter } from "express";
import { ManagerController } from "../controllers/manager.controller";
import {
  authMiddleware,
  roleMiddleware,
  validateRequest,
} from "@/middlewares";
import { joinTournamentSchema } from "@/validators";
import { upload } from '@/utils';

const router: IRouter = Router();
const managerController = new ManagerController();

router.post(
  "/profile/setup",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.setupProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getProfile
);

// route
router.post(
  "/profile/image",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  upload.single("image"), // image field only
  managerController.uploadProfileImage
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.updateProfile
);

// Dashboard routes
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getDashboard
);

// Tournament browsing routes
router.get(
  "/tournaments",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getTournaments
);

router.get(
  "/tournaments/:id",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getTournament
);

router.post(
  "/tournaments/:id/join",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  validateRequest({ body: joinTournamentSchema }),
  managerController.joinTournament
);

// My tournaments routes
router.get(
  "/my-tournaments",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getMyTournaments
);

router.get(
  "/my-tournaments/:id",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getMyTournament
);

router.delete(
  "/my-tournaments/:id/leave",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.leaveTournament
);

// Team management routes
router.post(
  "/teams",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.createTeam
);

router.get(
  "/teams",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getTeams
);

router.get(
  "/teams/:id",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getTeam
);

router.put(
  "/teams/:id",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.updateTeam
);

router.delete(
  "/teams/:id",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.deleteTeam
);

// Player management routes
router.get(
  "/players",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getPlayers
);

router.get(
  "/players/:id",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getPlayer
);

router.post(
  "/players/:id/hire",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.hirePlayer
);

router.post(
  "/teams/:teamId/players/:playerId/add",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.addPlayerToTeam
);

router.delete(
  "/teams/:teamId/players/:playerId/remove",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.removePlayerFromTeam
);

router.post(
  "/teams/:teamId/players/:playerId/captain",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.setCaptain
);

// Leaderboard routes
router.get(
  "/leaderboard",
  authMiddleware,
  roleMiddleware(["MANAGER"]),
  managerController.getLeaderboard
);

export { router as managerRoutes };
