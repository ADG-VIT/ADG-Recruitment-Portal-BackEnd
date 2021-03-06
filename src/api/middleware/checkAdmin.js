const jwt = require("jsonwebtoken")
require('dotenv/config')
const User=require('../../models/user.js')

module.exports = (req,res,next) => {
  const token = req.header("auth-token")
  if(!token){
    res.status(401).send({
      message:"Auth Failed!"
    })
  }


  try{
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded
      console.log(decoded)
      userid=req.user._id
      console.log(userid)


      
       User.findOne({_id:userid},function(err,user){
         if(user===null){
          res.status(403).send({
            message:"User not found!"
          })

         }
         else{
           console.log(user);
              if(!user.isAdmin)
          res.status(403).send({
           message:"Not an Admin!"
         })
         else
         next();
           
         }
        
       });
     
  }
  catch(error){
    console.error(error)
    return res.status(401).json({
      message: "Token Invalid!"
    })
  }
}
