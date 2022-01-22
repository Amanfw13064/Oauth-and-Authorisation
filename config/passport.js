const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport=require('passport')

require('dotenv').config()

const {newToken}=require('../controllers/authController')

const User=require('../modles/userModle')

const { v4 :uuidv4 }=require('uuid');

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5555/auth/google/callback",
    // userProfileURL:"https://**www**googleleapis.com/oauth2/v3/userinfo",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    let user=await User.findOne({email:profile?._json?.email}).lean().exec()

    if(!user){
        user=await User.create({email:profile?._json?.email,password:uuidv4(),roles:["admin"]})
    }
  
console.log(profile?._json?.email)
  const token=newToken(user)
   return done(null,{user,token})
  }
));

module.exports=passport

