import jwt from "jsonwebtoken";
import "dotenv/config";

export function verifyToken(req, res, next){
    const token = req.headers["x-access-token"];

    if(!token){
        return res.send({adminAccess: false});
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    }catch(err){
        return res.send({adminAccess: false, message: "invalid token"});
    }

    return next();
} 