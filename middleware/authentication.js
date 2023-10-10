const User = require('../models/User')
const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')

const auth = async(req,res,next)=>{
    // checking the header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decrypt = jwt.verify(token,process.env.JWT_SECRET)
        // attach the user to the job routes
        req.user={userId:decrypt.userId,name:decrypt.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
        console.log(error)
        
    }

}
module.exports=auth