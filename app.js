import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)
import dotenv from 'dotenv'
dotenv.config({path:path.join(__dirname, './config/.env')})


import express from 'express'
import * as indexRouter from "./src/modules/index.router.js"
import { connectDB } from './DB/connection.js'
import session from 'express-session'
import mongoSession from 'connect-mongodb-session';
import flash from 'connect-flash'
const MongoDBStore = mongoSession(session)
var store = new MongoDBStore({
    uri: process.env.DBURI,
    collection: 'mySessions'
  });

const app = express()
const port = process.env.port

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/src/views/utilities')))
app.use(express.urlencoded({extended:true}))

// app.use(express.static(path.join(__dirname, './src/views/js')))
app.use(session({
    secret: process.env.SessionSecret,
    resave: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
    saveUninitialized: false,
    
  }))
app.use(flash())
app.use("/auth", indexRouter.authRouter)
app.use("/user", indexRouter.userRouter)
app.use("/note", indexRouter.noteRouter)
app.use("**", (req,res)=> {
    res.json({message:"In-valid Routing or Method url"})
})



connectDB()
// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))