const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/userModel")


const userRoutes = express.Router()

userRoutes.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try {
        const emailCheck = await UserModel.findOne({email})
        if(emailCheck){
            res.status(400).send({"msg": "Email already exists"})
        }else{
            bcrypt.hash(password, 5, async(err,hash)=>{
                const newUser = new UserModel({
                    name,
                    email,
                    password:hash
                })
                await newUser.save()
                res.status(200).send({"msg":"User registered successfully"})
            })       
        }
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userId : user._id},"Red&White")
                    res.status(200).send({"msg" : "Login Successfull" , token : token,userId : user._id})
                }else{
                    res.status(400).send({"err" : "Wrong Credential Try Again"})
                }
            })
        }else{
            res.status(400).send({"msg" : "User Not found Register first"})
        }
    } catch (error) {
        res.status(400).status({"msg" : error.message})
    }
})
module.exports = {userRoutes}