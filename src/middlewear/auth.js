import { userModel } from "../../DB/Model/user.model.js"

export const roles = {
    Admin : 'Admin',
    User : 'User',
    HR:'Hr'
}

export const auth = (accessRoles)=> {
    return async (req,res,next)=> {
        if (!req?.session?.user) {
            req.flash('errMessage', 'Not Login User')
            res.redirect('/auth/signin')
        } else {
            const user = await userModel.findById(req.session.user._id).select('userName email role profilePic')
            if (!user) {
            req.flash('errMessage', 'Not Register User')
                res.redirect('/auth/signin')
            } else {
                if (!accessRoles.includes(user.role)) {
                    res.redirect('/auth/signin')
                } else {
                    req.user=user
                    next()
                }
               
            }
        }
    }
}