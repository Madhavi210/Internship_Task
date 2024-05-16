import express , {Request,Response} from 'express';
import { Profiles } from '../models/profile.model';
import { profileService } from '../services/profile.service';
// import { ErrorClass } from '../helper/errorHelper';
import { apiResponse } from '../helper/apiResponse';
import { errorHandler } from '../helper/errorHandler';


// let obj = new ErrorClass;

const profileobj = new profileService();

export class profileController{

    getAllProfile = async(req:Request, res:Response) =>{
        try {
            const data = await profileobj.getAllProfile(req, res);
            const response = new apiResponse(200, data, "profiles retrieved successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            // const profileerror = obj.errorHelper(error);
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    
    addProfile = async(req:Request, res:Response) =>{
        try {
            const data = await profileobj.addProfile(req, res);
            const response = new apiResponse(200, data, "profile created successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    downloadPDF = async(req:Request, res:Response) =>{
        try{
            const data = await profileobj.getWatchLaterPDF(req,res);
            const response = new apiResponse(200, data, " pdf downloaded successfully");
            res.status(response.statusCode).json(response);
        } catch(error:any){
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);  
        }
       }
    
    deleteProfileById = async(req:Request, res:Response) =>{
        try {
            const data = await profileobj.deleteProfileById(req, res);
            const response = new apiResponse(200, data, "profile deleted by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
    deleteAllProfiles = async(req:Request, res:Response) =>{
        try {
            const data = await profileobj.deleteAllProfiles(req,res);
            const response = new apiResponse(200, data, "profiles deleted successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
    getProfile = async(req:Request, res:Response) => {
        try {
            const data = await profileobj.getProfile(req, res);
            const response = new apiResponse(200, data, "profile retrieved by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);            
        }
    }
}


