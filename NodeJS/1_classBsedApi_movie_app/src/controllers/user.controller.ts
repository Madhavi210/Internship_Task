import express , {Request,Response,} from 'express';
import bodyParser  from "body-parser";
import {User} from '../models/user.model'
import jwt from 'jsonwebtoken'
import { userServices } from '../services/user.service';
// import {ErrorClass} from '../helper/errorHelper'
import { apiResponse } from '../helper/apiResponse';
import { errorHandler } from '../helper/errorHandler';


// let obj  = new ErrorClass();

const userobj = new userServices();
export class UserController{

     getuser = async (req:Request, res:Response) =>{
        try {
            const data = await userobj.getAllUser(req,res);
            const response = new apiResponse(200, data, "User retrieved successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            // const usererror = obj.errorHelper(error);
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    } 
    
     createUsers = async (req:Request, res:Response) =>{
        try {
            const data = await  userobj.createUser(req, res);
            const response = new apiResponse(200, data, "User created successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
     deleteById = async (req:Request, res:Response) => {
        try {
           const data = await  userobj.deleteUserById(req,res);
           const response = new apiResponse(200, data, "User deleted by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
     getUserById = async (req:Request, res:Response) =>{
        try {
           const data = await userobj.getById(req,res);
           const response = new apiResponse(200, data, "User retrieved by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
     updateUser = async (req:Request, res:Response) =>{
        try {
            const data = await userobj.updateUser(req,res);
            const response = new apiResponse(200, data, "User updated by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }


}

