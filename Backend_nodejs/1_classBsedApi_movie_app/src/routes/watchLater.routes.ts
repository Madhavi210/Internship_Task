import express,{ Router } from "express"
 
import { WacthLatercontroller } from "../controllers/watchLater.controller"
import { AuthloginMiddleware } from "../middleware/login.middleware"
import { WacthLaterService } from "../services/watchLater.service"
// import {PDFgenerator} from '../helper/pdfHelper'



let LoginMiddleWare = new AuthloginMiddleware()
let watchLaterRoute:Router = express.Router()
let  wacthLatercontroller = new  WacthLatercontroller()
watchLaterRoute.get('/getAllWatchLater/:profileId',LoginMiddleWare.isLoggedIn,wacthLatercontroller.getWatchLater)
watchLaterRoute.post('/addWatchLater/:profileId',LoginMiddleWare.isLoggedIn,wacthLatercontroller.addWatchLater) //movie Id from req.body
watchLaterRoute.delete('/deleteWatchLater/:profileId/:movieId',LoginMiddleWare.isLoggedIn,wacthLatercontroller.deleteWatchLater)

// watchLaterRoute.get('/donwloadPDF',wacthLatercontroller.downloadPDF)

// watchLaterRoute.get('/generatepdf', PDFgenerator)


export default watchLaterRoute ;