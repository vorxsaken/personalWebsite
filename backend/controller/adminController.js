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
        } else {
            res.status(500).send({ error: "username atau password salah" })
        }
    }else{
        res.status(501).send({error: "field tidak boleh kosong"})
    }
}

export async function uploadPost(req, res){
    const prefixUrl = req.protocol + '://' + req.get('host');
    const url = prefixUrl + '/upload/images/' + req.file.filename
    const { title, subtitle, text, tags} = req.body;
    const post = await mongo.db("Personal_Cms").collection("posts").insertOne({
        title: title,
        subtitle: subtitle,
        text: text,
        tags: tags,
        imageHeader: url
    })

    res.status(200).send({message: 'Post Uploades Successfully',id: post.insertedId ,imageUrl: url});
}

export async function uploadProject(req, res){
    const url = req.protocol + '://' + req.get('host');
    const { title, deskripsi, github} = req.body;
    await mongo.db("Personal_Cms").collection("projects").insertOne({
        title: title,
        deskripsi: deskripsi,
        github: github,
        imageHeader: url + '/upload/images/' + req.file.filename
    })

    res.status(200).send('file uploade successfully');
}

export async function getPosts(req, res){
    const database = mongo.db("Personal_Cms").collection('posts').find({});
    const posts = await database.toArray();

    res.status(200).send(posts);
}

export async function getProjects(req, res){
    const database = mongo.db("Personal_Cms").collection('projects').find({});
    const projects = await database.toArray();

    res.status(200).send(projects);
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