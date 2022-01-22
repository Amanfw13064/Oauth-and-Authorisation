module.exports=(permittedRoles)=>{
    return (req,res,next)=>{
        const user=req.user
        let isallowed=false
        for(let i=0;i<user.roles.length;i++)
        {
            if(permittedRoles.includes(user.roles[i])){
                isallowed=true
                break
            }
        }
        if(isallowed)
        {
            next()
        }else{
            return res.status(403).send({message:"Permssion Denied"})
        }
    }
}