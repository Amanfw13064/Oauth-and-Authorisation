const express=require('express')

const router=express.Router()

const Product=require('../modles/productModel')

const authenticate=require('../middleware/authenticate')

const authorise=require('../middleware/authorise')

router.post('',authenticate,authorise(['seller','admin']),async(req,res)=>{
    try{
        const item=await Product.create(req.body)
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
        const item=await Product.find().lean().exec()
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router;