import express,{Express, Request,Response} from 'express';
import { watchLater,IWatchLater } from '../models/watchLater.model';
import { Profiles } from '../models/profile.model';
import { Movies } from '../models/movie.model';
import PDFDocument  from 'pdfkit'
 
export class WacthLaterService{
    getWatchLater = async(req:Request, res:Response) =>{
       const {profileId} = req.params
       const {userId} = req.body
       const WatchLater:IWatchLater[] = await watchLater.find({userId:userId,profileId:profileId}).populate({path:"movieId"})
    }
 
    addWatchLater = async(req:Request, res:Response) =>{
        const {profileId} = req.params
        const {movieId, userId} = req.body 
        await watchLater.create(
            {
                profileId: profileId,
                userId: userId,
                movieId: movieId
            }
        )
    }
 
    deleteWatchLater = async (req:Request,res:Response) =>{
        const {profileId, movieId} = req.params
        let WatchLater = await watchLater.findByIdAndDelete({_id:movieId})
        if(!WatchLater){
            res.status(400).json({message:"Already Deleted From Watch Later or Invalid Id Taken!!!!"})
        }
    }

}

