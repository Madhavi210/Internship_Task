import express , {Request,Response} from 'express';
import { Movies } from '../models/movie.model';
import PDFDocument from 'pdfkit'

export class movieService {
    getAllMovies = async (req:Request ,res:Response)  => {
            const movies =  await Movies.find({})
    }
    
    getMovieById = async (req:Request ,res:Response)  =>{
        const { id } = req.params;
        const movies = await Movies.findById(id)
        console.log(movies);
    }

    postMovie = async (req:Request ,res:Response) => {
        await Movies.create(req.body);
        console.log(Movies);
    }

    removeMovie = async (req:Request ,res:Response) =>{
          const movies = await Movies.deleteMany();
          console.log(movies);
          
    }
    
      //delete Single movie By Id
    deleteMovieById = async (req:Request ,res:Response)  =>{
          let { id }= req.params
          const movies = await Movies.findByIdAndDelete(id) 
          console.log(movies);
          if(!movies){
            return res.status(404).json({message: "Invalid Movie ID"})  // RETURN NEEDED HERE
          }
    }

    
}
