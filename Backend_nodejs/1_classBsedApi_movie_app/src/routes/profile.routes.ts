import express, {Request,Response  } from "express";
import { profileController } from "../controllers/profile.controller";
import { AuthloginMiddleware } from "../middleware/login.middleware";
 
const router = express.Router();
let ProfileController = new profileController();

const authloginMiddleware = new AuthloginMiddleware();

router.get('/getAll',authloginMiddleware.isLoggedIn, ProfileController.getAllProfile);
router.post('/post',authloginMiddleware.isLoggedIn, ProfileController.addProfile);
router.get('/getId/:id',authloginMiddleware.isLoggedIn,  ProfileController.getProfile);
router.delete('/delete/:id',authloginMiddleware.isLoggedIn, ProfileController.deleteProfileById);
router.get('/downloadPdf/:profileId', ProfileController.downloadPDF)
export default router;

