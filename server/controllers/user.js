import userModel from '../modules/user.js'
import bcrypt from 'bcryptjs';

export const signin =async(req,res)=>{
    const {email,password}=req.body;
    try{
        const oldUser=await userModel.find({email});
        if(!oldUser) return res.status(404).json({message:"User dosn't exist"});
        const isPasswordCorrect=await bcrypt.compare(password,oldUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message:"Invalid credentials"});
        //jwt can't install because permission
        res.status(200).json({result:oldUser});
    }
    catch(err){  
        res.status(500).json({message:err})
    }
}
export const signup =async(req,res)=>{
   const { email, password, firstName, lastName } =req.body;
    try{
        const oldUser=await userModel.find({email});
        if(oldUser) return res.status(404).json({ message: "User already exists" });
        const hashPassword=await bcrypt.hash(password,12);
        const result =await userModel.create({email,name:`${firstName} ${lastName}`,password:hashPassword});
        
        //jwt can't install because permission
        
        res.status(201).json({ result });

    }
    catch(err){  
        res.status(500).json({message:err})
    }
}