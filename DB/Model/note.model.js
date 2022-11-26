import { Schema, model, Types } from "mongoose";

const noteSchema = new Schema({
noteBody:{type:String, required:true},
createdBy:{type:Types.ObjectId, required:true, ref:'User'},
picture:String,


}, {
    timestamps:true
})

export const noteModel = model('note', noteSchema)