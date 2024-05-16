import { strict } from 'assert';
import  dotenv from 'dotenv';
import mongoose from 'mongoose';
// const MONGO_URI = 'mongodb+srv://jmadhavi156:O0tXnOBTuWyGlIwQ@cluster0.e1vh9tw.mongodb.net/12_classBasedAPI?retryWrites=true&w=majority&appName=Cluster0'

// dotenv.config(); //first config and then pass uri
// const url = process.env.MONGO_URI;

// export class connectDB {
//     static connect(){
//         mongoose.connect(MONGO_URI)
//         .then(() => {
           
//             console.log("DB connected")
//         })
//         .catch((error) => {
//             console.log('failed to connect with DB', error);
//         })  
//     } 
// }


const connectDB =  async (url:any) => {
   return await mongoose.connect(url);
}

export default connectDB;