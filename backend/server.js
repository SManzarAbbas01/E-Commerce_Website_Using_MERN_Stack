import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//App config
const app= express()
const port= process.env.PORT || 4000

//middleware
// whatevr request we will get it will be passed by json
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/',(req,res) => {
 res.send("API working")
})
