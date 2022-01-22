const express=require('express')

const app=express()

app.use(express.json())

const {register,login}=require('./controllers/authController')

const productController=require('./controllers/productController')

const passport=require('./config/passport')

app.post('/register',register)

app.post('/login',login)

// app.use(passport.initialize())

passport.serializeUser((user,done)=>{
    console.log('serializeUser')
    done(null,user)
  })
  passport.deserializeUser((user,done)=>{
      console.log('deserializeUser')
     done(null, user)
  })

app.use('/product',productController)

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        // successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}),(req,res)=>{
    return res.status(201).json({user:req.user.user,token:req.user.token})
}
);
// app.get('auth/google/success',(req,res)=>{
//     return res.send('success')
// })
// app.get('auth/google/failure',(req,res)=>{
//     return res.send('failure')
// })

module.exports=app