import express, {Request, Response} from 'express'
import { movieService } from '../services/movie.service'
import { apiResponse } from '../helper/apiResponse';
import { errorHandler } from '../helper/errorHandler';

// import { ErrorClass } from '../helper/errorHelper'
// let obj = new ErrorClass;
const movieobj = new movieService();

export class movieController {

     getAllMovies = async(req:Request, res:Response) => {
        try {
            const data = await movieobj.getAllMovies(req,res);
            const response = new apiResponse(200,data, 'Movies retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    
     getMovieById = async(req:Request, res:Response) => {
        try {
            const data = await movieobj.getMovieById(req,res);
            const response = new apiResponse(200, data, "Movie retrieved by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    
     postMovie = async(req:Request, res:Response) => {
        try {
            const data = await movieobj.postMovie(req, res);
            const response = new apiResponse(200, data, "Movie created successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
     removeMovie = async (req:Request, res:Response) => {
        try {
            const data = await movieobj.removeMovie(req,res);
            const response = new apiResponse(200, data, "all Movie removed successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
     deleteMovieById = async(req:Request, res:Response) => {
        try {
            const data = await movieobj.deleteMovieById(req, res);
            const response = new apiResponse(200, data, "Movie deleted by id successfully");
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);        }
    }
    
}




