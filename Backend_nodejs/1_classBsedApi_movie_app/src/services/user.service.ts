
import express , {Request,Response} from 'express';
import {User} from '../models/user.model'
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';


export class userServices {
    createUser = async(req: Request, res: Response) => {
            const hashedPassword = await bcrypt.hash(req.body.password, 10) 
            const newuser =  await User.create({...req.body, password:hashedPassword});
            res.status(200).json(newuser);
            console.log(newuser);          
        }
    
    
    getAllUser = async(req:Request, res:Response) => {
            const users = await User.find();
            console.log(users);
    }

    deleteUserById = async(req:Request, res:Response) => {
            const {id} = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
    }

    getById = async(req:Request, res:Response) => {
            const {id} = req.params;
            const users =  await User.findById(id);
    }

    updateUser = async(req:Request, res:Response) => {
            const {id} = req.params;
            const users = await User.findByIdAndUpdate(id, req.body, {new:true});
    }

}
