const jwt = require('jsonwebtoken');

const verifyJWT  = async(req,res,next)=>{
    const token =  req.headers['x-access-token'];
    if(!token){
        res.send({message:"You may need token to get here!"})
    }else{
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.send({auth:false,message:'Authentication failed!'});
            }else{
                req.userId = decoded.id;
                next()
            }
        })
    }
}

module.exports = verifyJWT;