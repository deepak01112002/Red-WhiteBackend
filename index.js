

const express = require("express")
const {connection} = require("./db")
const cors = require("cors")
const { userRoutes } = require("./Routes/userRoutes")
const { BlogModel } = require("./Model/blog.model")
const { blogRoutes } = require("./Routes/blogRoutes")

const app = express()
app.use(cors())
app.use(express.json())


app.use("/user",userRoutes)
app.use("/blog",blogRoutes)


app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
})