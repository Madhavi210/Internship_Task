import mongoose,{Model, Schema} from "mongoose"
export interface IWatchLater{
    profileId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    movieId:mongoose.Schema.Types.ObjectId
}
 const watchLaterSchema = new Schema<IWatchLater>({
    profileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:[true,'Profile Id Required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User Id Required']
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movies',
        required:[true,'Movie Id Required']
    },
})
 
export const watchLater:Model<IWatchLater> = mongoose.model<IWatchLater>('watchLater',watchLaterSchema)
