import { mongo } from "../mongodb.js";
import Jwt from "jsonwebtoken";
import 'dotenv/config'
import { ObjectId } from "mongodb";

const db = mongo.db('Personal_Cms');

export async function Login(req, res) {
    const { user, password } = req.body;
    if (user && password) {
        const login = db.collection('admins').find({ username: user, password: password });
        const data = await login.toArray();
        if (data.length != 0) {
            const token = Jwt.sign(
                { user_id: data[0]._id, user },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "20h"
                }
            );
            await db.collection('admins').updateOne({ _id: data[0]._id }, { $set: { token: token } })
            res.send({ userToken: token });
        } else {
            res.status(500).send({ error: "username atau password salah" })
        }
    } else {
        res.status(501).send({ error: "field tidak boleh kosong" })
    }
}

export async function uploadPost(req, res) {
    const prefixUrl = req.protocol + '://' + req.get('host');
    const url = prefixUrl + '/upload/images/' + req.file.filename
    const { title, subtitle, text, tags } = req.body;
    const post = await db.collection('posts').insertOne({
        title: title,
        subtitle: subtitle,
        text: text,
        tags: tags,
        imageHeader: url
    })

    res.status(200).send({ message: 'Post Uploades Successfully', id: post.insertedId, imageUrl: url });
}

export async function uploadProject(req, res) {
    const url = req.protocol + '://' + req.get('host');
    const { title, deskripsi, github } = req.body;
    let imageObject = {
        src: [],
        pic: []
    };
    for (const key in req.files) {
        for (const file of req.files[key]) {
            const urlFiles = url + '/upload/images/' + file.filename
            if (key == 'src') {
                imageObject.src.push({
                    url: urlFiles
                })
            } else {
                imageObject.pic.push({
                    url: urlFiles
                })
            }
        }
    }

    const projects = await db.collection('projects').insertOne({
        title: title,
        deskripsi: deskripsi,
        github: github,
        imageHeader: imageObject
    })

    res.status(200).send({ message: 'file uploade successfully', _id: projects.insertedId, imageHeader: imageObject });
}

export async function getPosts(req, res) {
    const database = await db.collection('posts').find({});
    const posts = await database.toArray();

    res.status(200).send(posts);
}

export async function getPost(req, res) {
    const database = db.collection('posts').find(ObjectId(req.params.id));
    const post = await database.toArray();

    res.status(200).send(post[0]);
}

export async function getProjects(req, res) {
    const database = await db.collection('projects').find({});
    const projects = await database.toArray();

    res.status(200).send(projects);
}

export async function getProject(req, res) {
    const database = db.collection('projects').find(ObjectId(req.params.id));
    const project = await database.toArray();

    res.status(200).send(project)
}
export async function updateProject(req, res) {
    const { id, title, deskripsi, github, updated_at, updated_src, updated_pic } = req.body;
    let updated_src_toArray = updated_src.split(',');
    let updated_pic_toArray = updated_pic.split(',');
    const prefixUrl = req.protocol + '://' + req.get('host');

    var payload = {
        "title": title,
        "deskripsi": deskripsi,
        "github": github,
        "updated_at": updated_at,
    }

    if (!req.files) {

        await db.collection('projects').updateOne({ "_id": ObjectId(id) }, {
            $set: payload
        })

    } else {
        // console.log(updated_src_toArray);
        // console.log(updated_pic_toArray);
        for (let i = 0; i < req.files["src"].length; i++) {
            let urlFiles = prefixUrl + '/upload/images/' + req.files["src"][i].filename;
            let urlFilesPic = prefixUrl + '/upload/images/' + req.files["pic"][i].filename;
            // update src image url
            await db.collection("projects").updateOne(
                {
                    "_id": ObjectId(id),
                    "imageHeader.src.url": updated_src_toArray[i]
                },
                {
                    $set: { "imageHeader.src.$.url": urlFiles }
                }
            )

            // update pic image url 
            await db.collection("projects").updateOne(
                {
                    "_id": ObjectId(id),
                    "imageHeader.pic.url": updated_pic_toArray[i]
                },
                {
                    $set: { "imageHeader.pic.$.url": urlFilesPic }
                }
            )
        }

        // and then update other field except image url
        await db.collection('projects').updateOne({ "_id": ObjectId(id) }, {
            $set: payload
        })

    }

    res.status(200).send(id);
}

export async function deleteProject(req, res) {
    const { id } = req.params;
    
    await db.collection('projects').deleteOne({ "_id": ObjectId(id) });

    res.status(200).send(id);
}

export async function updatePost(req, res) {
    if (req.file) {
        const { id, title, subtitle, text, tags } = req.body;
        const prefixUrl = req.protocol + '://' + req.get('host');
        const url = prefixUrl + '/upload/images/' + req.file.filename;
        const payload = {
            "title": title,
            "subtitle": subtitle,
            "text": text,
            "tags": tags,
            "imageHeader": url
        }
        try {
            db.collection("posts").updateOne({ "_id": ObjectId(id) }, {
                $set: payload
            })
            res.status(200).send(payload);
        } catch (err) {
            res.status(500);
        }
    } else {
        const { id, title, subtitle, text, tags, file } = req.body;
        const payload = {
            "title": title,
            "subtitle": subtitle,
            "text": text,
            "tags": tags,
            "imageHeader": file
        }
        try {
            db.collection("posts").updateOne({ "_id": ObjectId(id) }, {
                $set: payload
            })
            res.status(200).send(payload);
        } catch (err) {
            res.status(500).send('error : ' + err);
        }
    }
}

export async function deletePost(req, res) {
    await db.collection('posts').deleteOne({ "_id": ObjectId(req.params.id) })
    res.status(200).send(req.params.id);
}

export async function addPost(req, res) {

}