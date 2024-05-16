import mongoose, {Schema, Document} from 'mongoose'
import movieGenre from '../enum/movieGener.enum';

export interface Movies extends Document {
    movieName: string,
    movieDesc: string,
    movieDuration: number,
    movieRating: number,
    movieReleaseDate: Date,
    movieGenre: string,

}

const movieSchema: Schema = new Schema<Movies>({
    movieName: {
        type: String,
        required: [true, "Movie Name is Compulasory"]
    },  

    movieDesc: {
        type: String,
        required: [true, "Movie Description is Compulasory"],
        maxLength: [300, "Not More then 300 Words"]
    },

    movieDuration: {
        type: Number,
        required: [true,  "Movie Duration is Compulasory"]
    },

    movieRating: {
        type: Number,
        required: false,
        max:[10, "Not More than 10 Stars"],
        min:[0, "Not More than 10 Stars"]
    },
    
    movieReleaseDate:{
        type:Date,
        required : [true," Movie Released Date is Compulasory"]
    },

    movieGenre: {
        type:String,
        enum : Object.values(movieGenre),
        required : [true, "Must Enter the Movie Genre"]
    },


});

export const  Movies =  mongoose.model<Movies>("Movies", movieSchema);


