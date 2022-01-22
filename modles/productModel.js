const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    price:{type:Number,required:true}
})

module.exports=mongoose.model('product',productSchema)