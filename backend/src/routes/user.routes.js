import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controller/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

//Secure routes
router.route('/logout').get(verifyJwt, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);


export default router;