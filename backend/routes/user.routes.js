import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { followUnfollowUser } from "../controllers/user.controller.js";
import { getSuggestedUsers } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile/:username",protectRoute,getUserProfile);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.get("/suggested",protectRoute,getSuggestedUsers);
router.post("/update",protectRoute,updateUser);

export default router;