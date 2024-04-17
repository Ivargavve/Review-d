import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateImpressions,
  updateProfileViews,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:postUserId/impression", verifyToken, updateImpressions);
router.patch("/:friendId/view", verifyToken, updateProfileViews);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;