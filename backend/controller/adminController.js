import { mongo } from "../mongodb.js";
import Jwt from "jsonwebtoken";
import 'dotenv/config'

export async function Login(req, res) {
    const { user, password } = req.body;
    if (user && password) {
        const login = mongo.db("Personal_Cms").collection("admins").find({ username: user, password: password });
        const data = await login.toArray();
        if (data.length != 0) {
            const token = Jwt.sign(
                {user_id: data[0]._id, user},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "20h"
                }
            );
            await mongo.db("Personal_Cms").collection("admins").updateOne({_id: data[0]._id}, {$set: { token: token}});
            res.send({userToken: token});
            mongo.close();
        } else {
            res.status(500).send({ error: "username atau password salah" })
        }
    }else{
        res.status(501).send({error: "field tidak boleh kosong"})
    }
}

export async function uploadPost(req, res){
    const url = req.protocol + '://' + req.get('host');
    const { title, text, tags} = req.body;
    await mongo.db("Personal_Cms").collection("posts").insertOne({
        title: title,
        text: text,
        tags: tags,
        imageHeader: url + '/upload/images/' + req.file.filename
    })

    res.status(200).send('file upload successfully');
    mongo.close();
}

export async function addPost(req, res) {
    try {
        const database = await mongo.db('fahmi').collection('basyar').insertOne({
            name: "vorxsaken"
        });
        res.send(database);
        mongo.close();
    } catch (err) {
        console.log(err);
    }
}