const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


// validating
const  userScehma=new  mongoose.Schema({
    name :{
        type:String,
        required:[true,'Provide the name'],
        minLength : 3,
        maxLength: 50
        
    },
    email :{
        type:String,
        required:[true,'Provide the email'],
        minLength : 3,
        maxLength: 50,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'pease Provide a valid email'],
        unique:true
    },
    password :{

        type:String,
        required:[true,'Provide the Password'],
        minLength : 9,
        maxLength: 12,
   

    },

})
// hashing password using pre middle function in mongoose
userScehma.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
   
  })

//   token generating using instance methods in mongoose
  userScehma.methods.userJwt = function(){
   return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
  }

//   compare hashed password
userScehma.methods.comparePassword=async function(candidatePassword){
    const isMatched = await bcrypt.compare(candidatePassword,this.password)
    return isMatched;
}

module.exports=mongoose.model('jobs',userScehma)