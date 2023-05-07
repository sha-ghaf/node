const express = require ('express')
require('./db/mongoose')
const app = express()
app.use(express.json())
const userRouter = require("./routers/user")
app.use(userRouter)
const port = process.env.PORT || 3000
app.listen( port , () => {
    console.log("All Done Successfully")
})






