import { User } from "../models/user.model";
import { Request, Response } from 'express'; 


export class logoutMiddleware{
    public async logout(req:Request, res:Response) {
        const {id} = req.params;
        try {
            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({message:"user not found"})
            }
             user.token = "";
             await user.save();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }


    }
}