
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
import bcryptjs from 'bcryptjs';
import User from '../Schema/User.js';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

 const generateUsername = (email) => {  
  let username = email.split("@")[0];
  username+=nanoid(5);
  return username;
}



export const signup = async (req,res,next) =>{
try{
    const{fullname,email,password} = req.body;
  if(fullname.length<3){
     return next({code:501,message:"fullname must be greater then 3 letter"});
    }

  if(!email){ 
    return next({code:501,message:"please provide email"});
}
  if(!emailRegex.test(email)){ 
    return next({code:501,message:"please provide correct email"});
}
  if(!password){ 
    return next({code:501,message:"please provide password"});
}
  if(!passwordRegex.test(password)){ 
    return next({code:501,message:"password must contain 6 to 20 character,1 lowercase,1 uppercase,1 numeric"});
}

const salt = bcryptjs.genSaltSync(10);
const hashPassword = await bcryptjs.hash(password,salt);

    const username = generateUsername(email);

    const newUser = new User({
        personal_info:{
            fullname,
            email,
            password:hashPassword,
            username
        }
    });

    await newUser.save();

    res.status(200).send({
        message:"user sucksexfully created",
        newUser
    })

}
catch(err){
  if(err.code == 11000){
    return  next({code:403,message:"Email is allready exists",error:err});
  }
    next({code:500,message:"signup error",error:err});
}
}

export const signin = async (req,res,next) =>{
try{
    const{email,password} = req.body;

  if(!email){ 
    return next({code:501,message:"please provide email"});
}
  if(!password){ 
    return next({code:501,message:"please provide password"});
}
  
  const isExist = await User.findOne({"personal_info.email":email})

  if(!isExist){
    return next({code:401,message:"user not found, please register"});
  }

  const isPasswordCorrect = await bcryptjs.compare(password,isExist.personal_info.password);

  if(!isPasswordCorrect){
    return next({code:401,message:"incorrect email or password"});
  }


const token = jwt.sign({id:isExist._id},process.env.jwt_key,{expiresIn:"1d"})

    res.status(200).send({
      token,
      message:"user logged in successfully",
      isExist
    })

}
catch(err){
    next({code:403,message:"user login/signin error",error:err});

}
}

export default {signup,signin};