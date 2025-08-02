const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const ConnectDB = require('./config/database')


dotenv.config()
const  app = express()
const port = process.env.port || 5000
// const host = dotenv.env.host

ConnectDB()
app.use(express.json())
app.use(`/api/users`,userRoutes)

app.listen(port), ()=>{
    console.log(`Running on http://localhost:${port}`);
    
}