// routes/userRouter
import express, {Request,Response  } from "express";
// import express from 'express';
// import {userServices} from '../services/userService'
import { UserController} from '../controllers/user.controller';
// import { AuthMiddleware } from "../middleware/authMiddleware";
import { AuthloginMiddleware } from "../middleware/login.middleware";
import { logoutMiddleware } from "../middleware/logout.middleware";


let userController = new UserController()
const router = express.Router();
// const authMiddleware = new AuthMiddleware();
const authloginMiddleware = new AuthloginMiddleware();
const LogoutMiddleware = new logoutMiddleware();


router.post('/login', authloginMiddleware.loginMiddleware, authloginMiddleware.loginUser)
router.post('/post', userController.createUsers)
router.get('/getAll', authloginMiddleware.isLoggedIn, userController.getuser)
router.get('/getUser/:id', authloginMiddleware.isLoggedIn, userController.getUserById)
router.delete('/delete/:id' , authloginMiddleware.isLoggedIn, userController.deleteById)
router.put('/:id', authloginMiddleware.isLoggedIn, userController.updateUser);
router.post('/logout/:userId',authloginMiddleware.isLoggedIn, LogoutMiddleware.logout);

export default router;

