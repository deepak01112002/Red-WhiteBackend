const express = require("express")
const { auth } = require("../Middleware/auth.middleware")
const { BlogModel } = require("../Model/blog.model")


const blogRoutes = express.Router()


blogRoutes.post("/add",auth,async (req,res)=>{ 
   const {heading,description,userId,category} = req.body
   
   try {
      const Blog = BlogModel({
        userId,
        heading,
        description,
        category
    })
      
      await Blog.save()
      res.status(200).send({"msg" : "Blog is Posted"})
   } catch (error) {
    res.status(400).send({"msg" : error.message})
   }
})

blogRoutes.get("/",auth,async(req,res)=>{
    try {
        const data = await BlogModel.find()
        res.status(200).send({"msg" : "Successfully fetched", "data" : data})
    } catch (error) {
        res.status(400).send({"msg" : error.message})
    }
})
blogRoutes.get("/:id",auth,async(req,res)=>{
    try {
        const data = await BlogModel.find({"_id" : req.params.id})
        res.status(200).send({"msg" : "Successfully fetched", "data" : data})
    } catch (error) {
        res.status(400).send({"msg" : error.message})
    }
})

blogRoutes.patch("/:id",async(req,res)=>{
    try {
        const existId = BlogModel.find({"_id" : req.params.id})
        if(existId){
          await BlogModel.findByIdAndUpdate(req.params.id,req.body)
          res.status(200).send({"msg" : "Updated Succssefully"})
        }else{
            res.status(400).send({"msg" : "Product not found"})
        }
    } catch (error) {
        res.status(400).send({"msg" : error.message})       
    }
})

blogRoutes.delete("/:id",async(req,res)=>{
    try {
        const existId = BlogModel.find({"_id" : req.params.id})
        if(existId){
          await BlogModel.findByIdAndDelete(req.params.id)
          res.status(200).send({"msg" : "Deleted Succssefully"})
        }else{
            res.status(400).send({"msg" : "Product not found"})
        }
    } catch (error) {
        res.status(400).send({"msg" : error.message})       
    }
})

module.exports = {blogRoutes}