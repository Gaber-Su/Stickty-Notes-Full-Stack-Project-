import  {userModel}  from './../../../../DB/Model/user.model.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { sendNodeMailer } from '../../../service/email.js';

//! sign up
export const getSignUp = (req,res)=> {
    // res.render('signup', {errMessage:""})
    const errMessage = req.flash('errMessage')[0]
    const oldInputs = req.flash('oldInputs')[0]
    const validationErr = req.flash('validationErr')
    res.render('signup', {errMessage, oldInputs, validationErr})
}
export const signUp = async (req,res)=> {
    const {userName, email, password} = req.body
    // console.log({userName, email, password})
    // res.render('signup')
    const user = await userModel.findOne({email}).select('email')
    if (user) {
        // res.render('signup', {errMessage:"Email Exist"})
        req.flash('errMessage', 'Email Exists')
        req.flash('oldInputs', req.body)
        res.redirect('/auth')
    } else {
        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.saltRound)) 
        const savedUser = await userModel.create({userName, email, password:hashPassword})
        const token = jwt.sign({id:savedUser._id}, process.env.emailToken)
        const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
        const message = `<a href="${link}">Confirm Email</a>`
        await sendNodeMailer(savedUser.email, 'confirm Email',message )
        res.redirect('/auth')
    }
}

//! confirm Email
export const confirmEmail  = async (req,res)=> {
    const {token} = req.params
    const decoded = jwt.verify(token, process.env.emailToken )
    if (!decoded?.id) {
        res.redirect('/auth/signup')    
    } else {
        const user = await userModel.updateOne({_id:decoded.id, confirmEmail:false}, {confirmEmail:true})
        user?  res.redirect('/auth/signin') : res.redirect('/auth/signup') 
       
    }
}

//!sign in 
export const signIn = async (req,res)=> {
    const {email, password} = req.body
    // console.log({userName, email, password})
    // res.render('signup')
    const user = await userModel.findOne({email})
    if (!user) {
        req.flash('errMessage', 'Email Not Exist')
        req.flash('oldInputs', req.body)

        res.redirect('signin')
        // res.render('signin', {errMessage:"Email Not Exist"})
    } else {
     if (!user.confirmEmail) {
        req.flash('errMessage', 'Please Confirm Email First')
        req.flash('oldInputs', req.body)
        res.redirect('signin')

        // res.render('signin', {errMessage:"Please Confirm Email First"})
        
     } else {
        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            req.flash('errMessage', 'Please Enter valid Password')
            req.flash('oldInputs', req.body)
            res.redirect('signin')

        // res.render('signin', {errMessage:"Please Enter valid Password"})
            
        } else {
            req.session.user = {             //*************************************************** */
                _id:user._id
            }
        res.redirect('/note')
            
        }
        
     }
    }
}
 
export const getSignIn = (req,res)=> {
    const errMessage =  req.flash('errMessage')[0]
   const oldInputs =  req.flash('oldInputs')[0]
   const validationErr = req.flash('validationErr')

    res.render('signin', {errMessage, oldInputs, validationErr})
}


//! log out
export const logOut = (req,res)=> {
    req.session.destroy()
    res.redirect('/auth/signin')
}