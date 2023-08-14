const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({
    heading : String,
    description : String,
    userId : String,
    category : String
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports = {BlogModel}