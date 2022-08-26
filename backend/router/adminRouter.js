import {Router} from "express";
import { addPost, Login } from "../controller/adminController.js";
const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    next();
})
adminRouter.get('/login', Login);
adminRouter.get('/addPost', addPost);

export default adminRouter;