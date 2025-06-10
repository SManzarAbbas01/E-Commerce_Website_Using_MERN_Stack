import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb'
import connectCloudinary from './config/cloudinary'

//App config
const app= express()
const port= process.env.PORT || 4000

//ADDING CONNECT DB
connectDB ()

//ading clouinary
connectCloudinary()

//middleware
// whatevr request we will get it will be passed by json
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/',(req,res) => {
 res.send("API working")
})

app.listen(port,() => console.log ('server started on port :' + port))
