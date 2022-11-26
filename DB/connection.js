import mongoose from "mongoose";

export const connectDB = async ()=> {
return await mongoose.connect(process.env.DBURI)
.then(()=> {
    console.log( 'Connected To DB Successfully ...' )
})
.catch((err)=> {
    console.log(`Failed To Connect DB... ${err}`)
}) 
}

