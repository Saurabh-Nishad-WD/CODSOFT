
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
import bcryptjs from 'bcryptjs';
import User from '../Schema/User.js';
export const signup = async (req,res,next) =>{
try{
    const{fullname,email,password} = req.body;
  if(fullname.length<3){
     return next({code:501,error:"fullname must be greater then 3 letter"});
    }

  if(!email){ 
    return next({code:501,error:"please provide email"});
}
  if(!emailRegex.test(email)){ 
    return next({code:501,error:"please provide correct email"});
}
  if(!password){ 
    return next({code:501,error:"please provide password"});
}
  if(!passwordRegex.test(password)){ 
    return next({code:501,error:"password must contain 6 to 20 character,1 lowercase,1 uppercase,1 numeric"});
}

const salt = bcryptjs.genSaltSync(10);
const hashPassword = await bcryptjs.hash(password,salt);

    const username = email.split("@")[0];

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
    next({code:500,error:err});
}
}

export default signup;