import { Router } from "express";
import { PlayerController } from "../controllers/player.controller";
import { authMiddleware, roleMiddleware } from "@/middlewares";
import { upload } from "@/utils";

const router: Router = Router();
const playerController = new PlayerController();

// Profile setup routes
router.post(
  "/profile/setup",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  upload.single("profilePicture"),
  playerController.setupProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getProfile
);

// routes/player.ts
router.post(
  "/upload/profile-image",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  upload.single("image"),
  playerController.uploadProfileImage
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.updateProfile
);

router.get(
  "/stats",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getStats
);

// Dashboard routes
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getDashboard
);

// Hire request routes
router.get(
  "/hire-requests",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getHireRequests
);

router.put(
  "/hire-requests/:id/accept",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.acceptHireRequest
);

router.put(
  "/hire-requests/:id/reject",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.rejectHireRequest
);

// Match routes
router.get(
  "/matches",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getMatches
);

router.get(
  "/matches/:id",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getMatch
);

router.post(
  "/matches/:id/attend",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.markAttendance
);

// Tournament routes
router.get(
  "/tournaments",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getTournaments
);

router.get(
  "/tournaments/:id",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getTournament
);

// Performance and stats routes
router.get(
  "/performance",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getPerformance
);

// Credit and appeals routes
router.get(
  "/credit-history",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getCreditHistory
);

router.post(
  "/appeals",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.createAppeal
);

router.get(
  "/appeals",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getAppeals
);

// Withdrawal routes
router.post(
  "/withdraw",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.requestWithdrawal
);

router.get(
  "/withdrawals",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getWithdrawals
);

// ID Verification routes
router.post(
  "/verify-identity",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "faceImage", maxCount: 1 },
  ]),
  playerController.verifyIdentity
);

router.get(
  "/verification-status",
  authMiddleware,
  roleMiddleware(["PLAYER"]),
  playerController.getVerificationStatus
);

export { router as playerRoutes };
