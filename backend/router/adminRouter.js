import {Router} from "express";
import { addPost, Login, uploadPost } from "../controller/adminController.js";
import { verifyToken } from "../middleware/adminMiddleware.js";
import multer from "multer"

const adminRouter = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/images')
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase();
        cb(null, new Date().getTime() + '-' + filename)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }else {
            cb(null, false);
            return cb(new Error('not a file image'))
        }
    }
})

adminRouter.get('/', (req, res, next) => {
    next();
})
adminRouter.get('/test', (req, res) => {
    res.send({data: "hello world"});
})
adminRouter.post('/login', Login);
adminRouter.get('/addPost', addPost);
adminRouter.post('/upload-file', upload.single('file'), uploadPost);
adminRouter.post('/auth', verifyToken, (req, res) => {
    res.send({adminAccess: true, decoded: req.user});
})

export default adminRouter;