// middleware/loginMiddleware
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken'
// import Usre from '../models/userModel';

export class AuthloginMiddleware {
    public async loginMiddleware(req:Request , res:Response, next:NextFunction){
        const {name, password} = req.body;

        try {
            const user = await User.findOne({ name });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // console.log(user);
            
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // console.log(isPasswordCorrect);
            
            // else {
            //         res.status(401).json({ message: "Invalid credentials" });
            //     }
            
          next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
     

    isLoggedIn = async(req:Request, res:Response,next:NextFunction)=>{
        try{
            let {userId} = req.body
            let validUser:User|null = await User.findOne({_id:userId,$expr:{$gt:[{$strLenCP:"$token"},0]}})
 
            if(validUser){
                next()
            }else{
                res.json({message: "User Not Logged in"})
            }
        }catch(error){
            // let message:string = errorObj.errorHelper(error)
            // res.json({message})
        }
    }

     loginUser  = async (req:Request, res:Response) => {
        try{
            const {name, password} = req.body;
            const user = await User.findOne({name})
            if(!user) {
                res.status(400).json({ message: "User  is required." });
                return;
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
 
            const token = jwt.sign({userId:user._id}, "BOOOM");
 
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $set: { token } },
                { new: true }
            );
            
            res.status(200).json({message: "Login Successfully", user})
        }catch(error){
            res.send(error)
            // let message:string = errorObj.errorHelper(error)
            // res.json({message})
        }   
    }


}


