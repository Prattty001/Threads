const express = require("express");
// const signupUser = require("../Controllers/Usercontroller");
const router = express.Router();
// const loginUser = require("../Controllers/Usercontroller");
const { signupUser, loginUser, logoutUser,followUnfollowUser, updateUser, getUserProfile } = require("../Controllers/Usercontroller");

const ProtectRoute = require("../middleware/ProtectRoute.js");

router.get("/profile/:username",getUserProfile)
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/follow/:id", ProtectRoute, followUnfollowUser);
router.post("/update/:id",ProtectRoute,updateUser)

module.exports = router;