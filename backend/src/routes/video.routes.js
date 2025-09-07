import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { uploadVideo } from "../controller/video.controller.js";

const router = Router();


//Secure routes
router.route('/upload-video').post(verifyJwt, upload.single("video"), uploadVideo);


export default router;