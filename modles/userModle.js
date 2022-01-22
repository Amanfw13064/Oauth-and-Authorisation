const mongoose=require('mongoose')

const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    roles:[{type:String,required:true}],
},{
  versionKey:false,
  timestamps:true,
}
)
userSchema.pre('save',function(next){
    if(!this.isModified('password')) return next()

    this.password=bcrypt.hashSync(this.password,8)
         next()

})

userSchema.methods.checkpassword=function(password){
  return bcrypt.compareSync(password,this.password)
}
module.exports=mongoose.model('user',userSchema)