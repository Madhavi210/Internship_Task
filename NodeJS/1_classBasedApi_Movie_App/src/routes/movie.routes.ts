import express, {Request,Response  } from "express";
import { movieController } from "../controllers/movie.controller";

const router = express.Router();
let MovieController = new movieController();
router.get('/getAll', MovieController.getAllMovies);
router.get('/:id',MovieController.getMovieById)
router.post('/post', MovieController.postMovie)
router.delete('/delete/',  MovieController.removeMovie)
router.delete('/delete/:id', MovieController.deleteMovieById);

export default router;

