const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const{ BadRequestError,UnauthenticatedError} = require('../errors/bad-request')

const register = async (req,res)=>{
    try {
        // get the datas from body
    
        console.log("hello")
        const user = await User.create({...req.body})
   
        console.log("hello")
        // take function from models
        const token = user.userJwt()
        res.status(StatusCodes.CREATED).json({token,user:{name:user.name,email:user.email}})
console.log(req.body)
        
    } catch (error) {
        console.log(error,"hello")
        
    }

}

const login = async(req,res)=>{
    try {
       const {email,password}  = req.body
       if(!email || !password){
        throw new BadRequestError("provide all fields")
       }
    //    find the person with given credantials
       const user = await User.findOne({email})
       if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
       }
    //    compare password
      const isPasswordCorrect=await user.comparePassword(password)
      if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Credentials")
       }

    //    take back the name with the token
       const token = user.userJwt()
       res.status(StatusCodes.OK).json({user:{name:user.name,token}})
    } catch (error) {
        console.log(error)
        
    }
}

module.exports={
    register,
    login
}