require ('dotenv').config()
const express = require('express')
const dbConnection = require('./utils/dbConnection')
const errorHandler = require('./middlewares/errorHandler')
const applyRoutes = require('./routes/routes')
const applyMiddleware = require('./middlewares/middlewares')
const sheduleTask = require('./utils/sheduleTask')
const app = express()
const path = require('path')

//serve client side file path
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname, './client/dist')));

//all middleware apply
applyMiddleware(app)

//database configuration
dbConnection()

//all routes enable
applyRoutes(app)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

//task
sheduleTask()

//errorHandling Configuration
errorHandler(app)

const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log('Server listening on port '+ port)
})