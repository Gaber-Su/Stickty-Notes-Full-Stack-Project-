import { Router } from "express";
import * as CU from './controller/user.js'
import { auth } from './../../middlewear/auth.js';
import { endPoint } from "./user.endPoint.js";
import { fileValidation, HME, myMulter } from "../../service/multer.js";

const router = Router()
router.get("/profile", auth(endPoint.profile),CU.profileUser)
router.post("/profile/pic", auth(endPoint.profile), myMulter(fileValidation.image).single('image'), HME('/user/profile'),CU.uploadProfilePhoto )

export default router