// import { noteModel } from "../../../../DB/Model/note.model";
// import cloudinary from "../../../service/cloudinary";
import cloudinary from './../../../service/cloudinary.js';
import { noteModel } from './../../../../DB/Model/note.model.js';

export const getNotePage = async (req,res)=> {
    // res.json({message:"note Module"})
    const errMessage =  req.flash('errMessage')
  const oldInputs =   req.flash('oldInputs')
  const notes = await noteModel.find({})
    res.render('note', {errMessage, oldInputs, notes})
}

export const addNote = async (req,res)=> {
    if (!req.file) {
        req.flash('errMessage', 'Image Required')
        req.flash('oldInputs', req.body)
        res.redirect('/note')
    } else {
        const {noteBody} = req.body
        const {secure_url} = await cloudinary.uploader.upload(req.file.path, {folder :'EJSNote'})
        const note = await noteModel.create({noteBody,createdBy:req.user._id, picture:secure_url})
        res.redirect('/note')
    }
}

export const deleteNote =async (req,res)=> {
    const {id} = req.params
    const note = await noteModel.findOneAndDelete({_id:id,  createdBy:req.user._id})
    res.redirect('/note')
} 

export const getPostByIDToUpdate = async(req,res)=> {
    const {id}= req.params
    const errMessage = req.flash('errMessage')[0]
    const oldInputs = req.flash('oldInputs')[0]
    const note = await noteModel.findById({ _id: id })
    res.render('updateNote', {note, errMessage, oldInputs})
}

// export const updateNote = async(req,res)=> {
//     const {id} = req.params
//         const {noteBody} = req.body
//         const note = await noteModel.findById(id)
//         if (!note) {
//             res.redirect('/note')
//         } else {
//            let imageURL;
//             if (!req.file) {
//                 imageURL=note.picture
//             } else {
//             const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "PostEJS" })
//             imageURL = secure_url
//             }
//         const note = await noteModel.updateOne({ _id: id, userId: req.user._id }, { noteBody, picture: imageURl })
//             res.redirect("/note")
//         }
// }

export const updateNote = async(req,res)=> {
    const {id}= req.params
    const {noteBody} = req.body
    const note = await noteModel.findById(id)
    if (!note) {
        res.redirect('/note')
    } else {
        let imageURL;
        if (!req.file) {
            imageURL= note.picture
        } else {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "PostEJS" })
            imageURL=secure_url
        }
        const note = await noteModel.updateOne({ _id: id, userId: req.user._id }, {noteBody, picture:imageURL})
        res.redirect("/note")
    }
}