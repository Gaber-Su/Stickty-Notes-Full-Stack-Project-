// import { application } from 'express'
import multer from 'multer'

export const fileValidation = {
    image : ['image/jpg', 'image/png', 'image/jif'],
    pdf : ['application/pdf']
}

export const HME = (redirectPath)=> {
    return (err,req,res,next)=> {
        if (err) {
            req.flash('MulterError', err)
            res.redirect(redirectPath)
        } else {
            next()
        }
    }
}

export function myMulter(customValidation = fileValidation.image) {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (!customValidation.includes(file.mimetype)) {
            cb("In-valid Format", false)
        } else {
            cb(null, true)
        }
    }

    const upload = multer({ fileFilter, storage })
    return upload
}