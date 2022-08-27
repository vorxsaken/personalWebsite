import {Router} from "express";
import { addPost, Login } from "../controller/adminController.js";
import { verifyToken } from "../middleware/adminMiddleware.js";

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    next();
})
adminRouter.get('/test', (req, res) => {
    res.send({data: "hello world"});
})
adminRouter.post('/login', Login);
adminRouter.get('/addPost', addPost);
adminRouter.post('/auth', verifyToken, (req, res) => {
    res.send({adminAccess: true, decoded: req.user});
})

export default adminRouter;