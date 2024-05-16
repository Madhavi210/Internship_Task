import express, {Request, Response}  from 'express'
import { env } from 'process';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userrouter from './src/routes/user.routes';
import movierouter from './src/routes/movie.routes';  
import profilerouter from './src/routes/profile.routes';
import watchLaterRoute from './src/routes/watchLater.routes';
import * as dotenv from 'dotenv';
import connectDB  from './src/db/db.config';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// const MONGO_URI:any = process.env.MONGO_URI;
const url = 'mongodb+srv://jmadhavi156:O0tXnOBTuWyGlIwQ@cluster0.e1vh9tw.mongodb.net/12_classBasedAPI?retryWrites=true&w=majority&appName=Cluster0'

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))


app.use('/user',userrouter);
app.use('/movie', movierouter);
app.use('/profile', profilerouter);
app.use('/watchLater', watchLaterRoute)

connectDB(url)
.then(() => {
    app.listen(PORT, () => {
        console.log(`server started on ${PORT}`)
    })
})
.catch((error) =>{
    console.log("failed to connect");
})


// mongoose.connect(MONGO_URI)
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`server started on ${PORT}`)
//     })
//     console.log("DB connected")
// })
// .catch(() => {
//     console.log('failed to connect with DB');
// })




