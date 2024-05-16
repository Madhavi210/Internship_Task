import mongoose, {Schema, Document} from 'mongoose'
import { User } from './user.model';
import { Movies } from './movie.model';


export interface Profiles extends Document {
  userId: User['_id'] ,
    profileName: string,
    age: number,
    address: string,
    phoneNumber: string,
    watchLaterMovies: Movies['_id']
}

const profileSchema: Schema = new Schema<Profiles>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the user schema
        required: true,
      },
      profileName: {
        type: String,
        required: [true, "Profile name is required"],
      },
      age: {
        type: Number,
      },
      address: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      watchLaterMovies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movies", // Refers to the movie schema
        },
      ],
    },
    {
      timestamps: true,
    }
);

export const  Profiles=  mongoose.model<Profiles>("Profiles", profileSchema);


