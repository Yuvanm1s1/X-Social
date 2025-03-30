import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
import { createPost, getFollowingPosts} from "../controllers/post.controller.js";
import { likeUnlikePost} from "../controllers/post.controller.js";  
import { commentOnPost} from "../controllers/post.controller.js";
import { deletePost} from "../controllers/post.controller.js";
import { getAllPosts} from "../controllers/post.controller.js";
import { getLikedPosts} from "../controllers/post.controller.js";
import { getuserPosts} from "../controllers/post.controller.js";
router.get("/all",protectRoute,getAllPosts);
router.get("/following",protectRoute,getFollowingPosts);
router.get("/all/:id",protectRoute,getLikedPosts);
router.get("/user/:username",protectRoute,getuserPosts);
router.post("/create",protectRoute,createPost);
router.post("/like/:id",protectRoute,likeUnlikePost);
router.post("/comment/:id",protectRoute,commentOnPost);
router.delete("/:id",protectRoute,deletePost);


export default router;