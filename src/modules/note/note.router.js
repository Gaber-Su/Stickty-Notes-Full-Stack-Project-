import { Router } from "express";
import { auth } from "../../middlewear/auth.js";
import * as noteController from './controller/note.js'
import { endPoint } from "./note.endPoint.js";
import { fileValidation, HME, myMulter } from './../../service/multer.js';
const router = Router()
router.get("/", noteController.getNotePage)
router.post("/", auth(endPoint.addNote), myMulter(fileValidation.image).single('image'), HME(), noteController.addNote)
router.get("/:id/delete", auth(endPoint.deleteNote), noteController.deleteNote)
router.get("/:id/getPostByIDToUpdate", auth(endPoint.deleteNote), noteController.getPostByIDToUpdate)
router.post("/:id/update", auth(endPoint.addNote), myMulter(fileValidation.image).single('image'), noteController.updateNote)
export default router