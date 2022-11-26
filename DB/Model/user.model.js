import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
userName:{type:String, required:true},
email:{type:String, required:true, unique:true},
password:{type:String, required:true},
profilePIc:String,
notes:[{type:Types.ObjectId, ref:'Note' }],
confirmEmail:{type:Boolean, default:false},
role:{type:String, enum:['User', 'Admin'], default:'User'}

}, {
    timestamps:true
})

export const userModel = model('User', userSchema)