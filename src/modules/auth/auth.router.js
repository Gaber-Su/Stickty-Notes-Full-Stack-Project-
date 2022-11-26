import { Router } from "express";
import { auth } from "../../middlewear/auth.js";
import { validation } from "../../middlewear/validation.js";
import { endPoint } from "./auth.endPoint.js";
import * as RC from './controller/registeration.js'
import * as validators from './auth.validation.js'
const router = Router()

//! get sign up front end...
router.get("/", RC.getSignUp)
// end point for sign in 
router.post("/signup", validation(validators.signup, '/auth'), RC.signUp)

// end point for confirm Email
router.get("/confirmEmail/:token", RC.confirmEmail)

//! get sign in front end...
router.get('/signin', RC.getSignIn)
// end point for sign in 
router.post('/signin',validation(validators.signin, '/auth/signin')  ,RC.signIn)
//! end point for logOut
router.get("/logout", auth(endPoint.logout), RC.logOut)


export default router