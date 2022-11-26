import { userModel } from "../../../../DB/Model/user.model.js"
import cloudinary from "../../../service/cloudinary.js"

export const profileUser = (req,res)=> {
    // res.json({message:"user Module"})
    const profilePic = req.flash('ProfilePic')[0]
    const imageRequired = req.flash('imageRequired')[0]

    res.render('profileuser', {profilePic, imageRequired})
}

export const uploadProfilePhoto = async (req,res)=> {
    if (!req.file) {
        req.flash("imageRequired", 'image Required')
        res.redirect('/user/profile')
    } else {
        const {secure_url} = await cloudinary.uploader.upload(req.file.path, {folder : 'EJSFolder'})
        await userModel.updateOne({_id:req.user._id}, {profilePIc:secure_url})
        req.flash('ProfilePic', secure_url)

        res.redirect('/user/profile')
    }
}