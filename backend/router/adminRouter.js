import { Router } from "express";
import {
  addPost,
  Login,
  uploadPost,
  uploadProject,
  getPosts,
  getPost,
  getProjects,
  updatePost
} from "../controller/adminController.js";
import { verifyToken } from "../middleware/adminMiddleware.js";
import multer from "multer";

const adminRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/images");
  },
  filename: (req, file, cb) => {
    const name = file.fieldname.toLowerCase();
    cb(null, new Date().getTime() + "-" + name + '.jpg');
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file) {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == 'image/webp'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("not a file image"));
      }
    }
  },
});


adminRouter.get("/", (req, res, next) => {
  next();
});
adminRouter.get("/test", (req, res) => {
  res.send({ data: "hello world" });
});
adminRouter.post("/login", Login);
adminRouter.get("/addPost", addPost);
adminRouter.post("/upload-post", upload.single("file"), uploadPost);
adminRouter.post("/update-post", upload.single("file"), updatePost);
adminRouter.get("/get-posts", getPosts);
adminRouter.get("/get-post/:id", getPost);
adminRouter.get("/get-projects", getProjects);
adminRouter.post("/upload-project", upload.fields([{ name: 'src', maxCount: 6 }, { name: 'pic', maxCount: 6 }]), uploadProject);
adminRouter.post("/auth", verifyToken, (req, res) => {
  res.send({ adminAccess: true, decoded: req.user });
});

export default adminRouter;
