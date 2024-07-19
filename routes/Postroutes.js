
const express = require("express");
const {createPost,getPosts, deletePost, Likeunlike, replyPost, getFeedPost} = require("../Controllers/postcontroller");
const ProtectRoute = require("../middleware/ProtectRoute");
const router = express.Router();

router.get("/feed",ProtectRoute,getFeedPost);
router.get("/:id",getPosts);
router.post("/create", ProtectRoute, createPost);
router.delete("/:id", ProtectRoute, deletePost);
router.post("/like/:id"  , ProtectRoute, Likeunlike);
router.post("/reply/:id",ProtectRoute,replyPost);


module.exports=router;