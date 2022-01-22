const User=require('../modles/userModle')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const newToken=(user)=>{
    return jwt.sign({ user:user }, process.env.JWT_SECRET_KEY); 
}


const register=async(req,res)=>{
     try{
         let user=await User.findOne({email:req.body.email}).lean().exec()
         if(user)
         {
             return res.status(400).send({message:"User with that email already exists"})
         }
         user=await User.create(req.body)

         const token=newToken(user)

         return res.status(201).send({user,token})
     }catch(err){
         return res.status(500).send(err.message)
     }
}
const login=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})

        if(!user){
            res.status(400).send({message:"Either Email or password incorrect"})
        }
        const match=user.checkpassword(req.body.password)
        if(!match)
        {
            res.status(400).send({message:"Either Email or password incorrect"})
        }
        const token=newToken(user)
       return res.send({user,token})
    }catch(err){
        return res.status(500).send(err.message)
    }
}

module.exports={register,login,newToken}