import express , {Request,Response} from 'express';
import { Profiles } from '../models/profile.model';
import { User } from '../models/user.model';
import PDFDocument from 'pdfkit'
import { Movies } from '../models/movie.model';
import { IWatchLater, watchLater } from '../models/watchLater.model';
import { getPdfHandler } from '../helper/pdfHelper';


export class profileService {
    getAllProfile = async(req:Request ,res:Response) =>{
            let profile = await Profiles.find({})
    }

    addProfile = async (req:Request ,res:Response)  => {
        const profileData:Profiles = req.body
        console.log(profileData);
        const profile = await Profiles.create(profileData);
        
        let {userId} = req.body
        let user = await User.findById(userId)

        if(!userId){
            res.status(404).json({message: "User Not Found"})
        }

        user?.profiles.push(profile)
        await user?.save()
    }
    getWatchLaterPDF = async (req:Request, res:Response) =>{
     
        const {profileId} = req.params
        const {userId} = req.body
        console.log(profileId);
        console.log(userId);
        const data:IWatchLater[] = await watchLater.find({ profileId, userId:userId })
        .populate({ path: "movieId"});
        const doc = getPdfHandler(data)
        
        if (data.length === 0) {
            res.status(404).json({message: "No Movies to show"})
            return doc;
        }else{
            res.setHeader('Content-Type', 'application/pdf');
        }
        doc.pipe(res)
        doc.end()
   
}
    deleteProfileById = async (req:Request ,res:Response)  =>{
        let {id} = req.params
        const profile = await Profiles.findByIdAndDelete(id)
    }
    
    deleteAllProfiles = async (req:Request ,res:Response) =>{
        const profile = await Profiles.deleteMany()
        console.log(profile);
    }

    getProfile = async (req:Request ,res:Response)  =>{
        let {id} = req.params
        console.log(id);
        let profile = await Profiles.findById(id) 
        console.log(profile);
    }

}


