import { ErrorClass } from "../helper/errorHelper";
import { WacthLaterService } from '../services/watchLater.service';
import {Request, Response} from 'express'
// let errorObj = new ErrorClass()
let watchLaterService = new WacthLaterService()
import { apiResponse } from '../helper/apiResponse';
import { errorHandler } from '../helper/errorHandler';

export class WacthLatercontroller{
 
    getWatchLater = async (req:Request,res:Response) =>{
        try{
            const data = await watchLaterService.getWatchLater(req,res);
            const response = new apiResponse(200, data, "retrieved from watch later successfully");
            res.status(response.statusCode).json(response);
        }catch(error:any){
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
 
    }

    addWatchLater = async (req:Request,res:Response) =>{
        try{
            const data = await watchLaterService.addWatchLater(req,res)
            const response = new apiResponse(200, data, "added to watch later successfully");
            res.status(response.statusCode).json(response);
        }catch(error:any){
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
 
    deleteWatchLater = async (req:Request, res:Response) =>{
        try{
            const data = await watchLaterService.deleteWatchLater(req,res)
            const response = new apiResponse(200, data, "deleted from watch later successfully");
            res.status(response.statusCode).json(response);
        }catch(error:any){
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
}