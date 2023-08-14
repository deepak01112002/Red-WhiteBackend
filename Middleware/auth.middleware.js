const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try {
            const decode = jwt.verify(token.split(" ")[1],"Red&White")
            
            req.body.userId = decode.userId
            if(decode){
                next()
            }else{
                res.status(400).send({"msg" : "Login First"}) 
            }
        } catch (error) {
            res.send({"err":error.message})
        }
    }else{
        res.status(400).send({"msg" : "Login First"})
    }
}
module.exports = {auth}